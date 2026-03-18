import { NextResponse, type NextRequest } from "next/server";
import { hasValidAdminSession } from "@/app/lib/adminSession";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: hasValidAdminSession(request) });
}
