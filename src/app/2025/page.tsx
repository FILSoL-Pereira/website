import Banner from "@/app/components/banner";
import CarouselEvent from "@/app/components/carouselEvent";
import VideoSection from "@/app/components/videoSection";
import FreedomsSection from "@/app/components/softwareFreedoms";
import LocationSection from "@/app/components/location";
import CarouselTeam from "@/app/components/carouselTeam";
import CallToAction from "@/app/components/callToAction";
import Installation from "@/app/components/installation";
import SponsorsSection, { sponsors2025 } from "@/app/components/sponsors";
import Link from "next/link";

export default function Home2025() {
  return (
    <main className="min-h-screen mx-auto">
      <div className="bg-gray-800 text-white text-center py-3 px-4">
        <p className="text-sm sm:text-base">
          La <strong>Edición 2025 · 21ᵃ Edición</strong> del FLISoL Pereira ya
          finalizó.{" "}
          <Link href="/" className="text-amber-400 underline">
            Ir a la edición 2026
          </Link>
        </p>
      </div>

      <Banner />

      <CallToAction
        title="El FLISoL 2025 ya finalizó"
        description='¡Gracias a todos los asistentes! Te esperamos en la <strong class="font-bold">edición 2026</strong>.'
        buttonText="¡Inscríbete para 2026!"
        buttonLink="/register"
      />

      <VideoSection />
      <Installation />
      <FreedomsSection />
      <LocationSection />
      <CarouselEvent />

      <div className="flex flex-col sm:flex-row max-w-7xl mx-auto">
        <CallToAction
          title="¡Consulta la programación completa!"
          description="Revisa todos los eventos y actividades que tuvimos preparados. ¡No te pierdas nada!"
          buttonText="Ver programación"
          buttonLink="/2025/agenda"
        />

        <CallToAction
          title="¡Conoce los talleres!"
          description='Los talleres se realizaron el <strong class="font-bold">miércoles 7 de mayo</strong> en el edificio 15D-403 (Sala de Cómputo).'
          buttonText="Ver talleres"
          buttonLink="/2025/workshops"
        />
      </div>

      <SponsorsSection sponsors={sponsors2025} />
      <CarouselTeam />
    </main>
  );
}
