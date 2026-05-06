import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { buildCheckinQrValue } from "@/app/lib/checkinQr";

const VALID_ROLES = ["community", "speaker", "organizer", "staff"] as const;

type RegistrationRequestBody = {
  name: string;
  email: string;
  github?: string;
  role?: string;
  dataConsent?: boolean;
};

function randomTicketNumber() {
  return "#" + Math.floor(Math.random() * 100000).toString().padStart(5, "0");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationRequestBody;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const github = body.github?.trim() || null;
    const role = VALID_ROLES.includes(body.role as typeof VALID_ROLES[number])
      ? (body.role as string)
      : "community";
    const dataConsent = body.dataConsent === true;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son obligatorios." },
        { status: 400 },
      );
    }

    const existing = await prisma.registration.findUnique({
      where: { email },
    });

    if (existing) {
      const shouldUpgradeRole =
        role !== "community" && role !== existing.role;

      const shouldUpdateDataConsent = dataConsent === true && existing.dataConsent !== true;

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

    let created: Awaited<ReturnType<typeof prisma.registration.create>> | null = null;
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        created = await prisma.registration.create({
          data: { name, email, githubUsername: github, ticketNumber: randomTicketNumber(), role, dataConsent },
        });
        break;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
        throw e;
      }
    }
    if (!created) {
      return NextResponse.json({ error: "No se pudo generar un ticket único. Intenta nuevamente." }, { status: 500 });
    }

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

