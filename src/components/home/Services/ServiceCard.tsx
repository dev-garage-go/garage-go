"use client"

import { FeatureIconsMap } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string
  price?: number
  image: string
  discount?: string
  features?: string[]
  func: () => void
  buttons?: ButtonProps[]
  path: string
}

export const ServiceCard = ({
  title,
  price,
  image,
  discount,
  features = [],
  func,
  buttons,
  path
}: Props) => {


  return (
    <Link
      className="h-full flex flex-col"
      href={path}
    >
      <div className="bg-primaryBlue-500 text-white py-3 px-4 rounded-t-2xl font-medium mb-1">
        {title}
      </div>

      {/* Main image */}
      <div className="bg-white rounded-2xl shadow-md flex-1 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative w-full h-48">
          <Image
            fill
            src={image}
            alt={title}
            className="object-cover w-auto h-auto"
          />
          {/* Discount symbol */}
          {discount && (
            <span className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {discount}
            </span>
          )}
        </div>

        {/* Features images */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex gap-4 mb-auto">
            {features.map((feature, index) => (
              <Image
                height={24}
                width={50}
                key={index}
                src={FeatureIconsMap[feature]}
                alt={feature}
                className="object-contain"
              />
            ))}
          </div>

          <div className="flex justify-between gap-4 sm:justify-end sm:gap-2 mt-4">
            {buttons ? (
              <>
                <button className="text-sm xl:text-base w-full flex justify-center items-center sm:w-auto bg-primaryBlue-900 text-white px-6 py-2 rounded-lg font-medium">
                  {buttons[0].text}
                </button>
                <button className="border border-primaryBlue-500 text-primaryBlue-500 px-6 py-2 rounded-lg hover:bg-blue-50 font-medium flex items-center gap-1">
                  {buttons[1].text}
                  {buttons[1].icon && <span className="text-lg">{buttons[1].icon}</span>}
                </button>
              </>
            ) : (
              <>
                {price && (
                  <div className="text-sm xl:text-base w-full flex justify-center items-center sm:w-auto bg-primaryBlue-900 text-white text-center px-4 py-2 rounded-lg font-medium">
                    Desde $ {price.toLocaleString('es-CL')}
                  </div>
                )}
                <button
                  onClick={func}
                  className="text-sm xl:text-base border border-primaryBlue-500 text-primaryBlue-500 px-6 py-2 rounded-lg hover:bg-blue-50 font-medium flex items-center gap-1"
                >
                  Agendar <span className="text-lg">→</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
