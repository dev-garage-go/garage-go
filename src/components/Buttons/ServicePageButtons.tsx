'use client'

export const ServicePageButtons = () => {
  const baseClassBtn = 'flex justify-center text-sm sm:text-base items-center text-center py-2 px-6 sm:px-8 md:px-10 bg-white rounded-md border hover:text-white duration-300'

  return (
    <div className='flex sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full mt-6'>
      <button
        type='button'
        className={`border-green-500 text-green-500 hover:bg-green-600 ${baseClassBtn}`}>
        Tienes dudas
      </button>
      <button
        type='button'
        className={`border-primaryBlue-500 text-primaryBlue-500 hover:bg-primaryBlue-600 ${baseClassBtn}`}>
        Agenda ahora
      </button>
    </div>
  )
}
