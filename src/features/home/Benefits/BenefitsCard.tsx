import Image from 'next/image'
interface Props {
  name: string,
  btnString: string,
  image: string
}

export const BenefitsCard = ({ btnString, image, name }: Props) => {
  return (
    // Frame
    <div className='relative flex flex-col h-full w-full max-w-sm bg-white shadow-xl' key={name}>
      {/* Name of benefit */}
      <div className='flex justify-center items-center p-3 md:p-4 w-full bg-primaryBlue-500'>
        <p className='text-sm md:text-base text-white font-medium text-center'>
          {name}
        </p>
      </div>

      <div className='p-4'>
        {/* Main image */}
        <div className='relative h-52 md:h-64 xl:h-80 w-full rounded-3xl'>
          <Image
            fill
            sizes='384px'
            src={image}
            alt={name}
            className='object-contain rounded-3xl w-auto h-auto'
          />
        </div>

        <div className='w-full flex justify-center items-center my-4'>
          <button className='text-sm md:text-base text-center font-medium text-primaryBlue-600 w-full max-w-sm p-2 rounded hover:font-semibold transition-all duration-300'>
            {btnString}
          </button>
        </div>

      </div>
    </div>
  )
}

