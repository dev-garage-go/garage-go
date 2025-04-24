import Image from 'next/image'
import React from 'react'

interface Props {
  name: string,
  profilePicture: string,
  score: number,
  opinion: string
}

export const ReviewCard = ({ name, opinion, profilePicture, score }: Props) => {
  return (
    <div className='bg-primaryBlue-500 p-10 rounded-lg shadow-md'>

      {/* container */}
      <div className='flex flex-col'>
        {/* Profile image */}
        <div className='flex'>
          <div className='relative h-20 w-20 rounded-full'>
            <Image
              src={profilePicture}
              alt=''
              fill
              className='object-contain'
            />
          </div>

          {/* Name and score */}
          <div className='flex flex-col'>
            <p>
              {name}
            </p>
            <p>
              {score}
            </p>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className='text-xs'>
            {opinion}
          </p>
        </div>

      </div>
    </div>
  )
}
