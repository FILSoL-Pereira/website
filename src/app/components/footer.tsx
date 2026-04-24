"use client";

import { Instagram, Github, CopyleftIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer({ className }: { className?: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const is2025 = pathname.startsWith("/2025");
  const defaultClass = is2025
    ? "w-full bg-amber-500 text-gray-800 py-8 px-4"
    : "w-full bg-slate-950 border-t border-slate-800 text-gray-400 py-8 px-4";

  const iconClass = is2025
    ? "hover:text-gray-800 hover:bg-white transition rounded-full p-2 bg-gray-800 text-white"
    : "hover:bg-amber-400 transition rounded-full p-2 bg-amber-500 text-slate-950";

  const linkClass = is2025
    ? "text-sm underline transition hover:text-white"
    : "text-sm underline transition hover:text-amber-400";

  return (
    <footer className={className ?? defaultClass}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-1 text-sm">
            <CopyleftIcon /> 2026 FLISoL Pereira - Licencia GNU GPLv3
            <a
              href="https://github.com/FILSoL-Pereira/website"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Codigo fuente
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <a
            href="https://instagram.com/flisolpereira"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
          >
            <Instagram />
          </a>
          <a
            href="https://github.com/FILSoL-Pereira"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
          >
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
}
