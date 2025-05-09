"use client"

import { customLicensePlateUpdateEvent, licensePlateKey } from "@/keys"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export const useLicensePlateOnChangeStorage = () => {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const [licensePlate, setLicensePlate] = useState<string | null>(null)

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

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === licensePlateKey) {
        readSessionStorage()
      }
    }

    const handleCustomEvent = () => {
      readSessionStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener(customLicensePlateUpdateEvent, handleCustomEvent) // event in LicensePlateModal -> setLicensePlate(value: string)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener(customLicensePlateUpdateEvent, handleCustomEvent)
    }
  }, [router])

  useEffect(() => {
    // Evitá refrescar si todavía no tenés un valor o si ya refrescaste por ese valor
    if (licensePlate && !hasRefreshed.current) {
      hasRefreshed.current = true
      router.refresh()
    }
  }, [licensePlate, router])

  return licensePlate
}
