"use client"

import { createContext, useContext } from "react"
import { serviceKey, ServicesDataType } from "@/features/services"


interface ServiceContextType {
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

  const setServicesInStorage = (data: ServicesDataType[]) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const setServiceInStorage = (data: ServicesDataType) => {
    if (!isClient) return
    localStorage.setItem(serviceKey, JSON.stringify(data))
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

  return <ServiceContext.Provider
    value={{
      setServicesInStorage,
      setServiceInStorage,
      getServiceFromStorage,
      deleteServiceFromStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}