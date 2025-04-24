import ImageCarousel from "../ui/carousel";

export default function CarouselEvent() {
  const imagesSet1 = [
    "/carousel/DSC_0058.webp",
    "/carousel/DSC_0628.webp",
    "/carousel/DSC_0086.webp",
    "/carousel/DSC_0277.webp",
    "/carousel/DSC_0409.webp",
    "/carousel/DSC_0457.webp",
    "/carousel/DSC_0682.webp",
    "/carousel/DSC_0953.webp",
  ];

  return (
    <section className="bg-radial-[at_50%_75%] from-amber-200 via-amber-300 to-amber-500 to-90% py-6 w-full">
      <h2 className="text-2xl sm:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg/40">
        Galería
      </h2>
      <ImageCarousel images={imagesSet1} aspectRatio="aspect-video"/>
    </section>
  );
}
