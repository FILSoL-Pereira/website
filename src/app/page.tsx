import Banner from "./components/banner";
import ImageCarousel from "./components/carousel";
import Registry from "./components/registry";
import VideoSection from "./components/videoSection";
import Countdown from "./components/countdown";

export default function Home() {
  return (
    <main className="min-h-screen max-w-[2000px] mx-auto">
      <Banner />
      <Countdown targetDate="2025-05-08T08:00:00" />
      <VideoSection />
      <ImageCarousel />
      <Registry />
      
    </main>
  );
}
