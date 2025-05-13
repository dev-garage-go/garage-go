"use client"

import { useLicensePlateOnChangeStorage } from "@/hooks"
import { licensePlateKey } from "@/keys"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const OtherLicensePlateButton = () => {
  const router = useRouter()
  const licensePlate = useLicensePlateOnChangeStorage()

  useEffect(() => {
    router.refresh()
  }, [licensePlate])

  const handleLicensePlate = () => {
    sessionStorage.removeItem(licensePlateKey)
  }

  return (
    <button
      type="button"
      onClick={() => handleLicensePlate()}
      className="text-xs mt-4 lg:mt-0 text-primaryBlue-500 hover:font-medium duration-200 transition-all"
    >
      Ingresar otra patente
    </button>
  )
}
