"use client"

import { createContext, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import {
  customServiceUpdatedEvent,
  serviceKey,
  ServicesDataType,
  ServicesTypes,
} from "@/features/services"

interface ServiceContextType {
  serviceType: ServicesTypes | null
  setServiceType: React.Dispatch<SetStateAction<ServicesTypes | null>>
  setServiceInStorage: (data: ServicesDataType) => void
  serviceInStorage: ServicesDataType | null
  deleteServiceFromStorage: () => null | void
}

interface Props {
  children: React.ReactNode
}

// Create context
const ServiceContext = createContext<ServiceContextType | null>(null)

// Custom hook to use context
export const useServiceContext = () => {
  const context = useContext(ServiceContext)
  if (!context) { throw new Error('useServiceContext must be inside of a context') }
  return context
}

// Provider
export const ServiceContextProvider = ({ children }: Props) => {
  const isClient = typeof window !== 'undefined'  // avoids server errors

  const [serviceType, setServiceType] = useState<ServicesTypes | null>(null)
  const [serviceInStorage, setServiceInStorageState] = useState<ServicesDataType | null>(null)

  const pathname = usePathname()
  const router = useRouter()

  const setServiceInStorage = useCallback((data: ServicesDataType) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
    window.dispatchEvent(new Event(customServiceUpdatedEvent))

    router.push(`/services/${data.name}/booking`)
  }, [isClient, router])


  const deleteServiceFromStorage = useCallback((): null | void => {
    if (!isClient) return null
    localStorage.removeItem(serviceKey)
    window.dispatchEvent(new Event(customServiceUpdatedEvent))
  }, [isClient])


  // * Important: 
  // update the service in storage when detects a customService event,
  // when this custom event happened, the component <RefresListener> refresh the route
  useEffect(() => {
    if (!isClient) return;

    const updateServiceFromStorage = () => {
      const raw = localStorage.getItem(serviceKey)
      if (!raw) return setServiceInStorageState(null)

      try {
        const parsed = JSON.parse(raw)
        setServiceInStorageState(parsed)
      } catch (err) {
        console.error("Error parsing service from storage:", err)
        setServiceInStorageState(null)
      }
    }

    updateServiceFromStorage()

    const handler = () => updateServiceFromStorage()

    window.addEventListener("storage", handler)
    window.addEventListener(customServiceUpdatedEvent, handler)

    return () => {
      window.removeEventListener(customServiceUpdatedEvent, handler)
    }
  }, [isClient])


  // ! guards
  const routeVerified = useRef(false) // prevent an infinite loop

  useEffect(() => {
    if (!isClient) return;
    // if exist service in storage and the page is different from /booking, delete it
    const contractingRoutePath = pathname.endsWith("/contracting")
    const bookingRoutePath = pathname.endsWith("/booking")

    if (serviceInStorage && !(bookingRoutePath || contractingRoutePath)) {
      deleteServiceFromStorage()
      router.refresh()
    }

    routeVerified.current = true
  }, [pathname, serviceInStorage, isClient, router, deleteServiceFromStorage])

  return <ServiceContext.Provider
    value={{
      serviceType,
      setServiceType,
      serviceInStorage,
      setServiceInStorage,
      deleteServiceFromStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}