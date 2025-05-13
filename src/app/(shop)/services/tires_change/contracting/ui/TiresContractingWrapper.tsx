'use client'

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form'

import { TiresCheckoutForm } from './TiresContractingForm';
import { TiresCheckoutSummary } from './TiresContractingSummary';

import { QuantityTires, TypesTiresOptions } from '@/interfaces';

type FormInputs = {
  promotion: boolean;
  quantityTires: QuantityTires;
  typeTires: TypesTiresOptions;
}

export const TiresContractingWrapper = () => {
  const methods = useForm<FormInputs>({
    shouldFocusError: true,
    defaultValues: {
      promotion: false,
      quantityTires: 0,
      typeTires: 'ciudad'
    }
  })

  const router = useRouter()

  // Function that will be executed when the form is submitted
  const onSubmit = (data: FormInputs) => {
    console.log(data)
    router.push(`/services/tires_change/checkout`)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <TiresCheckoutForm />
            <TiresCheckoutSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
