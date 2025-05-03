import Button from "../ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full text-white py-20 px-4 sm:px-6 text-center bg-stone-900">
      <div className="w-full -z-10 ">
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
          FLISoL Pereira 2025
        </h1>
        <p className="text-base sm:text-2xl leading-relaxed">
          El Festival Latinoamericano de Instalación de Software Libre más
          grande de la región.
          <br className="hidden sm:block" />
          ¡Charlas, talleres y comunidad en un solo lugar!
        </p>
        <div className="flex flex-col items-center gap-4 sm:gap-8">
          <div className="flex flex-col gap-4 w-full sm:flex-row sm:gap-8 sm:w-auto">
            <Button href="/workshops">Asiste a nuestros talleres</Button>

            <Button href="/agenda">Ver Programación</Button>
          </div>
          <Button href="/register">¡Inscríbete ya al evento!</Button>
        </div>
      </div>
    </section>
  );
}
