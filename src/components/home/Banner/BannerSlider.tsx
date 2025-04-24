"use client"

import React, { useEffect, useRef, useState } from 'react';
import { BannerCard } from '@/components';
import { BannerInformation } from '@/constants';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export const BannerSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={!isMobile}
        modules={[Pagination, Navigation]}
        className="w-full h-full"
      >

        {BannerInformation.map((item, index) => (
          <SwiperSlide key={index} className='px-4 sm:px-6 md:px-10 xl:px-0'>
            <BannerCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
