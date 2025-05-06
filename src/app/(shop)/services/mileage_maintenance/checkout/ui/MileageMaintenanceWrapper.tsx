"use client"

import { FormProvider, useForm } from "react-hook-form";
import { MileageMaintenanceForm } from "./MileageMaintenanceForm";
import { MileageMaintenanceSummary } from "./MileageMaintenanceSummary";

type FormInputs = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  carBrand: string;
  carModel: string;
  carKm: string;
  carYear: number;
}

export const MileageMaintenanceWrapper = () => {
  const methods = useForm<FormInputs>()

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: FormInputs) => {
    console.log(data)
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
