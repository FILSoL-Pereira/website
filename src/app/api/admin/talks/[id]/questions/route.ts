import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  if (!hasValidAdminSession(request)) return unauthorized();

  const { id: talkId } = await params;

  try {
    const talk = await prisma.talk.findUnique({ where: { id: talkId } });
    if (!talk) {
      return NextResponse.json({ error: "Charla no encontrada." }, { status: 404 });
    }

    const questions = await prisma.question.findMany({
      where: { talkId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error en GET /api/admin/talks/[id]/questions:", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
