import Image from 'next/image'
import React from 'react'

interface Props {
  name: string,
  btnString: string,
  image: string
}

export const BenefitsCard = ({ btnString, image, name }: Props) => {
  return (
    // Frame
    // AC: I added m-10 margin so that it works well with the slider and there is room to render the shadows
    <div className='relative flex flex-col h-full w-full max-w-sm bg-white shadow-xl' key={name}>
      {/* Name of benefit */}
      <div className='flex justify-center items-center p-6 w-full bg-primaryBlue-500'>
        <p className='text-sm md:text-base text-white'>
          {name}
        </p>
      </div>

      <div className='p-4 md:p-6'>
        {/* Main image */}
        <div className='relative h-60 w-full'>
          <Image
            fill
            src={image}
            alt={name}
            className='object-cover rounded-lg w-auto h-auto'
          />
        </div>

        <div className='w-full flex justify-center items-center my-4'>
          <button className='text-sm md:text-base text-center text-primaryBlue-500 w-full max-w-sm p-2 rounded'>
            {btnString}
          </button>
        </div>

      </div>
    </div>
  )
}

