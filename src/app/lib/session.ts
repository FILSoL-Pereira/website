import { createHmac, timingSafeEqual } from "crypto";

export function signPayload(payloadBase64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadBase64).digest("base64url");
}

export function createToken(payload: object, secret: string): string {
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(payloadBase64, secret);
  return `${payloadBase64}.${signature}`;
}

export function verifyToken<T>(token: string, secret: string): T | false {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return false;

  const expected = signPayload(payloadBase64, secret);
  const isEqual =
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!isEqual) return false;

  try {
    return JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8")) as T;
  } catch {
    return false;
  }
}
