import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSpeakerIdFromSession } from "@/app/lib/speakerSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const speakerId = getSpeakerIdFromSession(request);
  if (!speakerId) return unauthorized();

  const { id: talkId } = await params;

  try {
    const talk = await prisma.talk.findUnique({ where: { id: talkId } });
    if (!talk || talk.speakerId !== speakerId) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    await prisma.talk.delete({ where: { id: talkId } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en DELETE /api/speaker/talks/[id]:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
