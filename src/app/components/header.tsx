import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-amber-500 py-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-center gap-2 sm:gap-12 px-4">
        <div className="flex items-center">
          <Image
            src="/Flisol.svg"
            alt="Logo_FLISoL"
            width={120}
            height={70}
            className="h-auto sm:w-[180px] w-[60px]"
            priority
          />
          <Image
            src="/Flisol-Logo.svg"
            alt="Logo_FLISoL"
            width={80}
            height={80}
            className="h-auto animate-rotate-once sm:-ml-3 sm:w-[100px] w-[20px]"
            priority
          />
        </div>

        <div className="bg-white hidden sm:block w-1.5 h-24" />

        <span className="text-white text-3xl sm:text-7xl font-bold">
          PEREIRA
        </span>
      </div>
    </header>
  );
}
