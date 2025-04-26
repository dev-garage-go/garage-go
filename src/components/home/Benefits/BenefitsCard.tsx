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
    <div className='relative flex flex-col h-full w-full max-w-sm bg-white shadow-xl rounded-2xl' key={name}>
      {/* Name of benefit */}
      <div className='flex justify-center items-center p-3 md:p-4 w-full bg-primaryBlue-500 rounded-t-2xl'>
        <p className='text-sm md:text-base text-white text-center'>
          {name}
        </p>
      </div>

      <div className='py-4 px-5 md:p-6 md:px-7'>
        {/* Main image */}
        <div className='relative h-52 md:h-60 w-full'>
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

