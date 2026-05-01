import { NextResponse, type NextRequest } from "next/server";
import { type Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

type TalkWithQuestions = Prisma.TalkGetPayload<{
  include: {
    speaker: { select: { name: true; githubUsername: true } };
    questions: true;
  };
}>;

type RouteContext = { params: Promise<{ talkId: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { talkId } = await params;

  try {
    const talk = (await prisma.talk.findUnique({
      where: { id: talkId },
      include: {
        speaker: { select: { name: true, githubUsername: true } },
        questions: {
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        },
      },
    })) as TalkWithQuestions | null;

    if (!talk) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    if (!talk.isOpen) {
      return NextResponse.json({ error: "Esta charla aún no está disponible." }, { status: 403 });
    }

    return NextResponse.json({
      talk: {
        id: talk.id,
        title: talk.title,
        speakerName: talk.speaker.name,
        speakerGithub: talk.speaker.githubUsername,
        // Strip correctOption to prevent cheating
        questions: talk.questions.map((q) => ({
          id: q.id,
          text: q.text,
          options: q.options,
          points: q.points,
          order: q.order,
        })),
      },
    });
  } catch (error) {
    console.error("Error en GET /api/quiz/[talkId]:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
