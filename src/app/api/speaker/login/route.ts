import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isRegistrationId } from "@/app/lib/checkinQr";
import {
  SPEAKER_SESSION_COOKIE,
  createSpeakerSessionToken,
  getSessionDurationSeconds,
} from "@/app/lib/speakerSession";

type Body = {
  registrationId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const registrationId = body.registrationId?.trim() ?? "";

    if (!isRegistrationId(registrationId)) {
      return NextResponse.json(
        { error: "ID de registro inválido." },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registro no encontrado." },
        { status: 404 },
      );
    }

    if (registration.role !== "speaker") {
      return NextResponse.json(
        { error: "Este registro no corresponde a un ponente." },
        { status: 403 },
      );
    }

    const token = createSpeakerSessionToken(registration.id);
    const response = NextResponse.json({
      ok: true,
      name: registration.name,
      speakerId: registration.id,
    });

    response.cookies.set(SPEAKER_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getSessionDurationSeconds(),
    });

    return response;
  } catch (error) {
    console.error("Error en /api/speaker/login:", error);
    return NextResponse.json(
      { error: "Error interno al iniciar sesión." },
      { status: 500 },
    );
  }
}
