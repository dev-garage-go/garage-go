import Image from 'next/image'
import { AgendaCotiza } from '@/assets'
import React from 'react'

interface Props {
  title: string,
  description: string,
  image: string
}

export const BannerCard = ({ description, image, title }: Props) => {
  return (
    <div className='flex justify-center items-center py-20'>
      <div className='relative flex items-center w-full max-w-5xl h-96 bg-primaryBlue-900 rounded-3xl shadow-xl overflow-hidden px-10 py-12'>
        {/* Texto */}
        <div className='relative w-1/2 text-white flex flex-col justify-center'>
          <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
          <p className='text-base leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Imagen: posicionada dentro del contenedor azul */}
        <div className='absolute bottom-0 right-0 h-full w-1/2'>
          <Image
            src={image}
            alt='mujer'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}
