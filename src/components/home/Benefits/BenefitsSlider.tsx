"use client"

import React, { useRef, useState } from 'react';
import { BenefitsCard } from '@/components';
import { BenefitsData } from '@/constants';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

export const BenefitsSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="w-full max-w-[calc(85%)] bg-red-100"
      >

        {BenefitsData.map((benefit, index) => (
          <SwiperSlide
            key={index}
            className='overflow-visible p-14'
          >
            <BenefitsCard {...benefit} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
