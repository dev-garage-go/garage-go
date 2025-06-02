'use client'

import clsx from "clsx"

interface Props<T> {
  value: T,
  valueSelected: T[] | T,
  setValueSelected: (value: T) => void
  multiSelect?: boolean
}

export const SwitchButton = <T,>({ value, valueSelected, setValueSelected, multiSelect = false }: Props<T>) => {
  const isActive = multiSelect
    ? (valueSelected as T[]).includes(value)
    : value === valueSelected

  return (
    <button
      type="button"
      onClick={() => setValueSelected(value)}
      className={clsx(
        'relative w-12 h-6 rounded-full transition-colors duration-300',
        isActive ? 'bg-primaryBlue-900' : 'bg-customGray-400'
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300',
          isActive ? 'translate-x-6' : ''
        )}
      />
    </button>
  )
}
