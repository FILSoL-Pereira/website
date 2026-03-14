import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";
import { isRegistrationId } from "@/app/lib/checkinQr";

const VALID_ROLES = ["community", "speaker", "organizer", "staff"] as const;

type Body = {
  id?: string;
  role?: string;
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
    const role = VALID_ROLES.includes(body.role as typeof VALID_ROLES[number])
      ? (body.role as string)
      : undefined;

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
      if (role && role !== registration.role) {
        const updatedRole = await prisma.registration.update({
          where: { id },
          data: { role },
        });
        return NextResponse.json({
          alreadyCheckedIn: true,
          registration: {
            id: updatedRole.id,
            name: updatedRole.name,
            email: updatedRole.email,
            githubUsername: updatedRole.githubUsername,
            ticketNumber: updatedRole.ticketNumber,
            role: updatedRole.role,
            checkedIn: updatedRole.checkedIn,
            checkedInAt: updatedRole.checkedInAt,
          },
        });
      }

      return NextResponse.json({
        alreadyCheckedIn: true,
        registration: {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          githubUsername: registration.githubUsername,
          ticketNumber: registration.ticketNumber,
          role: registration.role,
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
        ...(role ? { role } : {}),
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
        role: updated.role,
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
