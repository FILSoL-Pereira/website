import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search")?.trim() ?? "";
    const role = searchParams.get("role")?.trim() ?? "";
    const status = searchParams.get("status")?.trim() ?? "";

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { ticketNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status === "checked-in") {
      where.checkedIn = true;
    } else if (status === "pending") {
      where.checkedIn = false;
    }

    const registrations = await prisma.registration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        githubUsername: true,
        ticketNumber: true,
        role: true,
        checkedIn: true,
        checkedInAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ registrations, total: registrations.length });
  } catch (error) {
    console.error("Error en /api/admin/registrations:", error);
    return NextResponse.json(
      { error: "Error interno al obtener registros." },
      { status: 500 },
    );
  }
}
