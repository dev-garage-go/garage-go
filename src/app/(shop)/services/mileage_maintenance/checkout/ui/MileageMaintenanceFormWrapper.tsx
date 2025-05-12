"use client"

import { FormProvider, useForm } from "react-hook-form";
import { MileageMaintenanceForm } from "./MileageMaintenanceForm";
import { MileageMaintenanceSummary } from "./MileageMaintenanceSummary";
import { MileageMaintenanceFormInputs } from "@/interfaces";
import { useRouter } from "next/navigation";

export const MileageMaintenanceFormWrapper = () => {
  const methods = useForm<MileageMaintenanceFormInputs>({
    defaultValues: {
      booking: {
        serviceName: "mantencion por kilometraje"
      }
    }
  })

  // TODO: Router temporal para mostrar
  const router = useRouter()

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: MileageMaintenanceFormInputs) => {
    console.log(data)
    router.push("/payment")
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <MileageMaintenanceForm />
            <MileageMaintenanceSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
