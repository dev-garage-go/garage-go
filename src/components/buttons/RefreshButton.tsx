"use client"

import { useRouter } from "next/navigation"
import { IoRefresh } from "react-icons/io5"

export const RefreshButton = () => {
  const router = useRouter()

  return (
    <button
      className="flex justify-center items-center gap-2 rounded-md py-2 px-4 shadow-md bg-neutral-500 hover:bg-neutral-600 transition-colors duration-300"
      onClick={() => router.refresh()}
    >
      <IoRefresh className="text-white" />
      <p className="text-sm text-white">Refrescar</p>
    </button>
  )
}
