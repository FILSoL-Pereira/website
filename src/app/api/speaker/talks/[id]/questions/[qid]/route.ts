import { NextResponse, type NextRequest } from "next/server";
import { type Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { getSpeakerIdFromSession } from "@/app/lib/speakerSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

type RouteContext = { params: Promise<{ id: string; qid: string }> };

type PatchBody = {
  text?: string;
  options?: string[];
  correctOption?: number;
  points?: number;
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  const { id: talkId, qid: questionId } = await params;

  try {
    const talk = await prisma.talk.findUnique({ where: { id: talkId } });
    if (!talk || talk.speakerId !== speakerId) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    const existing = await prisma.question.findUnique({ where: { id: questionId } });
    if (!existing || existing.talkId !== talkId) {
      return NextResponse.json({ error: "Pregunta no encontrada." }, { status: 404 });
    }

    const body = (await request.json()) as PatchBody;

    const updateData: Prisma.QuestionUpdateInput = {};

    if (body.text !== undefined) {
      const text = body.text.trim();
      if (!text) {
        return NextResponse.json({ error: "El texto de la pregunta es obligatorio." }, { status: 400 });
      }
      updateData.text = text;
    }

    let nextOptions: string[] | undefined;
    if (body.options !== undefined) {
      nextOptions = body.options.map((o) => o.trim()).filter(Boolean);
      if (nextOptions.length < 2) {
        return NextResponse.json({ error: "Se requieren al menos 2 opciones." }, { status: 400 });
      }
      updateData.options = nextOptions;
    }

    if (body.correctOption !== undefined) {
      const optionsLength = nextOptions?.length ?? existing.options.length;
      if (body.correctOption < 0 || body.correctOption >= optionsLength) {
        return NextResponse.json({ error: "Opción correcta fuera de rango." }, { status: 400 });
      }
      updateData.correctOption = body.correctOption;
    } else if (nextOptions && existing.correctOption >= nextOptions.length) {
      return NextResponse.json(
        { error: "La opción correcta actual ya no existe; envíala junto con las opciones." },
        { status: 400 },
      );
    }

    if (body.points !== undefined) {
      if (typeof body.points !== "number" || body.points <= 0) {
        return NextResponse.json({ error: "Los puntos deben ser un número mayor a 0." }, { status: 400 });
      }
      updateData.points = body.points;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ question: existing });
    }

    const question = await prisma.question.update({
      where: { id: questionId },
      data: updateData,
    });

    return NextResponse.json({ question });
  } catch (error) {
    console.error("Error en PATCH /api/speaker/talks/[id]/questions/[qid]:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

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
