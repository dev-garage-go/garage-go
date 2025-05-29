"use client"

import { ReviewCard } from '@/features/home';
import { UserReviewsData } from '@/constants';

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
    spaceBetween: 25,
  },
  1920: {
    slidesPerView: 3.4,
    spaceBetween: 28,
  },
  2560: {
    slidesPerView: 4.2,
    spaceBetween: 30,
  },
}

export const ReviewSlider = () => {
  return (
    <div className="w-full p-6 sm:px-10 xl:px-20">
      <Swiper
        className='!overflow-visible'
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        breakpoints={SliderBreakpoints}
      >
        {UserReviewsData.map((item, index) => (
          <SwiperSlide
            key={index + item.name}
            className="pb-14"
          >
            <ReviewCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
