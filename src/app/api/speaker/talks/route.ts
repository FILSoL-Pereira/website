import { NextResponse, type NextRequest } from "next/server";
import { type Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { getSpeakerIdFromSession } from "@/app/lib/speakerSession";

type TalkWithCount = Prisma.TalkGetPayload<{
  include: { _count: { select: { questions: true } } };
}>;

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  try {
    const talks = await prisma.talk.findMany({
      where: { speakerId },
      include: { _count: { select: { questions: true } } },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      talks: (talks as TalkWithCount[]).map((t) => ({
        id: t.id,
        title: t.title,
        isOpen: t.isOpen,
        questionCount: t._count.questions,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error en GET /api/speaker/talks:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  try {
    const body = (await request.json()) as { title?: string };
    const title = body.title?.trim() ?? "";

    if (!title) {
      return NextResponse.json(
        { error: "El título de la charla es obligatorio." },
        { status: 400 },
      );
    }

    const talk = await prisma.talk.create({
      data: { title, speakerId },
    });

    return NextResponse.json(
      { talk: { id: talk.id, title: talk.title, isOpen: talk.isOpen, questionCount: 0 } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error en POST /api/speaker/talks:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
