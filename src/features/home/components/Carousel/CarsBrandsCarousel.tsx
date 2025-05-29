"use client"

import Image from 'next/image';
import { Carousel } from '@/components';
import { useResponsiveGap } from '@/features/home';

import { obtainImage } from '@/assets/helpers';

const brandLogos = [
  { id: 'audi', image: obtainImage('vehicleBrands', 'audi') },
  { id: 'bmw', image: obtainImage('vehicleBrands', 'bmw') },
  { id: 'chevrolet', image: obtainImage('vehicleBrands', 'chevrolet') },
  { id: 'citroen', image: obtainImage('vehicleBrands', 'citroen') },
  { id: 'fiat', image: obtainImage('vehicleBrands', 'fiat') },
  { id: 'ford', image: obtainImage('vehicleBrands', 'ford') },
  { id: 'hyundai', image: obtainImage('vehicleBrands', 'hyundai') },
  { id: 'jeep', image: obtainImage('vehicleBrands', 'jeep') }
];

const BrandLogo = ({ logo }: { logo: { id: string; image: string } }) => (
  <div className='relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16'>
    <Image
      fill
      sizes="(min-width: 768px) 64px, (min-width: 640px) 56px, 48px"
      src={logo.image}
      alt={logo.id}
      className="w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all"
    />
  </div>
);

export const CarsBrandsCarousel = () => {
  return (
    <div>
      <Carousel
        isInfinite
        items={brandLogos}
        renderItem={(logo) => <BrandLogo logo={logo} />}
        itemWidth={180}
        gap={useResponsiveGap()}
        scrollSpeed={20}
        direction='left'
      />
    </div>
  );
};