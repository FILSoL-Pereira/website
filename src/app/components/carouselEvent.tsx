import ImageCarousel from "../ui/carousel";

const DEFAULT_IMAGES = [
  "/carousel/DSC_0058.webp",
  "/carousel/DSC_0628.webp",
  "/carousel/DSC_0086.webp",
  "/carousel/DSC_0277.webp",
  "/carousel/DSC_0409.webp",
  "/carousel/DSC_0457.webp",
  "/carousel/DSC_0682.webp",
  "/carousel/DSC_0953.webp",
];

interface CarouselEventProps {
  images?: string[];
  title?: string;
  className?: string;
}

export default function CarouselEvent({
  images = DEFAULT_IMAGES,
  title = "Galeria",
  className,
}: CarouselEventProps) {
  return (
    <section className={className ?? "bg-radial-[at_50%_75%] from-amber-200 via-amber-300 to-amber-500 to-90% py-6 w-full"}>
      <h2 className="text-2xl sm:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg/40">
        {title}
      </h2>
      <ImageCarousel images={images} aspectRatio="aspect-video"/>
    </section>
  );
}
