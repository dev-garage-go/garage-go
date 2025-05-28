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
  { id: 'bridgestone', image: Bridgestone },
  { id: 'dunlop', image: Dunlop },
  { id: 'falken', image: Falken },
  { id: 'goodyear', image: Goodyear },
  { id: 'bosh', image: BoshWideImg },
  { id: 'hankook', image: Hankook },
  { id: 'keko', image: Keko },
  { id: 'repsol', image: Repsol },
  { id: 'thule', image: Thule }
];

const SuppliersLogo = ({ logo }: { logo: { id: string; image: string } }) => (
  <div className='relative w-24 h-24 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:w-36 lg:h-36'>
    <Image
      fill
      sizes="(min-width: 1024px) 144px, (min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
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