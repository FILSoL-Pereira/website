import Card from "../ui/card";

const freedoms = [
  {
    number: 0,
    title: "Usar",
    description:
      "La libertad de ejecutar el programa como se desee, con cualquier proposito",
  },
  {
    number: 1,
    title: "Analizar",
    description:
      "La libertad de estudiar el funcionamiento del programa y adaptarlo a sus necesidades",
  },
  {
    number: 2,
    title: "Compartir",
    description:
      "La libertad de redistribuir copias del programa para ayudar a los demas",
  },
  {
    number: 3,
    title: "Mejorar",
    description:
      "La libertad de mejorar el programa y hacer publicas las mejoras a los demas",
  },
];

export default function FreedomsSection() {
  return (
    <section className="py-16 pt-8 px-4 bg-radial-[at_50%_75%] from-amber-200 via-amber-300 to-amber-500 to-90%">
      <h2 className="text-3xl sm:text-5xl font-bold text-center text-white mb-10 drop-shadow-lg/40">
        Las libertades del software libre
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {freedoms.map((freedom) => (
          <div
            key={freedom.number}
            className="flex justify-center items-center"
          >
            <Card
              number={freedom.number}
              title={freedom.title}
              description={freedom.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
