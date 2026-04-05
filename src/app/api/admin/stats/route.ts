import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const [total, checkedIn, byRoleRaw, checkedInByRoleRaw] =
      await Promise.all([
        prisma.registration.count(),
        prisma.registration.count({ where: { checkedIn: true } }),
        prisma.registration.groupBy({
          by: ["role"],
          _count: { id: true },
        }),
        prisma.registration.groupBy({
          by: ["role"],
          where: { checkedIn: true },
          _count: { id: true },
        }),
      ]);

    const pending = total - checkedIn;
    const checkinRate = total > 0 ? Math.round((checkedIn / total) * 1000) / 10 : 0;

    const byRole: Record<string, number> = {};
    for (const row of byRoleRaw) {
      byRole[row.role] = row._count.id;
    }

    const checkedInByRole: Record<string, number> = {};
    for (const row of checkedInByRoleRaw) {
      checkedInByRole[row.role] = row._count.id;
    }

    return NextResponse.json({
      total,
      checkedIn,
      pending,
      checkinRate,
      byRole,
      checkedInByRole,
    });
  } catch (error) {
    console.error("Error en /api/admin/stats:", error);
    return NextResponse.json(
      { error: "Error interno al obtener estadisticas." },
      { status: 500 },
    );
  }
}
