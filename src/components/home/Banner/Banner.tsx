import React from 'react'
import { BannerSlider } from '@/components'

export const Banner = () => {
  return (
    <section className='relativepadding-central-page flex flex-col justify-center items-center mt-32'>
      <h2 className='text-3xl font-medium text-center'>
        En Garage Go, encuentra la mejor
        <br />
        alternativa al consecionario
      </h2>

      {/* Bg gray */}
      <div className='absolute bottom-0 bg-gray-100 w-full h-full max-h-52 md:max-h-80' />
      
      <BannerSlider />
    </section>
  )
}
