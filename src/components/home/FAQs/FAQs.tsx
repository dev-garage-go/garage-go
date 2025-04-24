import Image from 'next/image'
import React from 'react'
import { FAQsDisclosure } from '@/components'
import { HavalH6 } from '@/assets'


const FAQsData = [
  {
    question: '¿Cómo funciona Garage Go?',
    answer: 'Podés agendar, cotizar y reservar a través de nuestra web o WhatsApp...',
  },
  {
    question: '¿Cuánto es la garantía del servicio?',
    answer: 'Pick&deliver tiene garantía de satisfacción por 7 días hábiles...',
  },
  {
    question: '¿Cómo funciona Garage Go?',
    answer: 'Podés agendar, cotizar y reservar a través de nuestra web o WhatsApp...',
  },
  {
    question: '¿Cuánto es la garantía del servicio?',
    answer: 'Pick&deliver tiene garantía de satisfacción por 7 días hábiles...',
  },
  {
    question: '¿Cómo funciona Garage Go?',
    answer: 'Podés agendar, cotizar y reservar a través de nuestra web o WhatsApp...',
  },
  {
    question: '¿Cuánto es la garantía del servicio?',
    answer: 'Pick&deliver tiene garantía de satisfacción por 7 días hábiles...',
  },
]

export const FAQs = () => {
  return (
    <section className='container-section bg-gray-300'>

      <div className='flex justify-center items-center w-full max-w-6xl bg-red-100'>
        <div className='relative h-72 w-full max-w-md bg-green-200'>
          <Image
            src={HavalH6}
            alt='haval h6'
            fill
            className='object-contain'
          />
        </div>

        <div className='flex-col justify-end items-center w-full'>
          <h2 className='title-h2'>
            Preguntas frecuentes
          </h2>
          <div className='mt-10'>
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
