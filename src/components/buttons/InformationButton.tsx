'use client'

import { useRef, useState } from "react"
import { IoAlertCircleOutline } from "react-icons/io5"
import { InformationModal, ModalPortalOnHover } from "@/components"

interface Props {
  text: string
  hasModal?: boolean
  modalInfo?: {
    title?: string
    description?: string
    imageSrc?: string
    imageAlt?: string
  }
}

export const InformationButton = ({ text, hasModal = false, modalInfo }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block w-fit text-left"
    >
      <div className="flex items-center gap-1 cursor-pointer">
        <IoAlertCircleOutline
          size={14}
          className="text-primaryBlue-500"
        />
        <p className="text-xs text-primaryBlue-500">
          {text}
        </p>
      </div>

      {hasModal && hovered && (
        <ModalPortalOnHover anchorRef={ref}>
          <InformationModal {...modalInfo} />
        </ModalPortalOnHover>
      )}
    </div>
  )
}
