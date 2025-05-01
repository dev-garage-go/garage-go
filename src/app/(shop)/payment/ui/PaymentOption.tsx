// components/PaymentOption.tsx
import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

type PaymentOptionProps = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  checked: boolean;
  register: UseFormRegisterReturn;
};

export default function PaymentOption({
  id,
  name,
  description,
  imageSrc,
  checked,
  register,
}: PaymentOptionProps) {
  return (
    <label
      htmlFor={name}
      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition
        ${checked ? "border-blue-700 shadow-md bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
    >
      <div className="flex h-24 w-40 items-center gap-4">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="w-auto h-auto object-contain"
        />
        <div>
          <h4 className="text-base font-semibold text-blue-900">{name}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {/* Custom input radio */}
      <div
        className={`w-5 h-5 rounded-full border-2 ${checked ? "bg-blue-900 border-blue-900" : "border-blue-900"}`}
      />

      <input
        id={id}
        type="radio"
        value={id}
        {...register}
        className="sr-only"
      />
    </label>
  );
}
