import Banner2026 from "./components/banner2026";
import SponsorsSection, { sponsors2026 } from "./components/sponsors";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto">
      <Banner2026 />
      <SponsorsSection sponsors={sponsors2026} />
    </main>
  );
}
