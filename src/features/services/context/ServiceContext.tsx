"use client"

import { createContext, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import {
  serviceKey,
  ServicesDataType,
  ServicesTypes,
  useGetServiceOnChangeStorage,
  useRedirectToBooking
} from "@/features/services"

interface ServiceContextType {
  serviceType: ServicesTypes | undefined
  setServiceType: React.Dispatch<SetStateAction<ServicesTypes | undefined>>
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
  const redirectToBooking = useRedirectToBooking()

  const pathname = usePathname()
  const router = useRouter()
  const hasService = useGetServiceOnChangeStorage()

  const [serviceType, setServiceType] = useState<ServicesTypes>()

  const setServiceInStorage = useCallback((data: ServicesDataType) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
    redirectToBooking()
  }, [isClient, redirectToBooking])

  const getServiceFromStorage = useCallback((): ServicesDataType | null => {
    if (!isClient) return null
    const data = localStorage.getItem(serviceKey)
    return data ? JSON.parse(data) : null
  }, [isClient])

  const deleteServiceFromStorage = useCallback((): null | void => {
    if (!isClient) return null
    localStorage.removeItem(serviceKey)
  }, [isClient])

  // guards
  // prevent an infinite loop in the useEffect
  const routeVerified = useRef(false)

  useEffect(() => {
    routeVerified.current = true
    const bookingRoutePath = pathname.endsWith("/booking")

    // if exist service in storage and the page is different from /booking, delete it
    if (hasService && !bookingRoutePath) {
      deleteServiceFromStorage()
    }
  }, [pathname, getServiceFromStorage, deleteServiceFromStorage, router, hasService])

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