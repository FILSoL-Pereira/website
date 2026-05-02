import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!hasValidAdminSession(request)) return unauthorized();

  try {
    const body = (await request.json().catch(() => ({}))) as { minPoints?: number };
    const minPoints = typeof body.minPoints === "number" ? body.minPoints : 1;

    // Aggregate points per attendee
    const scores = await prisma.answer.groupBy({
      by: ["attendeeId"],
      _sum: { pointsEarned: true },
      having: { pointsEarned: { _sum: { gte: minPoints } } },
    });

    if (scores.length === 0) {
      return NextResponse.json(
        { error: "No hay participantes elegibles con suficientes puntos." },
        { status: 404 },
      );
    }

    // Pick random winner from eligible list
    const winner = scores[Math.floor(Math.random() * scores.length)];
    const totalPoints = winner._sum.pointsEarned ?? 0;

    const registration = await prisma.registration.findUnique({
      where: { id: winner.attendeeId },
    });

    if (!registration) {
      return NextResponse.json({ error: "Error al buscar ganador." }, { status: 500 });
    }

    return NextResponse.json({
      winner: {
        id: registration.id,
        name: registration.name,
        email: registration.email,
        githubUsername: registration.githubUsername,
        ticketNumber: registration.ticketNumber,
        role: registration.role,
        totalPoints,
      },
      totalEligible: scores.length,
    });
  } catch (error) {
    console.error("Error en /api/admin/raffle/pick:", error);
    return NextResponse.json({ error: "Error interno al seleccionar ganador." }, { status: 500 });
  }
}
