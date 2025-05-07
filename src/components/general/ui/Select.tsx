'use client'

import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { IoChevronDownCircleOutline } from 'react-icons/io5'

interface Options {
  id: string | number,
  value: any
}

interface Props {
  options: Options[],
  label: string
}

export const Select = ({ options, label }: Props) => {
  const [selected, setSelected] = useState<Options>(options[0])

  return (
    <div className="flex w-full max-w-48 flex-col mb-2">
      <label className="text-sm ml-4 text-[#00123D]">{label}</label>

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-10 text-left text-[#00123D] shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <span className="block truncate">{selected?.value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <IoChevronDownCircleOutline className="h-4 w-4 text-[#00123D]" aria-hidden="true" />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 w-full rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/10 focus:outline-none text-sm">
            {options?.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={({ focus }) =>
                  `cursor-pointer select-none py-2 text-center text-[#00123D] ${focus ? 'bg-gray-100' : ''
                  }`
                }
              >
                {option.value}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}