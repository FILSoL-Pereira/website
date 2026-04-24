import { type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hasValidAdminSession } from "@/app/lib/adminSession";

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return new Response("No autorizado.", { status: 401 });
  }

  try {
    const registrations: {
      id: string;
      name: string;
      email: string;
      githubUsername: string | null;
      ticketNumber: string;
      role: string;
      checkedIn: boolean;
      checkedInAt: Date | null;
      createdAt: Date;
    }[] = await prisma.registration.findMany({
      orderBy: { createdAt: "asc" },
    });

    const header =
      "id,nombre,email,github,ticket,rol,checked_in,checked_in_at,created_at";

    const rows = registrations.map((r) =>
      [
        r.id,
        csvEscape(r.name),
        csvEscape(r.email),
        csvEscape(r.githubUsername ?? ""),
        r.ticketNumber,
        r.role,
        r.checkedIn ? "si" : "no",
        r.checkedInAt?.toISOString() ?? "",
        r.createdAt.toISOString(),
      ].join(","),
    );

    const csv = [header, ...rows].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="flisol-registrations.csv"',
      },
    });
  } catch (error) {
    console.error("Error en /api/admin/registrations/csv:", error);
    return new Response("Error interno al generar CSV.", { status: 500 });
  }
}
