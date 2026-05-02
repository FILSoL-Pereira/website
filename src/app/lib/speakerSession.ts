import type { NextRequest } from "next/server";
import { createToken, verifyToken } from "./session";

export const SPEAKER_SESSION_COOKIE = "speaker_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24;

type SessionPayload = {
  sub: string; // speaker registration UUID
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET");
  return secret;
}

export function createSpeakerSessionToken(speakerId: string) {
  const payload: SessionPayload = {
    sub: speakerId,
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  return createToken(payload, getSessionSecret());
}

export function getSpeakerIdFromSession(request: NextRequest): string | null {
  const token = request.cookies.get(SPEAKER_SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = verifyToken<SessionPayload>(token, getSessionSecret());
    if (!payload || !payload.sub || payload.exp <= Date.now()) return null;
    return payload.sub;
  } catch {
    return null;
  }
}

export function getSessionDurationSeconds() {
  return SESSION_DURATION_SECONDS;
}
