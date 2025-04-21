"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type ImageCarouselProps = {
  images: string[];
  aspectRatio?: string;
  imageWidth?: string; 
  itemFlex?: string;
};


export default function ImageCarousel({
  images,
  aspectRatio = "aspect-video",
  imageWidth = "w-full",
  itemFlex = "flex-[0_0_100%] sm:flex-[0_0_33.333%]"
}: ImageCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2000 })]);

  return (
    <div className="overflow-hidden max-w-7xl mx-auto" ref={emblaRef}>
      <div className="flex">
        {images.map((src, i) => (
          <div key={i} className={`${itemFlex} px-4`}>
            <div
              className={`relative ${imageWidth} ${aspectRatio} rounded-xl overflow-hidden shadow-lg mx-auto`}
            >
              <Image
                src={src}
                alt={`Imagen ${i}`}
                fill
                className="object-cover object-center transform transition-transform duration-300 hover:scale-110 "
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

