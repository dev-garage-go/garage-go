"use client"

import { useLicensePlateContext } from "@/context"


export const OtherLicensePlateButton = () => {
  const { deleteLicensePlate } = useLicensePlateContext()

  return (
    <button
      type="button"
      onClick={() => deleteLicensePlate()}
      className="text-xs mt-4 lg:mt-0 text-primaryBlue-500 hover:font-medium duration-200 transition-all"
    >
      Ingresar otra patente
    </button>
  )
}
