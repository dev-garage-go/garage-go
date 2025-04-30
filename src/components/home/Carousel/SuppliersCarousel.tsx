"use client"

import Image from 'next/image';
import { Carousel } from '@/components';
import { useResponsiveGap } from '@/hooks';

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
  <div className='carousel-images-container'>
    <Image
      fill
      src={logo.image}
      alt={logo.id}
      className="w-auto h-auto object-contain grayscale transition-all opacity-80"
    />
  </div>
);

export const SuppliersBrandsCarousel = () => {
  return (
    <div>
      <Carousel
        isInfinite
        items={suppliersLogos}
        renderItem={(logo) => <SuppliersLogo logo={logo} />}
        itemWidth={180}
        gap={useResponsiveGap()}
        scrollSpeed={20}
        direction='right'
      />
    </div>
  );
};