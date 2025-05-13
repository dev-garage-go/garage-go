'use client'

import { UseFormRegisterReturn } from "react-hook-form"
import { RadioButton } from "@/components"
import { QuantityTires } from '@/interfaces';

interface Props {
  quantity: QuantityTires
  register: UseFormRegisterReturn
  checked: boolean
  onClick: () => void
}

export const TiresQuantitySelector = ({ quantity, register, checked, onClick }: Props) => {
  return (
    <button
      type="button"
      className="flex flex-col gap-4 justify-center items-center"
      onClick={onClick}
    >
      <RadioButton
        option={quantity.toString()}
        checked={checked}
        register={register}
      />
      <p className="title-h4">{quantity}</p>
    </button>
  )
}
