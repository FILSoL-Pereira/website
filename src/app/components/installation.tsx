import EventMap from "../ui/maps";

export default function Installation() {
  return (
    <section className="w-full py-10 px-4 sm:px-6 bg-radial-[at_50%_10%] from-sky-900 via-slate-900 to-gray-950 to-80% text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-amber-400 drop-shadow-[0_0_4px]">
          Instalación de Distribuciones Linux
        </h2>
        <p className="text-lg sm:text-xl text-gray-300">
          Durante todo el día, estaremos realizando la instalación de la
          distribución de Linux que prefieras. Nuestro equipo estará disponible
          para ayudarte a instalar y configurar tu sistema operativo de manera
          personalizada, asegurándonos de que todo funcione correctamente.
        </p>
        <p className="text-lg sm:text-xl text-gray-300 mt-4">
          ¡No importa si eres principiante o experto, estamos aquí para guiarte
          en el proceso y responder a todas tus preguntas!
        </p>
        <p className="text-lg sm:text-xl text-gray-300 mt-4 font-bold">
          Te esperamos en el{" "}
          <span className="text-amber-400">Laboratorio de Sirius</span> en el{" "}
          <span className="text-amber-400">
            Salón 3 - S107 detrás del CRIE (edificio 3)
          </span>
          .
        </p>
      </div>
      <div className="max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg mt-4">
        <EventMap
          location={{ lat: 4.795029846329031, lng: -75.6875643993582 }}
          width="100%"
          height="100%"
        />
      </div>
    </section>
  );
}
