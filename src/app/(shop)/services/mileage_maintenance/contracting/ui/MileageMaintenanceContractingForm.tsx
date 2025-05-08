"use client"

import { ButtonOptions } from '@/components'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

type VehicleMileages = (
  '10.000 kms' |
  '20.000 kms' |
  '30.000 kms' |
  '40.000 kms' |
  '50.000 kms' |
  '60.000 kms' |
  '70.000 kms' |
  '80.000 kms' |
  '90.000 kms' |
  'Otro'
)
interface VehicleMileagesOptions {
  quantity: VehicleMileages
}

const mileagesOptions: VehicleMileagesOptions[] = [
  { quantity: "10.000 kms" },
  { quantity: "20.000 kms" },
  { quantity: "30.000 kms" },
  { quantity: "40.000 kms" },
  { quantity: "50.000 kms" },
  { quantity: "60.000 kms" },
  { quantity: "70.000 kms" },
  { quantity: "80.000 kms" },
  { quantity: "90.000 kms" },
  { quantity: "Otro" }
]

export const MileageMaintenanceContractingForm = () => {
  const [mileagesSelected, setMileagesSelected] = useState<VehicleMileages>("10.000 kms")

  return (
    <div className="form-container">
      <section className="flex flex-col gap-4">
        <h4 className="font-medium text-primaryBlue-900">Mantención por kilometraje</h4>

        {/* Mileage options */}
        <div className="input-form-container mt-4">
          <div className="flex w-full flex-col mb-2">
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

              {/* Buttons */}
              {mileagesOptions.map((item, index) => (
                <ButtonOptions
                  key={item.quantity + index}
                  current={item.quantity}
                  selected={mileagesSelected}
                  onClick={() => setMileagesSelected(item.quantity)}
                  item={item.quantity}
                />
              ))}

              <h4 className="font-medium text-primaryBlue-900">¿Quieres agregar algo más?</h4>
              

            </div>
          </div>
        </div>


      </section>
    </div>
  )
}
