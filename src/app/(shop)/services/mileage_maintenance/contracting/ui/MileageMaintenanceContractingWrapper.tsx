'use client'

import { useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { MileageMaintenanceContractingForm } from "./MileageMaintenanceContractingForm"
import { MileageMaintenanceContractingSummary } from "./MileageMaintenanceContractingSummary"
import { HoverPortal, LicensePlateModal } from "@/components"
import { MileageMaintenanceFormInputs } from "@/interfaces"
import { useLicensePlateOnChangeStorage } from "@/hooks"
import { useRouter } from "next/navigation"

export const MileageMaintenanceContractingWrapper = () => {
  const methods = useForm<MileageMaintenanceFormInputs>({
    defaultValues: {
      booking: {
        serviceName: "mantencion por kilometraje"
      }
    }
  })

  const ref = useRef<HTMLDivElement>(null)

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const licensePlate = useLicensePlateOnChangeStorage()

  useEffect(() => {
    if (!licensePlate) {
      setModalIsOpen(true)
    }
  }, [licensePlate])

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: MileageMaintenanceFormInputs) => {
    console.log(data)
  }

  return (
    <section ref={ref} className={"mt-10 max-w-page padding-central-page pb-from-footer w-full"}>
      {!licensePlate && modalIsOpen &&
        <HoverPortal>
          <LicensePlateModal isOpen={modalIsOpen} setClose={setModalIsOpen} />
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
