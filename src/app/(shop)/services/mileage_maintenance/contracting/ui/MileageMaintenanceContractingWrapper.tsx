'use client'

import { useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { MileageMaintenanceContractingForm } from "./MileageMaintenanceContractingForm"
import { MileageMaintenanceContractingSummary } from "./MileageMaintenanceContractingSummary"
import { HoverPortal, LicensePlateModal } from "@/components"
import { MileageMaintenanceFormInputs } from "@/interfaces"
import { licensePlateKey } from "@/keys"
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
  const router = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [licensePlate, setLicensePlate] = useState<string | null>()

  useEffect(() => {
    const readSessionStorage = () => {
      const plate = sessionStorage.getItem(licensePlateKey)
      setLicensePlate(plate)
    }

    readSessionStorage() // lee el storage
    if (!licensePlate) {
      setModalIsOpen(true)
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === licensePlateKey) {
        readSessionStorage()
        router.refresh()
      }
    }

    // escucha cuando el storage recibe cambios
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange) // remueve el listener para evitar perdida de memoria
    }
  }, [router])

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
