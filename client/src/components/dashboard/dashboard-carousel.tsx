import Image from "next/image";
import CarouselImage from "../../../public/images/TallHero_3000X1200_Unrec._CB593464763_.jpg";
import ImageSlider from "../custom-ui/custom-image-slider";

const slides = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/Img25/Consumables/SVD/May16/PC_Hero_02._CB794081125_.png",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/2025/GW/UBS/May/Unrec/PC/1-1._CB794229172_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/GW/BAU/1577881440._CB794202017_.png",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg",
];

const DashboardCarousel = () => (
  <div className="w-full">
    <ImageSlider imageUrl={slides} />
  </div>
);

export default DashboardCarousel;

// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export function CarouselDemo() {
//   return (
//     <Carousel className="w-full max-w-xs">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-4xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
