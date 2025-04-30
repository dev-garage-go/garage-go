"use client"

import Image from 'next/image';
import { Carousel } from '@/components';

import {
  BoshWideImg,
  Bridgestone,
  Dunlop,
  Falken,
  Goodyear,
  Hankook,
  Keko,
  Repsol,
  Thule
} from '@/assets';

const suppliersLogos = [
  { id: 'Bridgestone', image: Bridgestone },
  { id: 'Dunlop', image: Dunlop },
  { id: 'Falken', image: Falken },
  { id: 'Goodyear', image: Goodyear },
  { id: 'Bosh', image: BoshWideImg },
  { id: 'Hankook', image: Hankook },
  { id: 'Keko', image: Keko },
  { id: 'Repsol', image: Repsol },
  { id: 'Thule', image: Thule }
];

const SuppliersLogo = ({ logo }: { logo: { id: string; image: string } }) => (
  <div className='relative w-14 h-14 md:w-16 md:h-16'>
    <Image
      fill
      src={logo.image}
      alt={logo.id}
      className="w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all"
    />
  </div>
);

export const SuppliersBrandsCarousel = () => {
  return (
    <div className="mt-16">
      <Carousel
        isInfinite
        items={suppliersLogos}
        renderItem={(logo) => <SuppliersLogo logo={logo} />}
        itemWidth={180}
        gap={24}
        scrollSpeed={20}
        direction='left'
      />
    </div>
  );
};