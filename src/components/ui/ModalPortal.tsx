'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ModalColorsType } from "@/types"
import clsx from "clsx"

interface Props {
  isOpen: boolean
  bgColor?: ModalColorsType
  children: ReactNode // elemento que aparecera al activarse ModalPortal
}

export const ModalPortal = ({ children, bgColor = 'bg-black/20', isOpen }: Props) => {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)


  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const timeout = setTimeout(() => setIsVisible(true), 20)
      return () => clearTimeout(timeout)
    } else {
      setShouldRender(false)
      const timeout = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!mounted || !shouldRender) return null

  return createPortal(
    //  Blur overlay
    <div className={`fixed inset-0 z-[9998] backdrop-blur-sm transition-colors duration-300 ${bgColor}`}>
      <div className={clsx(
        "absolute z-[9999] inset-0 transition-all duration-300 ease-out",
        {
          "opacity-0 scale-10": !isVisible,
          "opacity-100 scale-100": isVisible,
        }
      )}>
        {children}
      </div>
    </div>
    ,
    document.getElementById('modal-root')! // div que se encuentra fuera del flujo normal DOM
  )
}
