import Image from 'next/image'

import { FAQsDisclosure } from '@/features/home'
import { obtainImage } from '@/assets/helpers'
import { FAQsData } from '@/constants'

export const FAQs = () => {
  return (
    <section className='container-section bg-gray-100 pb-from-footer'>
      <div className='flex flex-col-reverse lg:flex-row w-full max-w-7xl mx-auto padding-central-page gap-10'>

        {/* Wrapper sticky */}
        {/* prevents the content from being distorted when a response is opened */}
        <div className='w-full lg:w-1/2 sticky top-10 h-[300px] md:h-[350px] xl:h-[400px]'>
          <div className='relative w-full h-full'>
            {/* Main image */}
            <Image
              src={obtainImage('faqs', 'havalH6Circle')}
              alt='haval h6'
              sizes='(min-width: 1024px) 50vw, 100vw'
              fill
              priority
              className='object-contain w-auto h-auto'
            />
          </div>
        </div>

        {/* Title and FAQs */}
        <div className='w-full lg:w-1/2 px-4'>
          <h2 className='title-h2 font-semibold text-center md:text-start mb-10'>
            Preguntas frecuentes
          </h2>
          <div className='space-y-4'>
            {
              FAQsData.map((faq, index) => (
                <FAQsDisclosure key={index + faq.question} {...faq} />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
