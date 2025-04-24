'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import { IoChevronDown } from 'react-icons/io5'

interface Props {
  question: string,
  answer: string,
}

export const FAQsDisclosure = ({ answer, question }: Props) => {
  return (
    <Disclosure as="div" className=" py-2" defaultOpen={false}>
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
          <DisclosurePanel className="text-sm md:text-base xl:text-lg text-gray-700 font-light">
            {answer}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
