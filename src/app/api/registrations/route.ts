import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
            name: existing.name,
            email: existing.email,
            githubUsername: existing.githubUsername,
            ticketNumber: existing.ticketNumber,
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
          name: created.name,
          email: created.email,
          githubUsername: created.githubUsername,
          ticketNumber: created.ticketNumber,
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

