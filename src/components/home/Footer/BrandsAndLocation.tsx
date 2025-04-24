import Image from 'next/image'
import React from 'react'

export const BrandsAndLocation = () => {
  return (
    <section className='container-section'>

      <div className='flex flex-col w-full'>
        <div className='flex flex-col justify-center items-center bg-primaryBlue-300 w-full py-12'>
          <h3 className='title-h3 text-center text-white'>
            Trabajamos con las
            <br />
            mejores marcas
          </h3>
          <p className='text-xs sm:text-sm text-white text-center font-light mt-4'>
            Para asegurar la mayor calidad
            <br />
            En todos nuestros procesos
          </p>
        </div>

        <div className='h-60 bg-gray-100 w-full'>
          <Image
            src={""}
            fill
            alt='location'
            className='object-cover'
          />
        </div>
      </div>

    </section>
  )
}
