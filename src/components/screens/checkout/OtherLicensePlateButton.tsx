"use client"

import { licensePlateKey } from "@/keys"

export const OtherLicensePlateButton = () => {

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
