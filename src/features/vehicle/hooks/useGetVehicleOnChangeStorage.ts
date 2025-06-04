/* Doc:
1. Reads the localStorage looking for the value under vehicleKey.
2. Stores that value in the internal state (vehicle).
3. Listens for changes via:
  - Storage events (when the localStorage changes from another tab or window).
  - A custom event (customVehicleUpdateEvent) that you fire manually in the code when you change the localStorage from the same tab.
4. When it detects a change, it rereads the localStorage and updates its state (vehicle) if it changed.
5. If it is the first time it detects a new value, it calls router.refresh(), which re-renders the server component associated to the current route in Next.js App Router.
*/

"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import {
  customVehicleUpdateEvent,
  vehicleKey,
  VehicleInStorageInterface
} from "@/features/vehicle"


export const useGetVehicleOnChangeStorage = (): VehicleInStorageInterface | null => {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const [vehicle, setVehicle] = useState<string | null>(null)

  // obtain the 'vehicle' from local storage, if exist returns it, otherwise return null
  const readLocalStorage = () => {
    const vehicle = localStorage.getItem(vehicleKey)
    setVehicle(prev => {
      if (prev !== vehicle) {
        return vehicle
      } else { return prev }
    })
  }

  useEffect(() => {
    readLocalStorage()

    // this will be calling when an event in the local storage happened
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === vehicleKey) {
        readLocalStorage()
      }
    }

    // this will be calling when a custom event 'customVehicleUpdateEvent' happened
    // Important: this event will shotting in VehicleDataModal -> setVehicle(value: string)
    // Important: the function that will shoting this event it's in -> context/VehicleContext.tsx
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

  if (vehicle) return JSON.parse(vehicle)
  else return null
}
