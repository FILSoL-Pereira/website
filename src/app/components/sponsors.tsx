import Image from "next/image";

type Sponsor = {
  src: string;
  alt: string;
  href: string;
};

type SponsorsData = Record<string, Sponsor[]>;

export const sponsors2026: SponsorsData = {
  patrocinadores: [
    {
      src: "/sponsors/1.UTP_color.svg",
      alt: "Universidad Tecnológica de Pereira",
      href: "https://www.utp.edu.co",
    },
    {
      src: "/sponsors/aseutp.webp",
      alt: "Asociación de Egresados de la UTP",
      href: "https://www.instagram.com/aseutp/",
    },
    {
      src: "/sponsors/Logo-Circular-Facultad-Ingenierias.png",
      alt: "Facultad de Ingenierías UTP",
      href: "https://ingenierias.utp.edu.co/",
    },
  ],
  aliados: [
    {
      src: "/participants/QA.webp",
      alt: "QAConf",
      href: "https://www.qaconf.co/",
    },
    {
      src: "/participants/Ubuntu-Colombia-2022.svg",
      alt: "Ubuntu Colombia",
      href: "https://ubuntu-co.com",
    },
    {
      src: "/participants/Logo-Outlined-Dark.svg",
      alt: "Backbone",
      href: "https://github.com/Backbone-UTP",
    },
  ],
};

export const sponsors2025: SponsorsData = {
  patrocinadores: [
    {
      src: "/sponsors/1.UTP_color.svg",
      alt: "Universidad Tecnológica de Pereira",
      href: "https://www.utp.edu.co",
    },
    {
      src: "/sponsors/aseutp.webp",
      alt: "Asociación de Egresados de la UTP",
      href: "https://www.instagram.com/aseutp/",
    },
    {
      src: "/sponsors/DailyBot.webp",
      alt: "DailyBot",
      href: "https://dailybot.com",
    },
    {
      src: "/sponsors/UTPIngenieria.webp",
      alt: "UTP Ingenierías",
      href: "https://ingenierias.utp.edu.co/",
    },
  ],
  aliados: [
    {
      src: "/participants/QA.webp",
      alt: "QAConf",
      href: "https://www.qaconf.co/",
    },
    {
      src: "/participants/Ubuntu-Colombia-2022.svg",
      alt: "Ubuntu Colombia",
      href: "https://ubuntu-co.com",
    },
    {
      src: "/participants/Logo-Outlined-Dark.svg",
      alt: "Backbone",
      href: "https://github.com/Backbone-UTP",
    },
    {
      src: "/participants/sirius.webp",
      alt: "Sirius",
      href: "https://www.linkedin.com/company/grupo-sirius/",
    },
  ],
};

export default function SponsorsSection({
  sponsors,
  className,
  variant = "light",
}: {
  sponsors: SponsorsData;
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <section className={className ?? (isDark ? "bg-slate-950 py-16 px-4" : "bg-white py-16 px-4")}>
      <div className="max-w-6xl mx-auto space-y-12">
        {Object.entries(sponsors).map(([key, logos]) => (
          <div key={key}>
            <h3
              className={`text-2xl font-bold mb-6 text-center capitalize ${isDark ? "text-white" : "text-gray-800"}`}
            >
              {key}
            </h3>
            <div className="flex justify-center flex-wrap gap-8 items-center">
              {logos.map((logo, idx) => (
                <a
                  key={idx}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative block ${isDark ? "w-36 h-20 sm:w-44 sm:h-24 bg-white rounded-xl p-3" : "w-32 h-16 sm:w-40 sm:h-20"}`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain drop-shadow-lg p-2"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
