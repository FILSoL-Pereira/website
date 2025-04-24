import ImageCarousel from "../ui/carousel";

export default function CarouselTeam() {
  const teamImages = [
    { src: "/staff/AndresV002.webp", linkedin: "https://linkedin.com/in/andresmpa" },
    { src: "/staff/Esteban.webp", linkedin: "https://linkedin.com/in/estebanescor" },
    { src: "/staff/Fredy.webp", linkedin: "https://linkedin.com/in/frederick-castañeda" },
    { src: "/staff/Jose.webp", linkedin: "https://linkedin.com/in/josefeldc" },
    { src: "/staff/Mafe.webp", linkedin: "https://linkedin.com/in/londmafe" },
    { src: "/staff/Paula.webp", linkedin: "https://linkedin.com/in/paula-a-castro" },
    { src: "/staff/Perez.webp", linkedin: "https://linkedin.com/in/mega-barto" },
    { src: "/staff/Ruiz.webp", linkedin: "https://linkedin.com/in/sebastian-ruiz-hernandez" },
    { src: "/staff/Sebas.webp", linkedin: "https://linkedin.com/in/sebastianamo" },
    { src: "/staff/Ana.webp", linkedin: "https://linkedin.com/in/anasofibel" },
    { src: "/staff/Jhon.webp", linkedin: "https://linkedin.com/in/jgaviria0" },
    { src: "/staff/a.webp", linkedin: "https://linkedin.com/in/djkde" },
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
