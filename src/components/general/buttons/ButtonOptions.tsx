'use client'

import clsx from "clsx"

interface Props {
  item: any
  current: string
  selected: string
  className?: string
  onClick: () => void
}

export const ButtonOptions = ({ item, onClick, selected, className, current }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          selected === current ? 'button-option-selected' : 'button-option',
          className
        )}
      >
        <p className="text-center">{item}</p>
      </button>
    </>
  )
}
