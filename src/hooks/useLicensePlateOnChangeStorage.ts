"use client"

import { customLicensePlateUpdateEvent, licensePlateKey } from "@/keys"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export const useLicensePlateOnChangeStorage = () => {
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
