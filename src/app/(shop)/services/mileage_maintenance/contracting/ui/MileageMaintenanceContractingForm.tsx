"use client"

import React, { useState } from 'react'
import { ButtonOptions } from '@/components'
import { MileagesOptions } from '@/constants'
import { VehicleMileages } from '@/interfaces'

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
              {MileagesOptions.map((item, index) => (
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
