"use client"

import { createContext, useContext } from "react"
import { serviceKey } from "@/keys"
import { MileageMaintenanceData, TiresChangeData } from "@/interfaces"


interface ServiceContextType {
  setServiceInStorage: (data: any) => void
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
  const setServiceInStorage = (data: ServicesFormsData) => {
    localStorage.setItem(serviceKey, JSON.stringify(data))
  }

  return <ServiceContext.Provider
    value={{
      setServiceInStorage
    }}
  >
    {children}
  </ServiceContext.Provider>
}