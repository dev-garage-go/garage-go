'use client'

import Image from 'next/image'
import React from 'react'
import { FAQsDisclosure } from '@/components'
import { HavalH6 } from '@/assets'

const FAQsData = [
  {
    question: '¿Cómo funciona Garage Go?',
    answer: 'Puedes agendar, cotizar y reservar directo a través de nuestra web o chateando con nuestros ejecutivos por WhatsApp. Elegí la modalidad de retiro o presencial, ¡y listo!',
  },
  {
    question: '¿Cuánto es la garantía del servicio?',
    answer: 'Todos nuestros servicios cuentan con un período de garantía de 10.000 kms a partir de la fecha de entrega del vehículo.',
  },
  {
    question: '¿Pick&deliver tiene garantía?',
    answer: 'Sí, contamos con seguro de accidentes personales y cobertura para tu vehículo de ida y vuelta.',
  },
  {
    question: '¿Cómo cancelar un servicio?',
    answer: 'Una vez agendado y cancelado el servicio, contás con un período previo al retiro o entrega de la unidad para solicitar un reembolso.',
  },
  {
    question: '¿Qué medios de pago aceptan?',
    answer: 'Aceptamos todo tipo de pagos. Podés pagar tu servicio contra entrega con débito, crédito, link de pago o POS Getnet.',
  },
]

export const FAQs = () => {
  return (
    <section className='container-section bg-gray-100 py-16'>
      <div className='flex flex-col-reverse lg:flex-row w-full max-w-7xl mx-auto padding-central-page gap-10'>

        {/* Wrapper sticky */}
        <div className='w-full lg:w-1/2 sticky top-10 h-[400px]'>
          <div className='relative w-full h-full'>
            {/* Blue circles */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-[400px] w-[400px] border-8 border-primaryBlue-500 z-0' />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-80 w-80 bg-primaryBlue-500 z-0' />

            {/* Main image */}
            <Image
              src={HavalH6}
              alt='haval h6'
              fill
              className='object-contain z-10'
            />
          </div>
        </div>

        {/* Title and FAQs */}
        <div className='w-full lg:w-1/2 px-4'>
          <h2 className='text-3xl font-bold text-start mb-10'>
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
