'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import clsx from "clsx"
import { ModalColorsType } from "@/types"

interface Props {
  isOpen: boolean
  bgColor?: ModalColorsType
  children: ReactNode // elemento que aparecera al activarse ModalPortal
}

export const ModalPortal = ({ children, bgColor = 'bg-black/20', isOpen }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className={clsx(
      `fixed inset-0 z-[9998] backdrop-blur-sm transition-opacity duration-300 ease-in-out ${bgColor}`,
      {
        "opacity-100 pointer-events-auto": isOpen,
        "opacity-0 pointer-events-none": !isOpen,
      }
    )}>
      <div className={clsx(
        "absolute inset-0 z-[9999] flex items-center justify-center transition-transform duration-300 ease-in-out",
        {
          "scale-100 opacity-100": isOpen,
          "scale-50 opacity-0": !isOpen,
        }
      )}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
