'use client'

import { IoAlertCircleOutline } from "react-icons/io5"

interface Props {
  text: string,
  onClick: () => void
}

export const InformationButton = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col hover:font-medium transition-all duration-200"
    >
      <div className="flex w-full items-center justify-start gap-1">
        <IoAlertCircleOutline
          size={14}
          className="text-primaryBlue-500"
        />
        <p className="text-xs text-primaryBlue-500">{text}</p>
      </div>
    </button>
  )
}
