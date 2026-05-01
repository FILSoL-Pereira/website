import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  const number = request.nextUrl.searchParams.get("number")?.trim() ?? "";

  if (!number) {
    return NextResponse.json({ error: "Número de ticket requerido." }, { status: 400 });
  }

  try {
    const registration = await prisma.registration.findUnique({
      where: { ticketNumber: number },
      select: { id: true, name: true, role: true },
    });

    if (!registration) {
      return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
    }

    return NextResponse.json({
      id: registration.id,
      name: registration.name,
      role: registration.role,
    });
  } catch (error) {
    console.error("Error en GET /api/registrations/by-ticket:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
