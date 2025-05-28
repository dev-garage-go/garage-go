'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import Image from 'next/image'
import { IoChevronDown } from 'react-icons/io5'

interface Props {
  question: string,
  answer?: string,
  hasAnswerItems?: boolean
  answersItems?: string[]
  imageSrc?: string
  imageAlt?: string
}

export const FAQsDisclosure = ({ answer, question, hasAnswerItems, answersItems, imageSrc, imageAlt }: Props) => {
  return (
    <Disclosure as="div" className="py-2" defaultOpen={false}>
      {({ open }) => (
        <>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="text-sm md:text-base xl:text-lg font-medium group-hover:text-primaryBlue-500 transition-colors duration-200">
              {question}
            </p>
            <IoChevronDown
              className={`w-5 h-5 transform duration-200 ${open ? 'rotate-180 text-primaryPink-500' : 'rotate-0 text-primaryPink-500'
                }`}
            />
          </DisclosureButton>
          <DisclosurePanel className="text-sm md:text-base xl:text-lg text-gray-700 font-light mt-2">
            {hasAnswerItems ? (
              <>
                {answersItems?.map((answer, index) => (
                  <p key={index + answer}>
                    - {answer} <br />
                  </p>
                ))}
              </>
            ) : (
              <>
                {answer}
              </>
            )}
            {/* Image */}
            {imageSrc && (
              <div className='relative w-full h-48 rounded-xl mt-4'>
                <Image
                  fill
                  sizes='640px'
                  src={imageSrc}
                  alt={imageAlt ?? 'information image'}
                  className='object-cover w-auto h-auto rounded-xl'
                />
              </div>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
