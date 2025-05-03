import EventMap from "../ui/maps";

export default function EventLocation() {
  return (
    <section className="max-w-7xl py-16 px-4 bg-white text-gray-800 mx-auto">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Charlas presenciales
        </h2>
        <p className="text-lg leading-relaxed">
          Este mayo, Pereira se suma al{" "}
          <strong>
            Festival Latinoamericano de Instalación de Software Libre
          </strong>
          , el mayor evento de difusión del software libre en la región.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          La <strong>Universidad Tecnológica de Pereira</strong> será sede del
          encuentro, promoviendo el uso de tecnologías libres.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          <strong>Cuándo:</strong> Jueves 8 de mayo, 8:00 a.m.
        </p>
        <p className="text-lg leading-relaxed">
          <strong>Dónde:</strong> Sala Magistral, Edificio 13, UTP
        </p>
        <p className="text-xl sm:text-xl leading-relaxed mt-4 font-bold">
          Charlas, talleres y comunidad en un solo lugar. <br />
          ¡Vive la experiencia FLISoL en Pereira!
        </p>
      </div>

      <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
        <EventMap
          location={{ lat: 4.790286, lng: -75.69014 }}
          width="100%"
          height="100%"
        />
      </div>
    </section>
  );
}
