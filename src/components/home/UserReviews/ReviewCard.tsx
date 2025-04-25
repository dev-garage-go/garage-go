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
    <div className='flex justify-center items-center bg-primaryBlue-500 w-fit p-6 rounded-lg shadow-xl shadow-slate-400'>

      {/* Container items*/}
      <div className='flex flex-col w-full max-w-xs'>
        {/* Profile image */}
        <div className='flex justify-start items-center gap-4'>
          <div className='flex justify-center items-center relative h-12 w-12 ring-2 ring-white ring-offset-2 ring-offset-blue-600 rounded-full'>
            <Image
              fill
              src={profilePicture}
              alt='user profile pictures'
              className='object-cover rounded-full w-auto h-auto'
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
          <p className='text-sm text-white mt-4 '>
            {opinion}
          </p>
        </div>

      </div>
    </div>
  )
}
