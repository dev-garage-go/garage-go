'use client'

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form'

import { TiresContractingForm } from './TiresContractingForm';
import { TiresContractingSummary } from './TiresContractingSummary';

import { TiresChangeService, useServiceContext } from '@/features/services';

export const TiresContractingWrapper = () => {
  // TODO: const hasPromotion = getPromotionByService()
  const methods = useForm<TiresChangeService>({
    shouldFocusError: true,
    defaultValues: {
      type: 'tires',
      name: 'tires-change',
      quantityTires: 1,
      typeTires: 'ciudad',
      tireSize: undefined,
    }
  })

  const router = useRouter()
  const { setServiceInStorage } = useServiceContext()

  // Function that will be executed when the form is submitted
  const onSubmit = (data: TiresChangeService) => {
    setServiceInStorage(data)
    router.push(`/services/tires_change/checkout`)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <TiresContractingForm />
            <TiresContractingSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
