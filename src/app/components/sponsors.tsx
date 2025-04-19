import Image from "next/image";

const sponsors = {
  patrocinadores: [
    {
      src: "/sponsors/1.UTP_color.svg",
      alt: "Universidad Tecnológica de Pereira",
      href: "https://www.utp.edu.co",
    },
    {
      src: "/sponsors/DailyBot.webp",
      alt: "DailyBot",
      href: "https://dailybot.com",
    },
    {
      src: "/sponsors/GitHub_Lockup_Dark.svg",
      alt: "GitHub",
      href: "https://github.com",
    },
    {
      src: "/sponsors/UTPIngenieria.webp",
      alt: "UTP Ingenierías",
      href: "https://ingenierias.utp.edu.co/",
    },
  ],
  aliados: [
    {
      src: "/participants/QAConf.webp",
      alt: "QAConf",
      href: "https://www.qaconf.co/",
    },
    {
      src: "/participants/sirius.webp",
      alt: "Sirius",
      href: "https://www.linkedin.com/company/grupo-sirius/",
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
      src: "/participants/wie.webp",
      alt: "WIE",
      href: "https://www.instagram.com/wie_utp",
    },
  ],
};

export default function SponsorsSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {Object.entries(sponsors).map(([key, logos]) => (
          <div key={key}>
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 capitalize">
              {key}
            </h3>
            <div className="flex justify-center flex-wrap gap-8 items-center">
              {logos.map((logo, idx) => (
                <a
                  key={idx}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-32 h-16 sm:w-40 sm:h-20 block"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain drop-shadow-lg"
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
