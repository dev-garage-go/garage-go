'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import { IoChevronDownCircleOutline } from 'react-icons/io5'

interface Props {

}

export const FAQsDisclosure = () => {
  return (
    <Disclosure as="div" className="px-20" defaultOpen={true}>
      {({ open }) => (
        <>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="text-sm font-medium group-hover:text-white/80">
              What is your refund policy?
            </p>
            <IoChevronDownCircleOutline
              className={`w-5 h-5 transform duration-200 ${open ? 'rotate-180 text-pink-600' : 'rotate-0 text-pink-500'
                }`}
            />
          </DisclosureButton>
          <DisclosurePanel className="text-sm font-light mt-2">
            If you're unhappy with your purchase, we'll refund you in full.
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
