import Image from "next/image";

const conferencias = [
  {
    name: "María Pérez",
    title: "Introducción al Software Libre",
    time: "10:00 AM",
    img: "/Flisol.svg",
  },
  {
    name: "Carlos Gómez",
    title: "Linux para principiantes",
    time: "11:00 AM",
    img: "/Flisol-Logo.svg",
  },
  {
    name: "Ana Torres",
    title: "Ciberseguridad en entornos abiertos",
    time: "12:00 PM",
    img: "/ponentes/ana.jpg",
  },
  {
    name: "Luis Martínez",
    title: "Automatización con Bash",
    time: "01:00 PM",
    img: "/ponentes/ana.jpg",
  },
  {
    name: "Sofía Ramírez",
    title:
      "Open Source y Comunidad Open Source y Comunidad Open Source y Comunidad Open Source y Comunidad Open Source y Comunidad Open Source y Comunidad",
    time: "02:00 PM",
    img: "/ponentes/ana.jpg",
  },
];

export default function Agenda() {
  return (
    <section className="w-full py-20 text-white px-4 sm:px-6 bg-radial-[at_50%_10%] from-sky-900 via-slate-900 to-gray-950 to-80%">
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-4xl sm:text-6xl font-bold text-center mb-20 z-10 relative text-shadow-lg drop-shadow-[0_0_4px_white]" >
          Programación de Conferencias
        </h2>

        <div className="relative flex flex-col gap-10">
          <div className="absolute left-1/2  -translate-x-1/2 h-full w-1 bg-amber-500 z-0 hidden sm:block" />

          {conferencias.map((conf, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex w-full ${
                  isLeft ? "justify-start" : "justify-end"
                } sm:items-stretch items-center flex-col sm:flex-row`}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-amber-500 rounded-full z-20 hidden sm:block" />

                <time
                  className={`text-3xl font-bold text-white drop-shadow-[0_0_4px_white] mb-4 sm:mb-0 sm:text-5xl sm:absolute sm:top-1/2 sm:-translate-y-1/2 ${
                    isLeft
                      ? "sm:left-[calc(50%+1.5rem)] sm:text-left text-center"
                      : "sm:right-[calc(50%+1.5rem)] sm:text-right text-center"
                  }`}
                >
                  {conf.time}
                </time>

                <div
                  className={`bg-gray-800 p-3 sm:p-6 rounded-lg shadow-md w-full max-w-lg z-10 transform transition-transform duration-300 hover:scale-[1.02] active:scale-102`}
                >
                  <div className="flex flex-row items-center gap-2 sm:gap-4">
                    <Image
                      src={conf.img}
                      alt={`Foto de ${conf.name}`}
                      width={60}
                      height={60}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-500 "
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold break-words line-clamp-3">
                        {conf.title}
                      </h3>
                      <p className="text-lg text-gray-300">{conf.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
