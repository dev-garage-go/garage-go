/* Doc:
1. Reads the localStorage looking for the value under vehicleKey.
2. Stores that value in the internal state (vehicle).
3. Listens for changes via:
  - Storage events (when the localStorage changes from another tab or window).
  - A custom event (customVehicleUpdateEvent) that you fire manually in the code when you change the localStorage from the same tab.
4. When it detects a change, it rereads the localStorage and updates its state (vehicle) if it changed.
5. If it is the first time it detects a new value, it calls shooting a new "refresh event" that will be executed
   in the <RefreshListener>, this is a higher order component which re-renders the server component associated
   to the current route in Next.js App Router
*/

"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { refreshRequestEventKey } from "@/providers"
import {
  customVehicleUpdateEvent,
  vehicleKey,
  VehicleWithStringIDInterface
} from "@/features/vehicle"

const safelyParseVehicle = (value: string | null): VehicleWithStringIDInterface | null => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    console.warn("Invalid JSON in localStorage under key: ", vehicleKey)
    return null
  }
}

export const useGetVehicleOnChangeStorage = (): VehicleWithStringIDInterface | null => {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const [vehicle, setVehicle] = useState<VehicleWithStringIDInterface | null>(null)

  // obtain the 'vehicle' from local storage, if exist returns it, otherwise return null
  // Relee el valor de localStorage y actualiza si cambió
  const updateVehicleFromStorage = () => {
    const raw = localStorage.getItem(vehicleKey)
    const parsed = safelyParseVehicle(raw)

    setVehicle(prev => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(parsed)
      return isEqual ? prev : parsed
    })
  }

  useEffect(() => {
    // differ the initial read to avoid rendering issues
    const timeout = setTimeout(() => {
      updateVehicleFromStorage()
    }, 0)

    // this will be calling when an event in the local storage happened
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === vehicleKey) updateVehicleFromStorage()
    }

    // this will be calling when a custom event 'customVehicleUpdateEvent' happened
    // Important: this event will shotting in VehicleDataModal -> setVehicle(value: string)
    // Important: the function that will shoting this event it's in -> context/VehicleContext.tsx
    const handleCustomEvent = () => {
      updateVehicleFromStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener(customVehicleUpdateEvent, handleCustomEvent)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener(customVehicleUpdateEvent, handleCustomEvent)
    }
  }, [router])

  useEffect(() => {
    // hasRefreshed or ref, it's a flag to avoid refreshing if you do not yet have a value or if you have already refreshed for that value
    if (vehicle && !hasRefreshed.current) {
      hasRefreshed.current = true
      window.dispatchEvent(new Event(refreshRequestEventKey))
    }
  }, [vehicle])

  return vehicle
}
