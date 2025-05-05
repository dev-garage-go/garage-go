'use client'

import Image from 'next/image'
import { UseFormRegisterReturn } from 'react-hook-form'
import { RadioButton, InformationButton } from '@/components'
import clsx from 'clsx'

interface Props {
  title: string
  className?: string
  imageSrc: string
  imageAlt: string
  promotionChecked: boolean
  register: UseFormRegisterReturn
  handleSelect: () => void
  informationButtonData: {
    text: string
    hasModal?: boolean,
    modal?: {
      title?: string,
      description?: string,
      imageSrc?: string,
      imageAlt?: string
    }
  }
}

export const PromotionCard = ({
  title,
  className,
  imageSrc,
  imageAlt,
  handleSelect,
  promotionChecked,
  register,
  informationButtonData
}: Props) => {

  const modal = informationButtonData.modal

  return (
    <div
      onClick={handleSelect}
      className={clsx(`${className} flex justify-start items-center cursor-pointer gap-4 w-full bg-customGray-100
         hover:scale-105 transition-all duration-300 rounded-xl py-4 md:py-2 px-4`, {
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
        <div className="flex flex-col items-start gap-1 justify-center">
          <p className='text-sm md:text-base font-medium'>
            {title}
          </p>
          <InformationButton
            text={informationButtonData.text}
            hasModal={informationButtonData.hasModal}
            modalInfo={{
              title: modal?.title,
              description: modal?.description,
              imageSrc: modal?.imageSrc,
              imageAlt: modal?.imageAlt
            }}
          />
        </div>

        <div className="hidden md:block relative h-14 w-14">
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
