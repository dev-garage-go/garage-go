"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { customVehicleUpdateEvent } from "@/features/vehicle"
import { customServiceUpdatedEvent } from "@/features/services"

export const refreshRequestEventKey = "request-router-refresh"

export const RefreshListener = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRefresh = () => {
      router.refresh()
    }

    window.addEventListener(customVehicleUpdateEvent, handleRefresh)
    window.addEventListener(customServiceUpdatedEvent, handleRefresh)

    return () => {
      window.removeEventListener(customVehicleUpdateEvent, handleRefresh)
      window.removeEventListener(customServiceUpdatedEvent, handleRefresh)
    }
  }, [router])

  return null
}
