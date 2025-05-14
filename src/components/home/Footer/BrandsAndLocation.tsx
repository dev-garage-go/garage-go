import Image from 'next/image'

import { CompanyLocation } from '@/assets'
import { GoogleMapComponent, SuppliersBrandsCarousel } from '@/components';

export const BrandsAndLocation = () => {
  return (
    <section>

      <div className='flex flex-col w-full'>
        {/* Title and bg blue */}
        <div className='flex flex-col justify-center items-center bg-primaryBlue-300 w-full py-6 sm:py-8 md:py-10 xl:py-12'>
          <h3 className='title-h2 text-center text-white'>
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
        <div className="carousel-container bg-gray-100">
          <SuppliersBrandsCarousel />
        </div>


        {/* Map */}
        <div className='relative w-full h-60 sm:h-72 xl:h-[550px]'>
          <GoogleMapComponent />
        </div>
      </div>

    </section>
  )
}
