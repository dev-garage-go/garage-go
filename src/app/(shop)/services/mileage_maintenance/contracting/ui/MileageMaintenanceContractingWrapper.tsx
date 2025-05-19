'use client'

import { useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { MileageMaintenanceContractingForm } from "./MileageMaintenanceContractingForm"
import { MileageMaintenanceContractingSummary } from "./MileageMaintenanceContractingSummary"
import { HoverPortal, LicensePlateModal } from "@/components"

import { MileageContractingForm } from "@/interfaces"
import { useVehicleContext } from "@/contexts"


export const MileageMaintenanceContractingWrapper = () => {
  const methods = useForm<MileageContractingForm>({
    shouldFocusError: true,
    defaultValues: {
      mileages: "10.000 kms",
      extraServices: undefined
    }
  })


  // TODO: Router temporal para mostrar
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { licensePlate, setModalIsOpen, modalIsOpen } = useVehicleContext()

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: MileageContractingForm) => {
    console.log(data)
    router.push(`/services/mileage_maintenance/checkout`)
  }

  return (
    <section ref={ref} className={"mt-10 max-w-page padding-central-page pb-from-footer w-full"}>
      {!licensePlate && modalIsOpen &&
        <HoverPortal>
          <LicensePlateModal setClose={setModalIsOpen} />
        </HoverPortal>
      }
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <MileageMaintenanceContractingForm />
            <MileageMaintenanceContractingSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
