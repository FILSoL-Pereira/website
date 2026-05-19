import Banner2026 from "./components/banner2026";
import Countdown from "./components/countdown";
import WhatIsFlisol from "./components/whatIsFlisol";
import WhyFreeSoftware from "./components/whyFreeSoftware";
import FreedomsSection from "./components/softwareFreedoms";
import CallToAction from "./components/callToAction";
import CarouselEvent from "./components/carouselEvent";
import SponsorsSection, { sponsors2026 } from "./components/sponsors";
import ScrollReveal from "./ui/scrollReveal";
import EventLocation from "./components/location";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto bg-slate-950">
      <Banner2026 />
      <Countdown targetDate="2026-05-07T08:00:00-05:00" variant="dark" />

      <WhatIsFlisol />
      <WhyFreeSoftware />

      <ScrollReveal>
        <FreedomsSection
          className="py-16 pt-8 px-4 bg-slate-950"
          variant="dark"
        />
      </ScrollReveal>

      <ScrollReveal>
        <CallToAction
          title="Agenda y ponentes"
          description='10 charlas de software libre, IA, desarrollo y comunidad el <strong class="font-bold text-amber-400">7 de mayo</strong>. Conoce la programación completa y quiénes estarán en el escenario.'
          buttonText="Ver agenda y ponentes"
          buttonLink="/agenda"
          variant="dark"
        />
      </ScrollReveal>

      <CarouselEvent className="bg-slate-900 py-6 w-full" />

      <div className="flex flex-col sm:flex-row max-w-7xl mx-auto">
        <ScrollReveal className="flex-1">
          <CallToAction
            title="Evento finalizado"
            description='Gracias por acompañarnos en la <strong class="font-bold text-amber-400">22a edición</strong>. Revive las charlas y la agenda completa del 7 de mayo.'
            buttonText="Ver agenda 2026"
            buttonLink="/agenda"
            variant="dark"
          />
        </ScrollReveal>
        <ScrollReveal className="flex-1" delay={0.15}>
          <CallToAction
            title="Edición anterior"
            description='Revive las charlas, talleres y momentos de la <strong class="font-bold text-amber-400">21a Edición</strong> del FLISoL Pereira 2025.'
            buttonText="Ver edición 2025"
            buttonLink="/2025"
            variant="dark"
          />
        </ScrollReveal>
      </div>

      <EventLocation variant="dark" />

      <ScrollReveal>
        <SponsorsSection sponsors={sponsors2026} variant="dark" />
      </ScrollReveal>

    </main>
  );
}
