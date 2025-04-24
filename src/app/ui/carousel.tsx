"use client";
import { Linkedin } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type ImageItem = string | { src: string; linkedin?: string };

type ImageCarouselProps = {
  images: ImageItem[];
  aspectRatio?: string;
  imageWidth?: string;
  itemFlex?: string;
};

export default function ImageCarousel({
  images,
  aspectRatio = "aspect-video",
  imageWidth = "w-full",
  itemFlex = "flex-[0_0_100%] sm:flex-[0_0_33.333%]",
}: ImageCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);

  return (
    <div className="overflow-hidden max-w-7xl mx-auto" ref={emblaRef}>
      <div className="flex">
        {images.map((img, i) => {
          const isObject = typeof img === "object";
          const src = isObject ? img.src : img;
          const linkedin = isObject && img.linkedin;

          return (
            <div key={i} className={`${itemFlex} px-4`}>
              <div
                className={`relative ${imageWidth} ${aspectRatio} rounded-xl overflow-hidden shadow-lg mx-auto group`}
              >
                <Image
                  src={src}
                  alt={`Imagen ${i}`}
                  fill
                  className="object-cover object-center transform transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
                  priority
                />

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"
                  >
                    <Linkedin color="white" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
