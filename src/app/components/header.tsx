import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-amber-500 py-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-12 px-4">
        <div className="flex items-center">
          <Image
            src="/Flisol.svg"
            alt="Logo_FLISoL"
            width={180}
            height={100}
            className="h-auto"
            priority
          />
          <Image
            src="/Flisol-Logo.svg"
            alt="Logo_FLISoL"
            width={100}
            height={100}
            className="h-auto animate-rotate-once -ml-3" 
            priority
          />
        </div>



        <div className="bg-white w-full h-1 sm:w-1.5 sm:h-24" />
        <span className="text-white text-4xl sm:text-7xl font-bold">
          PEREIRA
        </span>
      </div>
    </header>
  );
}
