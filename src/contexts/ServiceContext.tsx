"use client"

import { createContext, useContext } from "react"
import { serviceKey } from "@/keys"
import { MileageMaintenanceData, TiresChangeData } from "@/interfaces"


interface ServiceContextType {
  setServicesInStorage: (data: any) => void
  getServiceFromStorage: () => ServicesFormsData | null
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

  const setServicesInStorage = (data: ServicesFormsData[]) => {
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  const getServiceFromStorage = (): ServicesFormsData | null => {
    const data = localStorage.getItem(serviceKey)
    return data ? JSON.parse(data) : null
  }

  return <ServiceContext.Provider
    value={{
      setServicesInStorage,
      getServiceFromStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}