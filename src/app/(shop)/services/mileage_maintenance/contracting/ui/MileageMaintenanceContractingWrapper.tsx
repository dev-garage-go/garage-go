'use client'

import { MileageMaintenanceFormInputs } from "@/interfaces"
import { FormProvider, useForm } from "react-hook-form"
import { MileageMaintenanceContractingSummary } from "./MileageMaintenanceContractingSummary"
import { MileageMaintenanceContractingForm } from "./MileageMaintenanceContractingForm"

export const MileageMaintenanceContractingWrapper = () => {
  const methods = useForm<MileageMaintenanceFormInputs>({
    defaultValues: {
      booking: {
        serviceName: "mantencion por kilometraje"
      }
    }
  })

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: MileageMaintenanceFormInputs) => {
    console.log(data)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
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
