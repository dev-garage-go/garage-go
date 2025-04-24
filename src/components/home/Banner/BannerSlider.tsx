"use client"

import React, { useRef, useState } from 'react';
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
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full h-full"
      >

        {BannerInformation.map((item, index) => (
          <SwiperSlide key={index}>
            <BannerCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
