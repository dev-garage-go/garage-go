import Image from 'next/image'
import { AgendaCotiza } from '@/assets'
import React from 'react'

export const BannerCard = () => {
  return (
    <div className='flex justify-center items-center py-20'>
      <div className='relative flex items-center w-full max-w-5xl h-96 bg-primaryBlue-900 rounded-3xl shadow-xl overflow-hidden px-10 py-12'>
        {/* Texto */}
        <div className='relative w-1/2 text-white flex flex-col justify-center'>
          <h2 className='text-2xl font-semibold mb-4'>Agenda y cotiza en línea</h2>
          <p className='text-base leading-relaxed'>
            Todo en un mismo lugar, reserva y paga tu servicio de manera fácil y rápida. Nosotros nos encargamos del resto.
            ¿Quieres cotizar algo adicional? Claro que sí. Nuestro equipo se pondrá en contacto a la brevedad para resolver tus necesidades.
          </p>
        </div>

        {/* Imagen: posicionada dentro del contenedor azul */}
        <div className='absolute bottom-0 right-0 h-full w-1/2'>
          <Image
            src={AgendaCotiza}
            alt='mujer'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}
