import Button from "./button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full text-white py-20 px-4 sm:px-6 text-center">
      <div className="w-full -z-10">
        <Image
          src="/bg-banner.jpeg"
          alt="Logo_FLISoL"
          quality={50}            
          fill
          className="object-cover object-center bg-no-repeat"
          priority
        />
      </div>

      {/* <div className="absolute inset-0 bg-[url('/bg-banner.jpeg')] bg-cover bg-center bg-no-repeat blur-sm"></div> */}

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
        <div className="flex justify-center flex-col sm:flex-row gap-4 ">
          <Button href="#registry">¡Inscríbete ya!</Button>
          <Button href="#scheduling">Ver Programacion</Button>
        </div>
      </div>
    </section>
  );
}
