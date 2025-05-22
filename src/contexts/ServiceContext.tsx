"use client"

import { createContext, useContext } from "react"
import { serviceKey } from "@/keys"
import { ServicesData } from "@/interfaces"


interface ServiceContextType {
  setServicesInStorage: (data: ServicesData[]) => void
  setServiceInStorage: (data: ServicesData) => void
  getServiceFromStorage: () => ServicesData | null
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