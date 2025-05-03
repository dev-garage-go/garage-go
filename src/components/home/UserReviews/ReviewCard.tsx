import Image from 'next/image'
import { GoogleRating } from './GoogleRating';
interface Props {
  name: string,
  profilePicture: string,
  score: number,
  opinion: string
}

export const ReviewCard = ({ name, opinion, profilePicture, score }: Props) => {
  return (
    <div className='flex justify-center items-start bg-primaryBlue-500 w-full max-w-md h-60 px-6
     py-10 rounded-lg shadow-xl shadow-slate-400'>

      {/* Container items*/}
      <div className='flex flex-col w-full max-w-sm'>
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
        {/* truncate overflow-hidden text-ellipsis whitespace-nowrap */}
        <div className="overflow-hidden">
          <p className="text-sm text-white mt-4 line-clamp-5">
            {opinion}
          </p>
        </div>

      </div>
    </div>
  )
}
