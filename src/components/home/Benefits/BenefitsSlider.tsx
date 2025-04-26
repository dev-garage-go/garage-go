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

const SliderBreakpoints = {
  320: {
    slidesPerView: 1.2,
    spaceBetween: 15,
  },
  640: {
    slidesPerView: 1.6,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 1.8,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 2.4,
    spaceBetween: 23,
  },
  1920: {
    slidesPerView: 3.4,
    spaceBetween: 23,
  },
  2560: {
    slidesPerView: 4.2,
    spaceBetween: 30,
  },
}

export const BenefitsSlider = () => {
  return (
    <div className="w-full p-6 sm:px-10 xl:px-20">
      <Swiper
        className='!overflow-visible'
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        breakpoints={SliderBreakpoints}
      >
        {BenefitsData.map((benefit, index) => (
          <SwiperSlide
            key={index}
            className="pb-14"
          >
            <BenefitsCard {...benefit} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
