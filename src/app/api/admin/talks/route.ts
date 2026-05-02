import { NextResponse, type NextRequest } from "next/server";
import { type Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

type TalkWithDetails = Prisma.TalkGetPayload<{
  include: {
    speaker: { select: { name: true } };
    _count: { select: { questions: true } };
  };
}>;

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) return unauthorized();

  try {
    const talks = await prisma.talk.findMany({
      include: {
        speaker: { select: { name: true } },
        _count: { select: { questions: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      talks: (talks as TalkWithDetails[]).map((t) => ({
        id: t.id,
        title: t.title,
        isOpen: t.isOpen,
        speakerName: t.speaker.name,
        questionCount: t._count.questions,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error en GET /api/admin/talks:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
