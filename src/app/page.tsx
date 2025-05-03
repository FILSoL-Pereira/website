import Banner from "./components/banner";
import CarouselEvent from "./components/carouselEvent";
import VideoSection from "./components/videoSection";
import Countdown from "./components/countdown";
import FreedomsSection from "./components/softwareFreedoms";
import LocationSection from "./components/location";
import CarouselTeam from "./components/carouselTeam";
import CallToAction from "./components/callToAction";
import Installation from "./components/installation";

export default function Home() {
  return (
    <main className="min-h-screen max-w-[2000px] mx-auto">
      <Banner />
      <Countdown targetDate="2025-05-08T08:00:00" />
      <VideoSection />
      <Installation/>
      <FreedomsSection />
      <LocationSection />
      <CarouselEvent />

      <div className="flex flex-col sm:flex-row ">
        <CallToAction
          title="¡Consulta la programación completa!"
          description={`Revisa todos los eventos y actividades que tenemos preparados para ti. ¡No te pierdas nada!`}
          buttonText="Ver programación"
          buttonLink="/schedule"
        />

        <CallToAction
          title="¡Participa en los talleres!"
          description={`Los talleres se realizarán el <strong class="font-bold">miércoles 7 de mayo</strong> en el edificio 15D-403 (Sala de Computo). ¡No te los pierdas!`}
          buttonText="Ver talleres"
          buttonLink="/workshops"
        />
      </div>
      <CallToAction
        title="¡Inscríbete y vive una experiencia inolvidable!"
        description={`Te esperamos este <strong class="font-bold">jueves 8 de mayo</strong> a partir de las <strong class="font-bold">7:30 am</strong> en las <strong class="font-bold">magistrales del edificio 13</strong>.`}
        buttonText="Inscríbete gratis!"
        buttonLink="/register"
      />

      <CarouselTeam />
    </main>
  );
}
