import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { buildCheckinQrValue } from "@/app/lib/checkinQr";

const VALID_ROLES = ["community", "speaker", "organizer", "staff"] as const;

type RegistrationRequestBody = {
  name: string;
  email: string;
  github?: string;
  ticketNumber: string;
  role?: string;
  dataConsent?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationRequestBody;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const github = body.github?.trim() || null;
    const ticketNumber = body.ticketNumber;
    const role = VALID_ROLES.includes(body.role as typeof VALID_ROLES[number])
      ? (body.role as string)
      : "community";
    const dataConsent = body.dataConsent === true;

    if (!name || !email || !ticketNumber) {
      return NextResponse.json(
        { error: "Nombre, correo y ticket son obligatorios." },
        { status: 400 },
      );
    }

    if (!dataConsent) {
      return NextResponse.json(
        {
          error:
            "Debes aceptar el tratamiento de datos personales para continuar.",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.registration.findUnique({
      where: { email },
    });

    if (existing) {
      const shouldUpgradeRole =
        role !== "community" && role !== existing.role;

      const shouldUpdateDataConsent = existing.dataConsent !== true;

      const record =
        shouldUpgradeRole || shouldUpdateDataConsent
          ? await prisma.registration.update({
              where: { id: existing.id },
              data: {
                ...(shouldUpgradeRole ? { role } : {}),
                ...(shouldUpdateDataConsent ? { dataConsent: true } : {}),
              },
            })
          : existing;

      return NextResponse.json(
        {
          status: "existing",
          registration: {
            id: record.id,
            name: record.name,
            email: record.email,
            githubUsername: record.githubUsername,
            ticketNumber: record.ticketNumber,
            role: record.role,
            qrValue: buildCheckinQrValue(record.id),
          },
        },
        { status: 200 },
      );
    }

    const created = await prisma.registration.create({
      data: {
        name,
        email,
        githubUsername: github,
        ticketNumber,
        role,
        dataConsent: true,
      },
    });

    return NextResponse.json(
      {
        status: "created",
        registration: {
          id: created.id,
          name: created.name,
          email: created.email,
          githubUsername: created.githubUsername,
          ticketNumber: created.ticketNumber,
          role: created.role,
          qrValue: buildCheckinQrValue(created.id),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error en /api/registrations:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el registro." },
      { status: 500 },
    );
  }
}

