import Banner from "./components/banner";
import ImageCarousel from "./components/carousel";
import Registry from "./components/registry";
import Scheduling from "./components/scheduling";
import VideoSection from "./components/videoSection";

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1900px] mx-auto">
      <Banner />
      <VideoSection />
      <ImageCarousel />
      <Scheduling />
      <Registry />
      
    </main>
  );
}
