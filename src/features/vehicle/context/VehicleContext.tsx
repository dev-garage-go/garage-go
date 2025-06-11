'use client'

import { createContext, useContext, useEffect, useState } from "react"
import {
  customVehicleUpdateEvent,
  vehicleKey,
  VehicleWithStringIDInterface
} from "@/features/vehicle"
import { VehicleDB } from "@/backend/database/types"

interface VehicleContextType {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  vehicleInStorage: VehicleWithStringIDInterface | null
  setVehicleInStorage: (data: VehicleDB) => void
  deleteVehicle: () => void
  creatingVehicleAnimation: boolean
  searchingVehicleAnimation: boolean
  setCreatingVehicleAnimation: React.Dispatch<React.SetStateAction<boolean>>
  setSearchingVehicleAnimation: React.Dispatch<React.SetStateAction<boolean>>
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
  const [vehicleInStorage, setVehicleInStorageState] = useState<VehicleWithStringIDInterface | null>(null)

  // animations
  const [creatingVehicleAnimation, setCreatingVehicleAnimation] = useState<boolean>(false)
  const [searchingVehicleAnimation, setSearchingVehicleAnimation] = useState<boolean>(false)

  // methods to impact localStorage
  const setVehicleInStorage = (data: VehicleDB): void => {
    if (!isClient) return

    // converts object id in a simple string
    const { _id, ...rest } = data
    const validId = _id ? _id.toString() : ''

    const validObjectStorage: VehicleWithStringIDInterface = {
      _id: validId,
      ...rest
    }

    localStorage.setItem(vehicleKey, JSON.stringify(validObjectStorage))
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }

  // deletes license plate from the session storage, so that others can be entered
  const deleteVehicle = () => {
    if (!isClient) return
    sessionStorage.removeItem(vehicleKey)
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }

  // * Important: 
  // updates the vehicle in storage when detects a customVehicle event,
  // when this custom event happened, the component <RefresListener> refresh the route
  useEffect(() => {
    if (!isClient) return;

    const updateVehicleFromStorage = () => {
      const raw = localStorage.getItem(vehicleKey)
      if (!raw) return setVehicleInStorageState(null)

      try {
        const parsed = JSON.parse(raw)
        setVehicleInStorageState(parsed)
      } catch (err) {
        console.error("Error parsing vehicle from storage:", err)
        setVehicleInStorageState(null)
      }
    }

    updateVehicleFromStorage()

    const handler = () => updateVehicleFromStorage()

    window.addEventListener("storage", handler)
    window.addEventListener(customVehicleUpdateEvent, handler)

    return () => {
      window.removeEventListener(customVehicleUpdateEvent, handler)
    }
  }, [isClient])


  // ! guards
  // if the session storage doesn't have a license plate
  // or if the local storage doesn't have vehicle data, open modal
  useEffect(() => {
    if (vehicleInStorage) {
      setShowModal(false)
    } else {
      setShowModal(true)
    }
  }, [vehicleInStorage])


  return <VehicleContext.Provider
    value={{
      showModal,
      setShowModal,
      vehicleInStorage,
      setVehicleInStorage,
      deleteVehicle,
      creatingVehicleAnimation,
      searchingVehicleAnimation,
      setCreatingVehicleAnimation,
      setSearchingVehicleAnimation
    }}
  >
    {children}
  </VehicleContext.Provider>
}