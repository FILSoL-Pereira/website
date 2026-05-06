import type { NextRequest } from "next/server";
import { createToken, verifyToken } from "./session";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  sub: "admin";
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET");
  return secret;
}

export function createAdminSessionToken() {
  const payload: SessionPayload = {
    sub: "admin",
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  return createToken(payload, getSessionSecret());
}

export function verifyAdminSessionToken(token: string) {
  const payload = verifyToken<SessionPayload>(token, getSessionSecret());
  if (!payload) return false;
  return payload.sub === "admin" && payload.exp > Date.now();
}

export function hasValidAdminSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    return verifyAdminSessionToken(token);
  } catch {
    return false;
  }
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME?.trim() || null;
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password) throw new Error("Missing ADMIN_PASSWORD");
  return { username, password };
}

export function isAdminUsernameRequired() {
  return Boolean(process.env.ADMIN_USERNAME?.trim());
}

export function getSessionDurationSeconds() {
  return SESSION_DURATION_SECONDS;
}
