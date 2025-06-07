'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TiresContractingForm } from './TiresContractingForm';

import { TiresChangeServiceInterface, useServiceContext } from '@/features/services';
import { PaymentSummary } from '@/features/payment';

export const TiresContractingWrapper = () => {
  // TODO: const hasPromotion = getPromotionByService()
  const methods = useForm<TiresChangeServiceInterface>({
    shouldFocusError: true,
    defaultValues: {
      type: 'tires',
      name: 'tires-change',
      quantityTires: 1,
      typeTires: 'ciudad',
      tireSize: undefined,
    }
  })

  const { setServiceInStorage } = useServiceContext()

  // Function that will be executed when the form is submitted
  const onSubmit = (data: TiresChangeServiceInterface) => {
    setServiceInStorage(data)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <TiresContractingForm />
            <PaymentSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
