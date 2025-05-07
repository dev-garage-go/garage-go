'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { IoChevronDownCircleOutline } from 'react-icons/io5'

import { ErrorMessage } from './ErrorMessage';
import { SelectOptions } from '@/interfaces';
import { firstLetterUppercase } from '@/utils';

interface Props {
  options: SelectOptions[]
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export const Select = ({ options, label, onChange, value, error }: Props) => {
  return (
    <div className="flex w-full max-w-48 flex-col mb-2">
      <label className="text-sm ml-4 text-primaryBlue-900">{label}</label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-10 text-left text-primaryBlue-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <span className="block truncate">
              {value ? firstLetterUppercase(value) : 'Tipo de domicilio'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <IoChevronDownCircleOutline className="h-4 w-4 text-primaryBlue-900" aria-hidden="true" />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 w-full rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/10 focus:outline-none text-sm">
            {options?.map((option) => (
              <ListboxOption
                key={option.id}
                value={option.value}

                className={({ focus }) =>
                  `cursor-pointer select-none py-2 text-center text-primaryBlue-900 ${focus && 'bg-gray-100'}`
                }
              >
                {firstLetterUppercase(option.value)}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {error && (<ErrorMessage message={error} />)}
    </div>
  )
}