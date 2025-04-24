import React from 'react'
import { BannerSlider } from '@/components'

export const Banner = () => {
  return (
    <section>
      <h2 className='text-3xl font-medium'>
        En Garage Go, encuentra la mejor 
        <br />
        alternativa al consecionario
      </h2>
      <BannerSlider />
    </section>
  )
}
