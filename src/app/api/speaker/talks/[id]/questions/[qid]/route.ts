import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSpeakerIdFromSession } from "@/app/lib/speakerSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

type RouteContext = { params: Promise<{ id: string; qid: string }> };

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  const { id: talkId, qid: questionId } = await params;

  try {
    const talk = await prisma.talk.findUnique({ where: { id: talkId } });
    if (!talk || talk.speakerId !== speakerId) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question || question.talkId !== talkId) {
      return NextResponse.json({ error: "Pregunta no encontrada." }, { status: 404 });
    }

    await prisma.question.delete({ where: { id: questionId } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en DELETE /api/speaker/talks/[id]/questions/[qid]:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
