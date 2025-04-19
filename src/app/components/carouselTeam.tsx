import ImageCarousel from "../ui/carousel";

export default function CarouselTeam() {
  const teamImages = [
    "/staff/AndresV002.webp",
    "/staff/Esteban.webp",
    "/staff/Fredy.webp",
    "/staff/Jose.webp",
    "/staff/Mafe.webp",
    "/staff/Paula.webp",
    "/staff/Perez.webp",
    "/staff/Ruiz.webp",
    "/staff/Sebas.webp",
    "/staff/Ana.webp",
    "/staff/Jhon.webp",
    "/staff/a.webp",
  ];

  return (
    <section className="bg-gradient-to-b from-white via-gray-100 to-gray-200 py-6 w-full ">
      <h2 className="text-center text-3xl font-bold mb-4">Nuestro Equipo</h2>
      <ImageCarousel
        images={teamImages}
        aspectRatio="aspect-[2/3]"
        imageWidth="max-w-[200px]"
        itemFlex="flex-[0_0_50%] sm:flex-[0_0_20%]"
      />
    </section>
  );
}
