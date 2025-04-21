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
        description={`Te esperamos este <strong class="font-bold">jueves 8 de mayo</strong> a partir de las <strong class="font-bold">7:30 am</strong> en las <strong class="font-bold">magistrales del edificio 13</strong>.`}
        buttonText="Inscríbete gratis!"
        buttonLink="/register"
      />

      <CarouselTeam />
    </main>
  );
}
