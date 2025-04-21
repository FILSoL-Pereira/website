import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-amber-500 py-4 sm:py-5 relative z-10">
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

        <div className="hidden sm:block bg-white w-1 h-12" />

        <span className="text-white text-2xl sm:text-5xl font-bold">
          PEREIRA
        </span>
      </div>
    </header>
  );
}
