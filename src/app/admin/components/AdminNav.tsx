"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanQrCode, LogOut } from "lucide-react";

interface AdminNavProps {
  onLogout: () => void;
}

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/checkin", label: "Check-in", icon: ScanQrCode },
] as const;

export default function AdminNav({ onLogout }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-700 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-slate-800 text-orange-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={18} />
          Salir
        </button>
      </div>
    </nav>
  );
}
