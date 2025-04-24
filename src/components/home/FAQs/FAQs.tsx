import Image from 'next/image'

import { FAQsDisclosure } from '@/components'
import { HavalH6 } from '@/assets'
import { FAQsData } from '@/constants'

export const FAQs = () => {
  return (
    <section className='container-section bg-gray-100 pb-32'>
      <div className='flex flex-col-reverse lg:flex-row w-full max-w-7xl mx-auto padding-central-page gap-10'>

        {/* Wrapper sticky */}
        <div className='w-full lg:w-1/2 sticky top-10 h-[300px] md:h-[400px]'>
          <div className='relative w-full h-full'>
            {/* Blue circles */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-60 h-60 sm:h-72 sm:w-72 xl:h-[400px] xl:w-[400px] border-8 border-primaryBlue-500 z-0' />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-48 h-48 sm:h-60 sm:w-60 xl:h-80 xl:w-80 bg-primaryBlue-500 z-0' />

            {/* Main image */}
            <Image
              src={HavalH6}
              alt='haval h6'
              fill
              priority
              className='object-contain z-10 px-10 sm:p-20 xl:p-0'
            />
          </div>
        </div>

        {/* Title and FAQs */}
        <div className='w-full lg:w-1/2 px-4'>
          <h2 className='title-h2 text-center md:text-start mb-10'>
            Preguntas frecuentes
          </h2>
          <div className='space-y-4'>
            {
              FAQsData.map((faq, index) => (
                <FAQsDisclosure key={index} {...faq} />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
