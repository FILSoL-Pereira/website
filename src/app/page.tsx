import Banner from "./components/banner";
import CarouselEvent from "./components/carouselEvent";
import VideoSection from "./components/videoSection";
import Countdown from "./components/countdown";
import FreedomsSection from "./components/softwareFreedoms";
import LocationSection from "./components/location";
import CarouselTeam from "./components/carouselTeam";
import CallToAction from "./components/callToAction";

export default function Home() {
  return (
    <main className="min-h-screen max-w-[2000px] mx-auto">
      <Banner />
      <Countdown targetDate="2025-05-08T08:00:00" />
      <VideoSection />
      <FreedomsSection />
      <LocationSection />
      <CarouselEvent />
      <CallToAction
        title="¡Inscríbete y vive una experiencia inolvidable!"
        description="
        ¿Quieres ser parte del evento de software libre más grande de Latinoamérica? 
        Regístrate como asistente al FLISoL Pereira 2025 y prepárate para disfrutar de un día lleno de conocimiento, innovación, tecnología y comunidad.

        Participa en rifas, actividades interactivas, juegos, retos y muchas sorpresas más pensadas especialmente para ti. 
        Al inscribirte no solo aseguras tu entrada al evento, sino que también tendrás la oportunidad de ganar premios y participar en las dinámicas más emocionantes del día.

        La entrada es totalmente gratuita, pero los cupos son limitados. ¡No te quedes por fuera y forma parte de esta gran celebración del software libre!"
        buttonText="Inscríbete gratis!"
        buttonLink="/register"
      />


      <CarouselTeam />
    </main>
  );
}
