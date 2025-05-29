import { obtainImage } from '@/assets/helpers'
import { StarRating } from '@/features/home'
import Image from 'next/image'

interface Props {
  score: number
}

export const GoogleRating = ({ score }: Props) => {
  return (
    <div className='flex gap-2 rounded-full w-fit bg-gray-100 px-2 py-1'>
      <Image
        height={10}
        width={10}
        src={obtainImage('services', 'googleIcon')}
        alt='google icon'
        className='object-contain'
      />
      <StarRating
        rating={score}
      />
    </div>
  )
}
