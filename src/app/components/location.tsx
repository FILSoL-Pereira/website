import EventMap from "../ui/maps";

export default function EventLocation() {
    return (
      <section className="max-w-7xl py-16 px-4 bg-white text-gray-800 mx-auto">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Dónde será el evento?
          </h2>
          <p className="text-lg leading-relaxed">
            Este mes de Mayo Pereira se une nuevamente a la celebración del{" "}
            <strong>Festival Latinoamericano de Instalación de Software Libre (FLISoL)</strong>,
            el evento más grande de difusión del software libre en Latinoamérica.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Este año abrimos las puertas de la{" "}
            <strong>Universidad Tecnológica de Pereira</strong> para compartir conocimientos,
            experiencias y promover el uso de tecnologías libres.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Te esperamos el <strong>jueves 8 de Mayo</strong> a partir de las{" "}
            <strong>8:00 a.m.</strong> en la <strong>Sala Magistral del Edificio 13</strong>,
            en un espacio lleno de charlas, talleres, comunidad y colaboración.
          </p>
          <p className="text-xl sm:text-xl leading-relaxed mt-4 font-bold">
            ¡Ven, aprende, comparte y vive la experiencia FLISoL en Pereira!
          </p>
        </div>
  
        <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
          <EventMap />
        </div>
      </section>
    );
  }
