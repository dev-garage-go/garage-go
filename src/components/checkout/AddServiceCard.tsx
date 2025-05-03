'use client'

import { formatNumberWithDots } from '@/utils'

interface Props {
  name: string,
  price: number
}

export const AddServiceCard = ({ name, price }: Props) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 py-4 px-6 rounded-xl">
      <div className="flex flex-col">
        <h4 className="font-semibold text-primaryBlue-500">
          {name}
        </h4>
        <p className="font-semibold text-primaryBlue-900">
          ${formatNumberWithDots(price)}
        </p>
      </div>
      <button className="text-sm text-center bg-transparent border border-primaryBlue-500 text-primaryBlue-500
          rounded-xl px-6 py-2 hover:bg-primaryBlue-500 hover:text-white duration-200 transition-all">
        Agregar
      </button>
    </div>
  )
}
