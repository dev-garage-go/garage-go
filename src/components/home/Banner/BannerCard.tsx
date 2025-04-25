import Image from 'next/image'
import { AgendaCotiza } from '@/assets'
import React from 'react'

interface Props {
  title: string,
  description: string,
  image: string
  imageAlt: string,
  hasButton?: boolean,
  buttonString?: string,
  buttonStyle?: string
  buttonFunc?: () => void
}

export const BannerCard = ({ description, image, title, imageAlt, hasButton, buttonString, buttonStyle, buttonFunc }: Props) => {
  return (
    <div className='flex justify-center items-center py-8 md:py-10 xl:py-12'>
      <div className='relative flex items-center w-full max-w-5xl h-72 md:h-96 bg-primaryBlue-900 rounded-3xl shadow-xl shadow-gray-400 overflow-hidden p-6 md:px-10 md:py-12'>
        {/* Texto */}
        <div className={`relative w-full sm:w-1/2 text-white flex flex-col justify-center ${hasButton ? 'gap-10' : 'gap-0'}`}>
          <div>
            <h2 className='text-lg md:text-2xl font-semibold mb-4'>{title}</h2>
            <p className='text-sm md:text-base leading-relaxed'>
              {description}
            </p>
          </div>
          {
            hasButton ? (
              <button
                onClick={buttonFunc}
                className={`font-medium py-2 text-sm sm:text-base px-10 w-full rounded-md ${buttonStyle}`}
              >
                {buttonString}
              </button>
            ) : ''
          }
        </div>

        {/* Imagen: posicionada dentro del contenedor azul */}
        <div className='hidden sm:block absolute bottom-0 right-0 h-full w-1/2'>
          <Image
            priority
            src={image}
            alt={imageAlt}
            fill
            className='object-contain w-auto h-auto pt-2'
          />
        </div>
      </div>
    </div>
  )
}
