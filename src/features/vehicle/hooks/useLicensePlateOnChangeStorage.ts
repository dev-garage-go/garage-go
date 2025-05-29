/*
/* Doc:
1. Reads the sessionStorage looking for the value under licensePlateKey.
2. Stores that value in the internal state (licensePlate).
3. Listens for changes via:
  - Storage events (when the sessionStorage changes from another tab or window).
  - A custom event (customLicensePlateUpdateEvent) that you fire manually in the code when you change the sessionStorage from the same tab.
4. When it detects a change, it rereads the sessionStorage and updates its state (licensePlate) if it changed.
5. If it is the first time it detects a new value, it calls router.refresh(), which re-renders the server component associated to the current route in Next.js App Router.
*/


"use client"

import { customLicensePlateUpdateEvent, licensePlateKey } from "@/keys"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export const useLicensePlateOnChangeStorage = (): string | null => {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const [licensePlate, setLicensePlate] = useState<string | null>(null)

  // obtain the 'licensePlat' from session storage
  const readSessionStorage = () => {
    const plate = sessionStorage.getItem(licensePlateKey)
    setLicensePlate(prev => {
      if (prev !== plate) {
        return plate
      } else { return prev }
    })
  }

  useEffect(() => {
    readSessionStorage()

    // this will be calling when an event in the session storage happened
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === licensePlateKey) {
        readSessionStorage()
      }
    }

    // this will be calling when a custom event 'customLicensePlateUpdateEvent' happened
    // Important: this event will shotting in LicensePlateModal -> setLicensePlate(value: string)
    // Important: the function that will shoting this event it's in -> context/LicensePlateContext.tsx
    const handleCustomEvent = () => {
      readSessionStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener(customLicensePlateUpdateEvent, handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener(customLicensePlateUpdateEvent, handleCustomEvent)
    }
  }, [router])

  useEffect(() => {
    // hasRefreshed or ref, it's a flag to avoid refreshing if you do not yet have a value or if you have already refreshed for that value
    if (licensePlate && !hasRefreshed.current) {
      hasRefreshed.current = true
      router.refresh()
    }
  }, [licensePlate, router])

  return licensePlate
}
