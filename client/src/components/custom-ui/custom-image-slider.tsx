"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeftCircleIcon,
  ChevronLeftSquareIcon,
  ChevronRightCircle,
  ChevronRightSquareIcon,
} from "lucide-react";
import Image from "next/image";
import React, { Key, useEffect, useState } from "react";
// import { LeftArrowCircle, RightArrowCircle } from "./icons";

interface ImageSliderProps {
  imageUrl: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ imageUrl }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((c) => (c + 1) % imageUrl.length);

  const handleLeft = () => {
    setCurrentSlide(
      currentSlide === 0 ? imageUrl.length - 1 : currentSlide - 1
    );
  };

  const handleRight = () => {
    setCurrentSlide(
      currentSlide === imageUrl.length - 1 ? 0 : currentSlide + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(next, 5000); // Auto move every 2 sec
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  console.log(imageUrl);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-center">
        <div
          className="absolute left-5 z-20 text-gray-500 drop-shadow-sm active:drop-shadow-xl cursor-pointer rounded-full transition-all duration-300 active:ring-2 ring-gray-500"
          onClick={handleLeft}
        >
          {/* <LeftArrowCircle size={25} /> */}
          <ChevronLeftCircleIcon />
        </div>
        <div className="relative flex overflow-hidden">
          {imageUrl &&
            imageUrl.length &&
            imageUrl.map((image, index: number) => (
              <Image
                key={index}
                width={1500}
                height={100}
                src={image}
                alt={`#product-image - ${index + 1}`}
                style={{ translate: `${-100 * currentSlide}%` }}
                className={cn(
                  "mask-fade-b object-cover transition-all duration-300",
                  currentSlide === index ? "z-10" : ""
                )}
              />
            ))}
        </div>
        <div
          className="absolute right-5 z-20 active:drop-shadow-xl text-gray-500 drop-shadow-sm cursor-pointer rounded-full transition-all duration-300 active:ring-2 ring-gray-500"
          onClick={handleRight}
        >
          {/* <RightArrowCircle size={25} /> */}
          <ChevronRightCircle />
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          {imageUrl &&
            imageUrl.length &&
            imageUrl.map((image, index: number) => (
              <Image
                // fill
                width={70}
                height={70}
                src={image.url}
                alt={`#product-image - ${index + 1}`}
                onMouseMove={() => setCurrentSlide(index)}
                className={
                  currentSlide === index
                    ? "object-cover rounded-md ring-2 w-[80px] h-[50px] ring-blue-500 ring-offset-2"
                    : "object-cover rounded-md w-[80px] h-[50px]"
                }
              />
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default ImageSlider;
