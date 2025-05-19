"use client"

import { VehicleModalForm } from "@/interfaces"
import { customVehicleUpdateEvent, vehicleKey } from "@/keys"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export const useLicensePlateOnChangeStorage = () => {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const [vehicle, setVehicle] = useState<VehicleModalForm | null>(null)

  // obtain the 'licensePlat' from session storage
  const readLocalStorage = () => {
    const vehicleStorage = localStorage.getItem(vehicleKey) ?? ''
    const vehicleParsed = JSON.parse(vehicleStorage)
    setVehicle(prev => {
      if (prev !== vehicle) {
        return vehicleParsed
      } else { return prev }
    })
  }

  useEffect(() => {
    readLocalStorage()

    // this will be calling when an event in the session storage happened
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === vehicleKey) {
        readLocalStorage()
      }
    }

    // this will be calling when a custom event 'customVehicleUpdateEvent' happened
    // Important: this event will shotting in LicensePlateModal -> setVehicle(value: string)
    // Important: the function that will shoting this event it's in -> context/LicensePlateContext.tsx
    const handleCustomEvent = () => {
      readLocalStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener(customVehicleUpdateEvent, handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener(customVehicleUpdateEvent, handleCustomEvent)
    }
  }, [router])

  useEffect(() => {
    // hasRefreshed or ref, it's a flag to avoid refreshing if you do not yet have a value or if you have already refreshed for that value
    if (vehicle && !hasRefreshed.current) {
      hasRefreshed.current = true
      router.refresh()
    }
  }, [vehicle, router])

  return vehicle
}
