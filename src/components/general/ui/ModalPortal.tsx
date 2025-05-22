'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode // elemento que aparecera al activarse ModalPortal
  anchorRef?: React.RefObject<HTMLElement> // referencia al elemento trigger - el que dispara el hover
}

export const ModalPortal = ({ children, anchorRef }: Props) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // calcula la posición del anchorRef
    const updatePosition = () => {
      if (anchorRef?.current) {
        const rect = anchorRef.current.getBoundingClientRect() // obtiene la posición del elemento en la pantalla
        setPosition({
          top: rect.bottom + window.scrollY + 8, // ajusta a top del botón + scroll + 8px
          left: rect.left + window.scrollX, // ajusta a la posicion left del botón + scroll
        })
      }
    }

    // se ejecuta la funcion cada vez que se monta el elemento
    updatePosition()

    // listeners que actualizan la posición si el usuario hace scroll y el tamaño de la pantalla cambia
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)
    setMounted(true)

    return () => {
      // limpieza de los event listeners para evitar memory leaks
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
    document.getElementById('modal-root')! // div que se encuentra fuera del flujo normal DOM
  )
}
