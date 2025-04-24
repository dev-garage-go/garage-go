import React from 'react'
import { ReviewSlider } from './ReviewSlider'

export const UserReviews = () => {
  return (
    <section>
      <h2 className='title-h2'>
        ¿Aun no te decides?
      </h2>
      <p className='description-title-h2'>
        Dale, te compartimos la experiencia de algunos de <br />
        nuestros clientes
      </p>
      <ReviewSlider />
    </section>
  )
}
