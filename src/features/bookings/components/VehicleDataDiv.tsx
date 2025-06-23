'use client'

import { useServiceContext } from "@/features/services"
import { ChangeVehicleButton, useVehicleContext } from "@/features/vehicle"

export const VehicleDataDiv = () => {
  const { vehicleInStorage } = useVehicleContext()
  const { serviceInStorage } = useServiceContext()

  const handleServiceUI = () => {
    if (serviceInStorage) {
      switch (serviceInStorage.type) {
        case 'mileage':
          return serviceInStorage.mileages
        case 'tires':
          return 'Cotizar'
      }
    }
    return '-'
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-end w-full bg-customGray-50 rounded-2xl p-4 ">
        <div className="flex flex-col">
          <p className="font-medium text-primaryBlue-900 uppercase text-sm">
            {vehicleInStorage ? vehicleInStorage.licensePlate : '-'}
          </p>
          <div className="flex justify-between w-full text-primaryBlue-500">
            <p className="text-customGray-500 uppercase font-normal text-sm">
              {vehicleInStorage ? vehicleInStorage.model : '-'}
            </p>
          </div>

        </div>
        <div className="hidden lg:block">
          <p className="font-medium text-primaryBlue-500">
            {handleServiceUI()}
          </p>
        </div>
        <div>
          <ChangeVehicleButton />
        </div>
      </div>
    </div>
  )
}
