import Image from 'next/image'
import React from 'react'

interface Props {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
}

export const StepsCard = ({ imageUrl, imageAlt, description, title }: Props) => {
  return (
    <div className='flex flex-col p-4 justify-center items-center bg-primaryBlue-500 rounded-3xl'>
      <div className='relative h-60 w-full'>
        <Image
          fill
          src={imageUrl}
          alt={imageAlt}
          className='object-cover w-auto h-auto rounded-xl'
        />
      </div>

      <div className='flex flex-col justify-center items-center w-full gap-3 mt-4'>
        <p className='text-center text-sm text-white font-semibold'>{title}</p>
        <p className='text-center text-sm text-gray-100'>{description}</p>
      </div>
    </div>
  )
}
