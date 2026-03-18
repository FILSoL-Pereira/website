import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminCredentials,
  getSessionDurationSeconds,
} from "@/app/lib/adminSession";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const username = body.username?.trim() ?? "";
    const password = body.password?.trim() ?? "";

    const admin = getAdminCredentials();
    if (username !== admin.username || password !== admin.password) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({ ok: true });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getSessionDurationSeconds(),
    });

    return response;
  } catch (error) {
    console.error("Error en /api/admin/login:", error);
    return NextResponse.json(
      { error: "No fue posible iniciar sesión." },
      { status: 500 },
    );
  }
}
