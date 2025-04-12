export default function Registry() {
  return (
    <section id="registry" className="w-full py-20 bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px]">
          <p>Supongamos que aca hay un mapa</p>
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Inscripción al evento</h2>
          <p className="text-gray-600">
            ¡Inscríbete gratis para participar en las charlas y talleres de FLISoL Pereira 2025!
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institución o empresa (opcional)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Enviar inscripción
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
