import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { buildCheckinQrValue } from "@/app/lib/checkinQr";

type RegistrationRequestBody = {
  name: string;
  email: string;
  github?: string;
  ticketNumber: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationRequestBody;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const github = body.github?.trim() || null;
    const ticketNumber = body.ticketNumber;

    if (!name || !email || !ticketNumber) {
      return NextResponse.json(
        { error: "Nombre, correo y ticket son obligatorios." },
        { status: 400 },
      );
    }

    const existing = await prisma.registration.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        {
          status: "existing",
          registration: {
            id: existing.id,
            name: existing.name,
            email: existing.email,
            githubUsername: existing.githubUsername,
            ticketNumber: existing.ticketNumber,
            qrValue: buildCheckinQrValue(existing.id),
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

