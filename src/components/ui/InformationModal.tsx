'use client'

import Image from "next/image"

interface Props {
  title?: string
  description?: string,
  imageSrc?: string,
  imageAlt?: string
}

export const InformationModal = ({ imageAlt, imageSrc, description, title }: Props) => {
  return (
    <div className={`w-80 sm:w-[450px] xl:w-[600px] bg-white border border-gray-200 rounded-xl 
    shadow-lg text-sm text-gray-800 ${imageSrc ? 'p-2 xl:p-4' : 'p-4 xl:p-8'}`}>
      {title && description && (
        <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-xs font-medium text-primaryBlue-900">{title}</p>
          <p className="text-xs text-start text-wrap">{description}</p>
        </div>
      )}

      {imageSrc && (
        <div className="flex justify-center items-center w-full h-full">
          <div className="relative w-80 sm:w-[450px] xl:w-[600px] h-40 sm:h-48">
            <Image
              fill
              src={imageSrc}
              alt={imageAlt ?? "information image"}
              className="object-cover w-auto h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
