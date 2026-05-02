import { NextResponse } from "next/server";
import { SPEAKER_SESSION_COOKIE } from "@/app/lib/speakerSession";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SPEAKER_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
