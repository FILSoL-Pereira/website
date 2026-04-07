"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const is2025 = pathname.startsWith("/2025");
  const defaultClass = is2025
    ? "w-full bg-amber-500 py-4 sm:py-5 relative z-10"
    : "w-full bg-slate-950 border-b border-slate-800 py-4 sm:py-5 relative z-10";

  return (
    <header className={className ?? defaultClass}>
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-10 px-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/">
            <Image
              src="/Flisol.svg"
              alt="Logo_FLISoL"
              width={120}
              height={70}
              className="h-auto w-[70px] sm:w-[130px]"
              priority
            />
          </Link>
          <Image
            src="/Flisol-Logo.svg"
            alt="Logo_FLISoL"
            width={80}
            height={80}
            className="h-auto w-[28px] sm:w-[65px] animate-rotate-once sm:-ml-3 -ml-1.5"
            priority
          />
        </div>

        <div className={`hidden sm:block w-1 h-12 ${is2025 ? "bg-white" : "bg-amber-400"}`} />

        <span className="text-white text-2xl sm:text-5xl font-bold">
          PEREIRA
        </span>
      </div>
    </header>
  );
}
