import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  if (!hasValidAdminSession(request)) return unauthorized();

  const { id } = await params;

  try {
    const body = (await request.json()) as { isOpen?: boolean };

    if (typeof body.isOpen !== "boolean") {
      return NextResponse.json({ error: "isOpen debe ser un booleano." }, { status: 400 });
    }

    const talk = await prisma.talk.update({
      where: { id },
      data: { isOpen: body.isOpen },
      include: {
        speaker: { select: { name: true } },
        _count: { select: { questions: true } },
      },
    });

    return NextResponse.json({
      talk: {
        id: talk.id,
        title: talk.title,
        isOpen: talk.isOpen,
        speakerName: talk.speaker.name,
        questionCount: talk._count.questions,
      },
    });
  } catch (error) {
    console.error("Error en PATCH /api/admin/talks/[id]:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
