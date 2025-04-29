"use client"

import {
  Audi,
  Bmw,
  Chevrolet,
  Citroen,
  Fiat,
  Ford,
  Hyundai,
  Jeep
} from '@/assets';
import Image from 'next/image';
import { Carousel } from './Carousel'; // Asegúrate de la ruta correcta

const brandLogos = [
  { id: 'audi', image: Audi },
  { id: 'bmw', image: Bmw },
  { id: 'chevrolet', image: Chevrolet },
  { id: 'citroen', image: Citroen },
  { id: 'fiat', image: Fiat },
  { id: 'ford', image: Ford },
  { id: 'hyundai', image: Hyundai },
  { id: 'jeep', image: Jeep }
];

const BrandLogo = ({ logo }: { logo: { id: string; image: string } }) => (
  <div className='relative w-14 h-14 md:w-16 md:h-16'>
    <Image
      fill
      src={logo.image}
      alt={logo.id}
      className="w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all"
    />
  </div>
);

export const CarsBrandsCarousel = () => {
  return (
    <div className="mt-16">
      <Carousel
        isInfinite
        items={brandLogos}
        renderItem={(logo) => <BrandLogo logo={logo} />}
        itemWidth={180}
        gap={24}
        scrollSpeed={20}
        direction='left'
      />
    </div>
  );
};