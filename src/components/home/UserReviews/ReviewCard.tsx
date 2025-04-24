import Image from 'next/image'
import React from 'react'
import { StarRating } from './StarRating'
import { GoogleRating } from './GoogleRating';

interface Props {
  name: string,
  profilePicture: string,
  score: number,
  opinion: string
}

export const ReviewCard = ({ name, opinion, profilePicture, score }: Props) => {
  return (
    <div className='flex justify-center items-center bg-primaryBlue-500 w-fit p-6 rounded-lg shadow-md'>

      {/* container */}
      <div className='flex flex-col w-full max-w-xs'>
        {/* Profile image */}
        <div className='flex justify-start items-center gap-2 sm:gap-4'>
          <div className='relative h-12 w-12 rounded-full border-2 border-white'>
            <Image
              src={profilePicture}
              alt=''
              fill
              className='object-cover rounded-full'
            />
          </div>

          {/* Name and score */}
          <div className='flex flex-col'>
            <p className='text-white '>
              {name}
            </p>

            <GoogleRating
              score={score}
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className='text-sm text-white mt-4 w-full max-w-xs'>
            {opinion}
          </p>
        </div>

      </div>
    </div>
  )
}
