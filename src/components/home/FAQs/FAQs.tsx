import Image from 'next/image'
import React from 'react'
import { FAQsDisclosure } from '@/components'
import { HavalH6 } from '@/assets'


const FAQsData = [
  {
    question: '¿Cómo funciona Garage Go?',
    answer: 'Puedes agendar, cotizar y reservar directo a través de de nuestra chateando con nuestros ejecutivo por WhatsApp, elige la modali retiro o preséncialos y listo.',
  },
  {
    question: '¿Cuanto es la garantía del servicio?',
    answer: 'Todos nuestros servicios cuentan con un periódo de garantía de 10.000 kms. A partir de la fecha de la entrega del vehículo.',
  },
  {
    question: '¿Pick&deliver tiene garantía?',
    answer: 'Sí, contamos con seguro de accidentes personales y seguro sobr Tu vehículo estará cubierto de ida y vuelta.',
  },
  {
    question: '¿Cómo cancelar un servicio?',
    answer: 'Una vez agendado y cancelado el servicio cuentas con un period previas al retiro o entrega de la unidad para solicitar un reembols agendar tu servicio.',
  },
  {
    question: '¿Que medios de pago aceptan?',
    answer: 'Aceptamos todo medio de pagos, Paga directo tu servicio contra línea con débito, crédito, también contamos con link de pago y p POS Getnet.',
  },
]

export const FAQs = () => {
  return (
    <section className='container-section bg-gray-100'>

      <div className='relative flex justify-center items-center w-full max-w-7xl padding-central-page'>
        <div className='relative h-96 w-full z-10'>
          {/* Blue circles */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-[400px] w-[400px] border-8 border-primaryBlue-500' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-80 w-80 bg-primaryBlue-500' />

          {/* Main image */}
          <Image
            src={HavalH6}
            alt='haval h6'
            fill
            className='object-contain'
          />
        </div>

        <div className='flex flex-col justify-start w-full px-10 ml-10'>
          <h2 className='text-3xl font-bold text-start'>
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
