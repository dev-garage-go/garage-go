"use client"

import { useVehicleContext } from "@/features/vehicle"


export const ChangeVehicleButton = () => {
  const { deleteVehicle } = useVehicleContext()

  return (
    <button
      type="button"
      onClick={() => deleteVehicle()}
      className="text-xs mt-4 lg:mt-0 text-primaryBlue-500 hover:font-medium duration-200 transition-all"
    >
      Ingresar otra patente
    </button>
  )
}
