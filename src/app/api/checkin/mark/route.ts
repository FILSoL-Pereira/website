import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";
import { isRegistrationId } from "@/app/lib/checkinQr";

type Body = {
  id?: string;
};

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as Body;
    const id = body.id?.trim() ?? "";

    if (!isRegistrationId(id)) {
      return NextResponse.json(
        { error: "ID de registro inválido." },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Asistente no encontrado." },
        { status: 404 },
      );
    }

    if (registration.checkedIn) {
      return NextResponse.json({
        alreadyCheckedIn: true,
        registration: {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          githubUsername: registration.githubUsername,
          ticketNumber: registration.ticketNumber,
          checkedIn: registration.checkedIn,
          checkedInAt: registration.checkedInAt,
        },
      });
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
      },
    });

    return NextResponse.json({
      alreadyCheckedIn: false,
      registration: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        githubUsername: updated.githubUsername,
        ticketNumber: updated.ticketNumber,
        checkedIn: updated.checkedIn,
        checkedInAt: updated.checkedInAt,
      },
    });
  } catch (error) {
    console.error("Error en /api/checkin/mark:", error);
    return NextResponse.json(
      { error: "Error interno al marcar asistencia." },
      { status: 500 },
    );
  }
}
