import Banner2026 from "./components/banner2026";
import Countdown from "./components/countdown";
import WhatIsFlisol from "./components/whatIsFlisol";
import WhyFreeSoftware from "./components/whyFreeSoftware";
import FreedomsSection from "./components/softwareFreedoms";
import CallToAction from "./components/callToAction";
import CarouselEvent from "./components/carouselEvent";
import SponsorsSection, { sponsors2026 } from "./components/sponsors";
import ScrollReveal from "./ui/scrollReveal";

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
            title="Asiste al evento"
            description='Registrate como asistente y recibe tu <strong class="font-bold text-amber-400">ticket personalizado con codigo QR</strong>. La entrada es completamente gratuita.'
            buttonText="Registrarme"
            buttonLink="/register"
            variant="dark"
          />
        </ScrollReveal>
        <ScrollReveal className="flex-1" delay={0.15}>
          <CallToAction
            title="Edicion anterior"
            description='Revive las charlas, talleres y momentos de la <strong class="font-bold text-amber-400">21a Edicion</strong> del FLISoL Pereira 2025.'
            buttonText="Ver edicion 2025"
            buttonLink="/2025"
            variant="dark"
          />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <SponsorsSection sponsors={sponsors2026} variant="dark" />
      </ScrollReveal>

    </main>
  );
}
