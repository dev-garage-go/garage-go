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

export default function PaymentOption({ method, name, description, imageSrc, checked, register }: PaymentOptionProps) {
  return (
    <label className={`flex cursor-pointer bg-white w-full border border-gray-300 shadow-lg py-1 px-4 rounded-2xl gap-4
      ${checked ? "border-primaryBlue-500 shadow-md bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`
    }>

      <div className="relative flex h-20 w-32 items-center gap-4">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="w-auto h-auto object-contain"
        />
      </div>

      <div className="flex w-full justify-between items-center">
        {/* Text */}
        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-blue-900">{name}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        {/* Input radio */}
        <div>
          <label
            htmlFor={name}
            className=""
          >

            {/* Custom input radio */}
            <div
              className={`w-5 h-5 rounded-full border-2 ${checked ? "bg-primaryBlue-500 border-primaryBlue-500" : "border-primaryBlue-900"}`}
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
    </label>
  );
}
