import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

type ScoreRow = {
  attendeeId: string;
  _sum: { pointsEarned: number | null };
  _max: { createdAt: Date | null };
};
type RegRow = { id: string; name: string; githubUsername: string | null };

export async function GET(request: NextRequest) {
  const talkId = request.nextUrl.searchParams.get("talkId") ?? undefined;

  try {
    const scores = (await prisma.answer.groupBy({
      by: ["attendeeId"],
      where: talkId ? { question: { talkId } } : undefined,
      _sum: { pointsEarned: true },
      _max: { createdAt: true },
    })) as ScoreRow[];

    if (scores.length === 0) {
      return NextResponse.json({ ranking: [] });
    }

    // Tiebreaker: same points → whoever finished answering earlier (smaller MAX(createdAt)) wins.
    scores.sort((a, b) => {
      const pa = a._sum.pointsEarned ?? 0;
      const pb = b._sum.pointsEarned ?? 0;
      if (pb !== pa) return pb - pa;
      const ta = a._max.createdAt?.getTime() ?? Number.POSITIVE_INFINITY;
      const tb = b._max.createdAt?.getTime() ?? Number.POSITIVE_INFINITY;
      return ta - tb;
    });

    const top = scores.slice(0, 50);
    const ids = top.map((s) => s.attendeeId);
    const registrations = await prisma.registration.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, githubUsername: true },
    });

    const regMap = new Map((registrations as RegRow[]).map((r) => [r.id, r]));

    const ranking = top.map((s, index) => {
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
