import React from 'react'
import { BannerSlider } from '@/components'

export const Banner = () => {
  return (
    <section className='padding-central-page flex flex-col justify-center items-center mt-32'>
      <h2 className='text-3xl font-medium text-center'>
        En Garage Go, encuentra la mejor
        <br />
        alternativa al consecionario
      </h2>
      <BannerSlider />
    </section>
  )
}
