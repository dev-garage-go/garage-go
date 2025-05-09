"use client"

import React, { useRef, useState } from 'react'
import { AddServiceCard, ButtonOptions, HoverPortal, LicensePlateModal } from '@/components'
import { MileagesOptions } from '@/constants'
import { VehicleMileages } from '@/interfaces'

const extraServices = [
  { name: "Gestion de revision tecnica", price: 48990 },
  { name: "Diagnostico automotriz", price: 45990 },
  { name: "Servicio de frenos", price: 24990 },
]

export const MileageMaintenanceContractingForm = () => {
  const ref = useRef<HTMLDivElement>(null)

  const [hasModal, setHasModal] = useState<boolean>(true)
  const [mileagesSelected, setMileagesSelected] = useState<VehicleMileages>("10.000 kms")

  return (
    <div ref={ref}>
      {hasModal ? (
        <HoverPortal anchorRef={ref}>
          <LicensePlateModal />
        </HoverPortal>
      ) : (
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
                </div>

                <div className='input-form-container mt-4'>
                  <div className="flex w-full flex-col mb-2 gap-4">
                    <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">¿Quieres agregar algo más?</h4>

                    <div className='flex flex-col gap-6 justify-start items-start'>
                      {extraServices.map((item, index) => (
                        <AddServiceCard
                          key={item.name + index}
                          name={item.name}
                          price={item.price}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
