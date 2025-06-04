"use client"

import { sleep } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoRefresh } from "react-icons/io5"

export const RefreshButton = () => {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleRefresh = async () => {
    setIsAnimating(true)
    await sleep(500) // permite que la animación suceda
    router.refresh()
    setIsAnimating(false) // por si acaso el botón se queda visible
  }

  return (
    <button
      className="flex justify-center items-center gap-2 rounded-md py-2 px-4 shadow-md bg-neutral-500 hover:bg-neutral-600 transition-colors duration-300"
      onClick={handleRefresh}
      disabled={isAnimating}
    >
      <IoRefresh className={`text-white transition-all duration-300 ${isAnimating ? "animate-spin" : "rotate-0"}`} />
      <p className="text-sm text-white">{isAnimating ? "Actualizando..." : "Refrescar"}</p>
    </button>
  )
}
