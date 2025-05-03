'use client'

import Image from 'next/image'
import { UseFormRegisterReturn } from 'react-hook-form'
import { RadioButton, InformationButton } from '@/components'
import clsx from 'clsx'

interface Props {
  className?: string
  imageSrc: string
  imageAlt: string
  promotionChecked: boolean
  register: UseFormRegisterReturn
  handleSelect: () => void
  handleInformationButton?: () => void
}

export const PromotionCard = ({
  className,
  imageSrc,
  imageAlt,
  handleSelect,
  promotionChecked,
  register,
  handleInformationButton = () => { } // by default is an empty func
}: Props) => {
  return (
    <div
      onClick={handleSelect}
      className={clsx(`${className} flex justify-start items-center cursor-pointer gap-4 w-full bg-customGray-100
         hover:scale-105 transition-all duration-300 rounded-xl py-2 px-4`, {
        "bg-primaryBlue-50": promotionChecked
      })}
    >
      <div>
        <RadioButton
          checked={promotionChecked}
          option="promotion-4x3"
          register={register}
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start justify-center">
          <p>Promocion 4x3</p>
          <InformationButton
            text="Bases y condiciones de la promocion"
            onClick={handleInformationButton}
          />
        </div>

        <div className="relative h-14 w-14">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain w-auto h-auto"
          />
        </div>
      </div>
    </div>
  )
}
