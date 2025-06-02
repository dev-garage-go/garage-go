'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { ModalColorsType } from "@/types"

interface Props {
  bgColor?: ModalColorsType
  children: ReactNode // elemento que aparecera al activarse ModalPortal
}

export const ModalPortal = ({ children, bgColor = 'bg-black/20' }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-[9998] backdrop-blur-sm ${bgColor}`}
      />
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          zIndex: 9999,
        }}
      >
        {children}
      </motion.div>,
    </>,
    document.getElementById('modal-root')! // div que se encuentra fuera del flujo normal DOM
  )
}
