'use client'

import { UseFormRegisterReturn } from "react-hook-form"

interface Props {
  option: string,
  checked: boolean,
  register: UseFormRegisterReturn
  className?: string
}

export const RadioButton = ({ register, checked, option, className }: Props) => {
  return (
    <>
      <div className={`${className} w-5 h-5 rounded-full border-4 
        ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
      />

      <input
        id={option}
        type="radio"
        className="sr-only"
        value={option}
        {...register}
      />
    </>
  )
}
