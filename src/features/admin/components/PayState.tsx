import { OrderStatusMap, PayStatusType } from '@/features/orders'
import clsx from 'clsx'
import React from 'react'

interface Props {
  state: PayStatusType
}

export const PayState = ({ state }: Props) => {
  return (
    <div className={clsx("p-2 rounded-xl", {
      "bg-secundaryGreen-600": state === 'approved',
      "bg-red-700": state === 'rejected' || state === 'cancelled',
      "bg-amber-500": state === 'in_process' || state === 'pending',
      "bg-gray-600": state === 'refunded' || state === 'charged_back',
    })}>
      <p className='text-white font-medium'>{OrderStatusMap[state]}</p>
    </div>
  )
}
