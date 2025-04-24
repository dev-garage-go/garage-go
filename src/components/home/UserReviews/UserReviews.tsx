import React from 'react'
import { ReviewSlider } from './ReviewSlider'

export const UserReviews = () => {
  return (
    <section className='container-section bg-gray-100'>
      <h2 className='title-h2'>
        ¿Aun no te decides?
      </h2>
      <p className='description-of-title-h2'>
        Dale, te compartimos la experiencia de algunos de <br />
        nuestros clientes
      </p>
      <ReviewSlider />
    </section>
  )
}
