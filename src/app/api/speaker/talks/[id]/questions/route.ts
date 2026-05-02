import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSpeakerIdFromSession } from "@/app/lib/speakerSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

type Body = {
  text?: string;
  options?: string[];
  correctOption?: number;
  points?: number;
  order?: number;
};

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  const { id: talkId } = await params;

  try {
    const talk = await prisma.talk.findUnique({ where: { id: talkId } });
    if (!talk || talk.speakerId !== speakerId) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    const questions = await prisma.question.findMany({
      where: { talkId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error en GET /api/speaker/talks/[id]/questions:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  const { id: talkId } = await params;

  try {
    const talk = await prisma.talk.findUnique({ where: { id: talkId } });
    if (!talk || talk.speakerId !== speakerId) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    const body = (await request.json()) as Body;
    const text = body.text?.trim() ?? "";
    const options = (body.options ?? []).map((o) => o.trim()).filter(Boolean);
    const correctOption = body.correctOption ?? -1;
    const points = typeof body.points === "number" && body.points > 0 ? body.points : 10;
    const order = typeof body.order === "number" ? body.order : 0;

    if (!text) {
      return NextResponse.json({ error: "El texto de la pregunta es obligatorio." }, { status: 400 });
    }
    if (options.length < 2) {
      return NextResponse.json({ error: "Se requieren al menos 2 opciones." }, { status: 400 });
    }
    if (correctOption < 0 || correctOption >= options.length) {
      return NextResponse.json({ error: "Opción correcta fuera de rango." }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: { talkId, text, options, correctOption, points, order },
    });

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/speaker/talks/[id]/questions:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
