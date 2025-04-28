import Image from 'next/image'

import { CompanyLocation } from '@/assets'
import { CompanySuppliersImages } from '@/constants'

export const BrandsAndLocation = () => {
  return (
    <section>

      <div className='flex flex-col w-full h-full'>
        {/* Title and bg blue */}
        <div className='flex flex-col justify-center items-center bg-primaryBlue-300 w-full py-6 sm:py-8 md:py-10 xl:py-12'>
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
        <div className="flex flex-wrap justify-center 2xl:justify-between items-center gap-4 w-full sm:p-6 md:py-8 lg:py-10 xl:py-16 bg-gray-100">
          {CompanySuppliersImages.map((supplier, index) => (
            <div
              key={index + supplier.name}
              className="relative flex justify-between items-center rounded-md
                 w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32"
            >
              <Image
                src={supplier.image}
                alt={supplier.name}
                fill
                className="object-contain p-4 opacity-70 w-auto h-auto"
              />
            </div>
          ))}
        </div>


        {/* Map */}
        <div className='relative w-full h-60 sm:h-72 xl:h-[550px] bg-red-300'>
          <Image
            fill
            priority
            alt='location of company'
            src={CompanyLocation}
            className='object-cover w-auto h-auto'
          />
        </div>
      </div>

    </section>
  )
}
