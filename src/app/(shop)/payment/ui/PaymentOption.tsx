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

export default function PaymentOption({ method, name, description, imageSrc, checked, register, onClick }: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-4 cursor-pointer bg-white w-full border border-gray-300 shadow-lg px-4 rounded-2xl 
        hover:scale-105 duration-300 transition-all ${checked ? "border-primaryBlue-400 bg-blue-50" : "border-gray-300 "}`
      }>

      <div className="relative flex h-20 w-28 items-center">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="w-auto h-auto object-contain"
        />
      </div>

      <div className="flex w-full justify-between items-center">
        {/* Text */}
        <div className="flex flex-col items-start justify-center">
          <h4 className="text-base font-semibold text-blue-900">{name}</h4>
          <p className="text-sm text-customGray-500">{description}</p>
        </div>

        {/* Input radio */}
        <div>
          <label
            htmlFor={name}
            className=""
          >

            {/* Custom input radio */}
            <div
              className={`w-5 h-5 rounded-full border-4 ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
            />

            <input
              id={method}
              type="radio"
              value={method}
              {...register}
              className="sr-only"
            />
          </label>
        </div>
      </div>
    </button>
  );
}
