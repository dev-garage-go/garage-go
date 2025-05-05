'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  anchorRef: React.RefObject<HTMLElement>

}

export const HoverPortal = ({ children, anchorRef }: Props) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const updatePosition = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect()
        setPosition({
          top: rect.bottom + window.scrollY + 8, // +8px espacio entre botón y modal
          left: rect.left + window.scrollX,
        })
      }
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)
    setMounted(true)

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [anchorRef])

  if (!mounted) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
    >
      {children}
    </motion.div>,
    document.getElementById('modal-root')!
  )
}
