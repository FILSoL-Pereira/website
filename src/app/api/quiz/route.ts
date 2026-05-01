import { NextResponse } from "next/server";
import { type Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

type TalkWithSpeaker = Prisma.TalkGetPayload<{
  include: {
    speaker: { select: { name: true; githubUsername: true } };
    _count: { select: { questions: true } };
  };
}>;

export async function GET() {
  try {
    const talks = await prisma.talk.findMany({
      where: { isOpen: true },
      include: {
        speaker: { select: { name: true, githubUsername: true } },
        _count: { select: { questions: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      talks: (talks as TalkWithSpeaker[]).map((t) => ({
        id: t.id,
        title: t.title,
        speakerName: t.speaker.name,
        speakerGithub: t.speaker.githubUsername,
        questionCount: t._count.questions,
      })),
    });
  } catch (error) {
    console.error("Error en GET /api/quiz:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
