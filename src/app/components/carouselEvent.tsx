import ImageCarousel from "../ui/carousel";

export default function CarouselEvent() {
  const imagesSet1 = [
    "/Meteor.svg",
    "/Flisol.svg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
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
