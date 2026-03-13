import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";
import { isRegistrationId } from "@/app/lib/checkinQr";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return unauthorized();
  }

  try {
    const id = request.nextUrl.searchParams.get("id")?.trim() ?? "";
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

    return NextResponse.json({
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
  } catch (error) {
    console.error("Error en /api/checkin:", error);
    return NextResponse.json(
      { error: "Error interno al consultar check-in." },
      { status: 500 },
    );
  }
}
