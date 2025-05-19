"use client"

import { createContext, useContext } from "react"
import { serviceKey } from "@/keys"
import { MileageMaintenanceData, TiresChangeData } from "@/interfaces"
import { Services } from "@/database/interfaces/services"


interface ServiceContextType {
  setServicesInStorage: (data: any) => void
  setServiceInStorage: (data: any) => void
  getServiceFromStorage: () => Services | null
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

// this type accepts all services forms data
type ServicesFormsData = MileageMaintenanceData | TiresChangeData

// Provider
export const ServiceContextProvider = ({ children }: Props) => {

  const setServicesInStorage = (data: Services[]) => {
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const setServiceInStorage = (data: Services) => {
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const getServiceFromStorage = (): Services | null => {
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