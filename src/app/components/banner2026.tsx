import Button from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Banner2026() {
  return (
    <>
      <section className="relative w-full text-white py-20 px-4 sm:px-6 text-center bg-stone-900">
        <div className="w-full -z-10">
          <Image
            src="/bg-banner.webp"
            alt="Logo_FLISoL"
            quality={50}
            fill
            className="object-cover object-center bg-no-repeat blur-sm"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            FLISoL Pereira 2026
          </h1>
          <p className="text-lg sm:text-xl text-amber-400 font-semibold">
            22ᵃ Edición
          </p>
          <p className="text-base sm:text-2xl leading-relaxed">
            El Festival Latinoamericano de Instalación de Software Libre más
            grande de la región.
            <br className="hidden sm:block" />
            ¡Charlas, talleres y comunidad en un solo lugar!
          </p>
          <div className="flex flex-col items-center gap-4 sm:gap-8">
            <Button href="/register">¡Inscríbete ya al evento!</Button>
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 px-4 sm:px-6 bg-radial-[at_50%_10%] from-sky-900 via-slate-900 to-gray-950 to-80% text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-amber-400 drop-shadow-[0_0_4px]">
            7 de mayo de 2026
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Auditorio Jorge Roa Martínez — Universidad Tecnológica de Pereira
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Ya tenemos la agenda y los ponentes del evento. 10 charlas sobre
            software libre, IA, desarrollo y comunidad. ¡Inscríbete para
            asegurar tu lugar!
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/agenda">Ver agenda y ponentes</Button>
            <Link
              href="/2025"
              className="text-amber-400 underline hover:text-amber-300 text-lg font-semibold transition"
            >
              Revive la Edición 2025 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
