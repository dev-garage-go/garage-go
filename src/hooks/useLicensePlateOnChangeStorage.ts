"use client"

import { licensePlateKey } from "@/keys"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const useLicensePlateOnChangeStorage = () => {
  const router = useRouter()
  const [licensePlate, setLicensePlate] = useState<string | null>(null)

  useEffect(() => {
    const readSessionStorage = () => {
      const plate = sessionStorage.getItem(licensePlateKey)
      setLicensePlate(prev => {
        if (prev !== plate) {
          router.refresh()
        }
        return plate
      })
    }

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
    window.addEventListener("licensePlateUpdated", handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("licensePlateUpdated", handleCustomEvent)
    }
  }, [router])

  return licensePlate
}
