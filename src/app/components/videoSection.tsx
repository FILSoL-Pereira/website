export default function VideoSection() {
  return (
    <section className="relative z-10 w-full bg-white py-20 px-4 sm:px-6 text-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-10">
        <div className="w-full sm:w-1/2 aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/7c83uouDPQA?si=Q70_2wf2C6WUichl"
            title="FLISoL Pereira 2025"
            allowFullScreen
          ></iframe>
        </div>

        <div className="w-full sm:w-1/2 space-y-4 text-center sm:text-left">
          <h2 className="text-3xl font-bold">¿Qué es FLISoL?</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            El Festival Latinoamericano de Instalación de Software Libre
            (FLISoL) es el evento más grande de difusión y promoción del
            Software Libre en Latinoamérica, reuniendo a miles de entusiastas y
            expertos de la tecnología.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            En Pereira 2025, podrás disfrutar de charlas inspiradoras, talleres
            prácticos y espacios de networking que se adaptan a todos los
            niveles de experiencia. Será una oportunidad perfecta para conectar
            con la comunidad tecnológica, compartir ideas y aprender de otros.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 font-bold">
            ¡No te pierdas esta gran oportunidad de ser parte de un evento único
            que promueve la innovación y la libertad digital!
          </p>
        </div>
      </div>
    </section>
  );
}
