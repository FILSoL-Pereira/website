import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isRegistrationId } from "@/app/lib/checkinQr";

type Body = {
  attendeeId?: string;
  questionId?: string;
  selectedOption?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const attendeeId = body.attendeeId?.trim() ?? "";
    const questionId = body.questionId?.trim() ?? "";
    const selectedOption = body.selectedOption;

    if (!isRegistrationId(attendeeId)) {
      return NextResponse.json({ error: "ID de asistente inválido." }, { status: 400 });
    }
    if (!isRegistrationId(questionId)) {
      return NextResponse.json({ error: "ID de pregunta inválido." }, { status: 400 });
    }
    if (typeof selectedOption !== "number" || selectedOption < 0) {
      return NextResponse.json({ error: "Opción seleccionada inválida." }, { status: 400 });
    }

    // Validate attendee exists
    const attendee = await prisma.registration.findUnique({ where: { id: attendeeId } });
    if (!attendee) {
      return NextResponse.json({ error: "Asistente no encontrado." }, { status: 404 });
    }

    // Validate question exists and talk is open
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { talk: { select: { isOpen: true } } },
    });
    if (!question) {
      return NextResponse.json({ error: "Pregunta no encontrada." }, { status: 404 });
    }
    if (!question.talk.isOpen) {
      return NextResponse.json({ error: "Esta charla no está disponible." }, { status: 403 });
    }
    if (selectedOption >= question.options.length) {
      return NextResponse.json({ error: "Opción seleccionada fuera de rango." }, { status: 400 });
    }

    const correct = selectedOption === question.correctOption;
    const pointsEarned = correct ? question.points : 0;

    try {
      await prisma.answer.create({
        data: { questionId, attendeeId, selectedOption, correct, pointsEarned },
      });
    } catch (err: unknown) {
      // Unique constraint violation — already answered
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code: string }).code === "P2002"
      ) {
        return NextResponse.json(
          { error: "Ya respondiste esta pregunta." },
          { status: 409 },
        );
      }
      throw err;
    }

    // Return total points for this attendee
    const aggregate = await prisma.answer.aggregate({
      where: { attendeeId },
      _sum: { pointsEarned: true },
    });

    return NextResponse.json({
      correct,
      pointsEarned,
      totalPoints: aggregate._sum.pointsEarned ?? 0,
    });
  } catch (error) {
    console.error("Error en POST /api/answers:", error);
    return NextResponse.json({ error: "Error interno al registrar respuesta." }, { status: 500 });
  }
}
