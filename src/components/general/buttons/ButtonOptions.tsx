'use client'

import clsx from "clsx"

interface Props {
  item: any
  current: string
  selected: string
  className?: string
  withBgColor?: boolean
  onClick: () => void
}

export const ButtonOptions = ({ item, onClick, selected, className, current, withBgColor = true }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          selected === current ? 'button-option-selected'
            : !withBgColor ? 'button-option-bg-transparent'
              : 'button-option',
          className
        )}
      >
        <p className="text-center">{item}</p>
      </button>
    </>
  )
}
