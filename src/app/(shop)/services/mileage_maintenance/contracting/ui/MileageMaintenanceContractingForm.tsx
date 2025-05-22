"use client"

import { useFormContext } from 'react-hook-form'
import { AddServiceCard, ButtonOptions } from '@/components'
import { MileagesOptions } from '@/constants'
import { ExtraServicesCards, MileageMaintenanceService, VehicleMileages } from '@/interfaces'


const extraServices: ExtraServicesCards[] = [
  {
    name: "Gestion de revision tecnica",
    price: 48990,
  },
  {
    name: "Diagnostico automotriz",
    price: 45990,
  },
  {
    name: "Servicio de frenos",
    price: 24990,
    details: {
      mainOptions: [
        { detailName: 'ambos ejes', detailPrice: 20 },
        { detailName: 'solo delantero', detailPrice: 20 },
        { detailName: 'solo trasero', detailPrice: 20 }
      ],
      switchOptions: [
        { detailName: 'Revisión y limpieza', detailPrice: 20, selected: false },
        { detailName: 'Cambio de pastillas', detailPrice: 20, selected: false },
        { detailName: 'Cambio de discos (Cotizar)', detailPrice: 20, selected: false },
        { detailName: 'Rectificación de discos', detailPrice: 20, selected: false }
      ]
    }
  },
]

export const MileageMaintenanceContractingForm = () => {
  const { setValue, watch } = useFormContext<MileageMaintenanceService>()

  const mileages = watch("mileages")

  const handleMileages = (quantity: VehicleMileages) => {
    setValue("mileages", quantity)
  }


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
                  className='h-12'
                  key={item.quantity + index}
                  current={item.quantity}
                  selected={mileages}
                  onClick={() => handleMileages(item.quantity)}
                  item={item.quantity}
                />
              ))}
            </div>

            {/* Add services */}
            <div className='input-form-container mt-4'>
              <div className="flex w-full flex-col mb-2 gap-4">
                <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">¿Quieres agregar algo más?</h4>

                <div className='flex flex-col gap-6 justify-start items-start'>
                  {extraServices.map((item, index) => (
                    <AddServiceCard
                      key={item.name + index}
                      {...item}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
