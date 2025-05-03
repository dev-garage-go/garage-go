'use client'

import { InformationModal } from "@/components"
import { IoAlertCircleOutline } from "react-icons/io5"

interface Props {
  text: string,
  hasModal?: boolean
  modalInfo?: {
    title?: string,
    description?: string,
    imageSrc?: string,
    imageAlt?: string
  }
}

export const InformationButton = ({ text, hasModal = false, modalInfo }: Props) => {
  return (
    <div className="relative group inline-block text-left">
      <div className="flex items-center gap-1 cursor-pointer">
        <IoAlertCircleOutline
          size={14}
          className="text-primaryBlue-500"
        />
        <p className="text-xs text-primaryBlue-500">
          {text}
        </p>
      </div>

      {hasModal && (
        <div className="modal-animated">
          <InformationModal {...modalInfo} />
        </div>
      )}
    </div>
  )
}
