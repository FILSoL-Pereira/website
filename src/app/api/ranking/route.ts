import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type ScoreRow = { attendeeId: string; _sum: { pointsEarned: number | null } };
type RegRow = { id: string; name: string; githubUsername: string | null };

export async function GET() {
  try {
    const scores = await prisma.answer.groupBy({
      by: ["attendeeId"],
      _sum: { pointsEarned: true },
      orderBy: { _sum: { pointsEarned: "desc" } },
      take: 50,
    });

    if (scores.length === 0) {
      return NextResponse.json({ ranking: [] });
    }

    const ids = (scores as ScoreRow[]).map((s) => s.attendeeId);
    const registrations = await prisma.registration.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, githubUsername: true },
    });

    const regMap = new Map((registrations as RegRow[]).map((r) => [r.id, r]));

    const ranking = (scores as ScoreRow[]).map((s, index) => {
      const reg = regMap.get(s.attendeeId);
      return {
        rank: index + 1,
        attendeeId: s.attendeeId,
        name: reg?.name ?? "Desconocido",
        githubUsername: reg?.githubUsername ?? null,
        totalPoints: s._sum.pointsEarned ?? 0,
      };
    });

    return NextResponse.json({ ranking });
  } catch (error) {
    console.error("Error en GET /api/ranking:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
