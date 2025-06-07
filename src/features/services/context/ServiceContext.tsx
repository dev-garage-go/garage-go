"use client"

import { createContext, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import {
  customServiceUpdatedEvent,
  serviceKey,
  ServicesDataType,
  ServicesTypes,
  useGetServiceOnChangeStorage,
} from "@/features/services"

interface ServiceContextType {
  serviceType: ServicesTypes | null
  setServiceType: React.Dispatch<SetStateAction<ServicesTypes | null>>
  setServiceInStorage: (data: ServicesDataType) => void
  getServiceFromStorage: () => ServicesDataType | null
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

  const pathname = usePathname()
  const router = useRouter()
  const hasService = useGetServiceOnChangeStorage()

  const [serviceType, setServiceType] = useState<ServicesTypes | null>(null)

  const setServiceInStorage = useCallback((data: ServicesDataType) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
    window.dispatchEvent(new Event(customServiceUpdatedEvent))

    // router.push(`/services/${data.type}/booking`)
    console.log(data.name)
    router.push(`/services/mileage_maintenance/booking`)
  }, [isClient, router])

  const getServiceFromStorage = useCallback((): ServicesDataType | null => {
    if (!isClient) return null
    const data = localStorage.getItem(serviceKey)
    window.dispatchEvent(new Event(customServiceUpdatedEvent))
    return data ? JSON.parse(data) : null
  }, [isClient])

  const deleteServiceFromStorage = useCallback((): null | void => {
    if (!isClient) return null
    localStorage.removeItem(serviceKey)
    window.dispatchEvent(new Event(customServiceUpdatedEvent))
  }, [isClient])

  // guards
  // prevent an infinite loop in the useEffect
  const routeVerified = useRef(false)

  useEffect(() => {
    if (!isClient) return;
    // if exist service in storage and the page is different from /booking, delete it
    const contractingRoutePath = pathname.endsWith("/contracting")
    const bookingRoutePath = pathname.endsWith("/booking")

    if (hasService && !(bookingRoutePath || contractingRoutePath)) {
      deleteServiceFromStorage()
      router.refresh()
    }

    routeVerified.current = true
  }, [pathname, hasService, isClient, router])

  return <ServiceContext.Provider
    value={{
      serviceType,
      setServiceType,
      setServiceInStorage,
      getServiceFromStorage,
      deleteServiceFromStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}