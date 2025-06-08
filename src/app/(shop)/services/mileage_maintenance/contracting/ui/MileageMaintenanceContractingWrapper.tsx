'use client'

import { useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { ModalPortal } from "@/components"
import { MileageMaintenanceContractingForm } from "./MileageMaintenanceContractingForm"

import { LazyVehicleDataModal, useVehicleContext } from "@/features/vehicle"
import { MileageMaintenanceServiceInterface, useServiceContext } from "@/features/services"
import { PaymentSummary } from "@/features/payment"


export const MileageMaintenanceContractingWrapper = () => {
  // TODO: const hasPromotion = getPromotionByService()

  const methods = useForm<MileageMaintenanceServiceInterface>({
    shouldFocusError: true,
    defaultValues: {
      type: "mileage",
      name: "mileage_maintenance",
      mileages: "10.000 kms",
    }
  })

  const ref = useRef<HTMLDivElement>(null)
  const { vehicleInStorage, showModal } = useVehicleContext()
  const { setServiceInStorage, setServiceType } = useServiceContext()

  // set the service type to could charging in PaymentContext
  useEffect(() => {
    setServiceType("mileage")
  }, [setServiceType])

  // onSubit saved the service in storage
  const onSubmit = (data: MileageMaintenanceServiceInterface) => {
    setServiceInStorage(data)
  }

  return (
    <section ref={ref} className={"mt-10 max-w-page padding-central-page pb-from-footer w-full"}>
      {!vehicleInStorage &&
        <ModalPortal isOpen={showModal}>
          <LazyVehicleDataModal /> {/* the component is only imported if the conditions are met */}
        </ModalPortal>
      }
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <MileageMaintenanceContractingForm />
            <PaymentSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
