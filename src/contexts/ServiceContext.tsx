"use client"

import { createContext, useContext } from "react"
import { serviceKey } from "@/keys"
import { MileageMaintenanceService, TiresChangeData, ServicesData } from "@/interfaces"


interface ServiceContextType {
  setServicesInStorage: (data: any) => void
  setServiceInStorage: (data: any) => void
  getServiceFromStorage: () => ServicesData | null
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

  const setServicesInStorage = (data: ServicesData[]) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const setServiceInStorage = (data: ServicesData) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const getServiceFromStorage = (): ServicesData | null => {
    if (!isClient) return null
    const data = localStorage.getItem(serviceKey)
    return data ? JSON.parse(data) : null
  }

  return <ServiceContext.Provider
    value={{
      setServicesInStorage,
      setServiceInStorage,
      getServiceFromStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}