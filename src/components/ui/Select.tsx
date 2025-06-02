'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { IoChevronDown } from 'react-icons/io5'

import { ErrorMessage } from './ErrorMessage';
import { firstLetterUppercase } from '@/utils';
import { SelectOptions } from '@/types';

interface Props {
  options: SelectOptions[]
  label: string
  value?: string
  onChange: (value: string) => void
  error?: string
}

export const Select = ({ options, label, onChange, value, error }: Props) => {
  return (
    <div className="flex w-full flex-col mb-2">
      <label className="text-sm ml-4 text-primaryBlue-900">{label}</label>

      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton className={error ? 'input-form-error' : 'input-form'}>
              <span className={`block truncate text-start ${value ? 'font-medium' : 'font-normal'}`}>
                {value ? firstLetterUppercase(value) : 'Tipo de domicilio'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <IoChevronDown
                  size={14}
                  className={`font-medium text-primaryBlue-900 transition-all duration-200 ${open && 'rotate-180'}`}
                />
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
        )}
      </Listbox>
      {error && (<ErrorMessage message={error} className='mt-1 ml-2' />)}
    </div>
  )
}