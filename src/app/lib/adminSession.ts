import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  sub: "admin";
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET");
  }

  return secret;
}

function signPayload(payloadBase64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadBase64).digest("base64url");
}

export function createAdminSessionToken() {
  const payload: SessionPayload = {
    sub: "admin",
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(payloadBase64, getSessionSecret());

  return `${payloadBase64}.${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  const expected = signPayload(payloadBase64, getSessionSecret());
  const isEqual =
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!isEqual) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8"),
    ) as SessionPayload;

    return payload.sub === "admin" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function hasValidAdminSession(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionToken) {
    return false;
  }

  try {
    return verifyAdminSessionToken(sessionToken);
  } catch {
    return false;
  }
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!username || !password) {
    throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD");
  }

  return { username, password };
}

export function getSessionDurationSeconds() {
  return SESSION_DURATION_SECONDS;
}
