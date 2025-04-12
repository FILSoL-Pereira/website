import Image from "next/image";

const conferencias = [
  {
    nombre: "María Pérez",
    titulo: "Introducción al Software Libre",
    hora: "10:00 AM",
    imagen: "/Flisol.svg",
  },
  {
    nombre: "Carlos Gómez",
    titulo: "Linux para principiantes",
    hora: "11:00 AM",
    imagen: "/Flisol-Logo.svg",
  },
  {
    nombre: "Ana Torres",
    titulo: "Ciberseguridad en entornos abiertos",
    hora: "12:00 PM",
    imagen: "/ponentes/ana.jpg",
  },
  // Agrega más aquí
];

export default function Scheduling() {
  return (
    <section id="scheduling" className="w-full py-20 bg-gray-900 text-white px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Programacion de Conferencias
        </h2>
        {conferencias.map((conf, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:scale-[1.01] transition-transform"
          >
            <Image
              src={conf.imagen}
              alt={conf.nombre}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl font-semibold">{conf.nombre}</h3>
              <p className="text-gray-300">{conf.titulo}</p>
              <p className="text-sm text-gray-400">{conf.hora}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
