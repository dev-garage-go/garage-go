"use client"

import React, { useEffect, useState } from 'react';
import { BannerCard, BannerInformationData } from '@/features/home';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

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
        className="w-full h-full !overflow-visible"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={!isMobile}
        modules={[Pagination, Navigation]}
      >

        {BannerInformationData.map((item, index) => (
          <SwiperSlide key={index + item.title} className='padding-banner mb-4 sm:mb-0'>
            <BannerCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
