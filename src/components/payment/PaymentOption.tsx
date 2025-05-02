'use client'

import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

type PaymentOptionProps = {
  method: string;
  name: string;
  description: string;
  imageSrc: string;
  checked: boolean;
  register: UseFormRegisterReturn;
  onClick: () => void;
};

export const PaymentOption = ({ method, name, description, imageSrc, checked, register, onClick }: PaymentOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-4 cursor-pointer bg-white w-full border border-gray-300 shadow-md px-4 py-2 rounded-2xl 
        hover:scale-105 duration-300 transition-all ${checked ? "border-primaryBlue-400 bg-blue-50" : "border-gray-300 "}`
      }>

      <div className="relative flex h-16 w-24 md:h-20 md:w-28 items-center">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="w-auto h-auto object-contain"
        />
      </div>

      <div className="flex w-full justify-between items-center">
        {/* Text */}
        <div className="flex flex-col items-start justify-start gap-1">
          <h4 className="text-sm md:text-base text-start font-semibold text-blue-900">{name}</h4>
          <p className="text-xs md:text-sm text-start text-customGray-500">{description}</p>
        </div>

        {/* Custom input radio */}
        <div>
          <div className={`hidden md:w-5 md:h-5 rounded-full border-4 
            ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
          />

          <input
            id={method}
            type="radio"
            value={method}
            {...register}
            className="sr-only"
          />
        </div>
      </div>
    </button>
  );
}
