'use client'

import { createContext, SetStateAction, useContext, useEffect, useState } from "react"
import {
  customVehicleUpdateEvent,
  vehicleKey,
  useGetVehicleOnChangeStorage,
  VehicleDataInterface
} from "@/features/vehicle"
import { VehicleDB } from "@/backend/database/types"

interface VehicleContextType {
  showModal: boolean
  setShowModal: React.Dispatch<SetStateAction<boolean>>
  vehicle: VehicleDataInterface | null
  setVehicleInStorage: (data: VehicleDataInterface) => void
  getVehicleFromStorage: () => VehicleDB | null
  deleteVehicle: () => void
}


interface Props {
  children: React.ReactNode
}

// Create the context
const VehicleContext = createContext<VehicleContextType | null>(null)

// Custom hook to use context
export const useVehicleContext = () => {
  const context = useContext(VehicleContext)
  if (!context) { throw new Error('useVehicleContext must be inside of a context') }
  return context
}

// Provider
export const VehicleContextProvider = ({ children }: Props) => {
  const isClient = typeof window !== 'undefined' // avoids server errors

  const [showModal, setShowModal] = useState<boolean>(false)
  const vehicle = useGetVehicleOnChangeStorage()

  // ? Vehicle local storage
  // localStorage: All vehicle data
  const setVehicleInStorage = (data: VehicleDataInterface) => {
    if (!isClient) return
    localStorage.setItem(vehicleKey, JSON.stringify(data))
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }

  const getVehicleFromStorage = (): VehicleDB | null => {
    if (!isClient) return null
    const data = localStorage.getItem(vehicleKey)
    return data ? JSON.parse(data) : null
  }

  // deletes license plate from the session storage, so that others can be entered
  const deleteVehicle = () => {
    if (!isClient) return
    sessionStorage.removeItem(vehicleKey)
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }


  // if the session storage doesn't have a license plate
  // or if the local storage doesn't have vehicle data, open modal
  useEffect(() => {
    if (!vehicle) {
      setShowModal(true)
    }
  }, [vehicle])


  return <VehicleContext.Provider
    value={{
      showModal,
      setShowModal,
      vehicle,
      setVehicleInStorage,
      getVehicleFromStorage,
      deleteVehicle
    }}
  >
    {children}
  </VehicleContext.Provider>
}