"use client"

import { createContext, SetStateAction, useContext, useEffect, useRef, useState } from "react"
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
  setServicesInStorage: (data: ServicesDataType[]) => void
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

  const setServicesInStorage = (data: ServicesDataType[]) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const setServiceInStorage = (data: ServicesDataType) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
    redirectToBooking()
  }

  const getServiceFromStorage = (): ServicesDataType | null => {
    if (!isClient) return null
    const data = localStorage.getItem(serviceKey)
    return data ? JSON.parse(data) : null
  }

  const deleteServiceFromStorage = (): null | void => {
    if (!isClient) return null
    localStorage.removeItem(serviceKey)
  }

  // guards
  // prevent an infinite loop in the useEffect
  const routeVerified = useRef(false)

  useEffect(() => {
    // if exist service in storage and the page is different from /booking, delete it
    routeVerified.current = true
    const bookingRoutePath = pathname.endsWith("/booking")

    if (!hasService && bookingRoutePath) {
      router.back()
    }
  }, [pathname, getServiceFromStorage, deleteServiceFromStorage, router, hasService])

  return <ServiceContext.Provider
    value={{
      serviceType,
      setServiceType,
      setServicesInStorage,
      setServiceInStorage,
      getServiceFromStorage,
      deleteServiceFromStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}