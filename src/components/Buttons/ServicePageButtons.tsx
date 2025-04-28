'use client'

export const ServicePageButtons = () => {
  const baseClassBtn = 'flex justify-center items-center text-center py-2 px-10 bg-white rounded-md border hover:text-white duration-300'
  return (
    <div className='flex justify-center items-center gap-6 w-full'>
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
