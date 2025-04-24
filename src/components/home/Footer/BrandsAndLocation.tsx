import Image from 'next/image'

import { CompanyLocation } from '@/assets'
import { CompanySuppliersImages } from '@/constants'

export const BrandsAndLocation = () => {
  return (
    <section className='container-section'>

      <div className='flex flex-col w-full h-full'>
        {/* Title and bg blue */}
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

        {/* Company suppliers */}
        <div className='flex justify-center items-center bg-gray-100 w-full h-56'>
          {CompanySuppliersImages.map((supplier, index) => (
            <div className='relative flex justify-center items-center h-full w-full'>
              <Image
                key={index}
                src={supplier.image}
                fill
                alt={supplier.name}
                className='object-contain p-7 opacity-45'
              />
            </div>
          ))}
        </div>

        {/* Map */}
        <div className='relative w-full h-[550px] bg-red-300'>
          <Image
            fill
            priority
            alt='location of company'
            src={CompanyLocation}
            className='object-cover'
          />
        </div>
      </div>

    </section>
  )
}
