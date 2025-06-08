/* Doc:
1. Reads the localStorage looking for the value under serviceKey.
2. Stores that value in the internal state (service).
3. Listens for changes via:
  - Storage events (when the localStorage changes from another tab or window).
  - A custom event (customserviceUpdateEvent) that you fire manually in the code when you change the localStorage from the same tab.
4. When it detects a change, it rereads the localStorage and updates its state (service) if it changed.
5. If it is the first time it detects a new value, it calls shooting a new "refresh event" that will be executed
   in the <RefreshListener>, this is a higher order component which re-renders the server component associated
   to the current route in Next.js App Router*/

"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { refreshRequestEventKey } from "@/providers"
import {
  customServiceUpdatedEvent,
  serviceKey,
  ServicesDataType
} from "@/features/services"

const safelyParseService = (value: string | null): ServicesDataType | null => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    console.warn("Invalid JSON in localStorage under key: ", serviceKey)
    return null
  }
}

export const useGetServiceOnChangeStorage = (): ServicesDataType | null => {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const [service, setService] = useState<ServicesDataType | null>(null)

  // Relee el valor de localStorage y actualiza si cambió
  const updateServiceFromStorage = () => {
    const raw = localStorage.getItem(serviceKey)
    const parsed = safelyParseService(raw)

    setService(prev => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(parsed)
      return isEqual ? prev : parsed
    })
  }

  useEffect(() => {
    // differ the initial read to avoid rendering issues
    const timeout = setTimeout(() => {
      updateServiceFromStorage()
    }, 0)

    // this will be calling when an event in the local storage happened
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === serviceKey) updateServiceFromStorage()
    }

    // this will be calling when a custom event 'customServiceUpdateEvent' happened
    // Important: this event will shotting in ServiceContext
    const handleCustomEvent = () => {
      updateServiceFromStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener(customServiceUpdatedEvent, handleCustomEvent)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener(customServiceUpdatedEvent, handleCustomEvent)
    }
  }, [router])

  useEffect(() => {
    // hasRefreshed or ref, it's a flag to avoid refreshing if you do not yet have a value or if you have already refreshed for that value
    if (service && !hasRefreshed.current) {
      hasRefreshed.current = true
      window.dispatchEvent(new Event(refreshRequestEventKey))
    }
  }, [service])

  return service
}
