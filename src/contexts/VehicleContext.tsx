'use client'

import { useGetVehicleOnChangeStorage, useLicensePlateOnChangeStorage } from "@/hooks"
import { VehicleData } from "@/interfaces"
import { customLicensePlateUpdateEvent, customVehicleUpdateEvent, licensePlateKey, vehicleKey } from "@/keys"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface VehicleContextType {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>
  licensePlate: string | null
  setLicensePlateInStorage: (value: string) => void
  deleteLicensePlate: () => void
  setVehicleInStorage: (data: VehicleData) => void
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
export const VehicleProvider = ({ children }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const licensePlate = useLicensePlateOnChangeStorage()
  const vehicle = useGetVehicleOnChangeStorage()

  // ? LicensePlate session storage
  // sessionStorage: Only the license plate
  const setLicensePlateInStorage = (value: string) => {
    sessionStorage.setItem(licensePlateKey, value)
    window.dispatchEvent(new Event(customLicensePlateUpdateEvent))
  }

  // deletes license plate from the session storage, so that others can be entered
  const deleteLicensePlate = () => {
    sessionStorage.removeItem(licensePlateKey)
    window.dispatchEvent(new Event(customLicensePlateUpdateEvent))
  }

  // ? Vehicle local storage
  // localStorage: All vehicle data
  const setVehicleInStorage = (data: VehicleData) => {
    localStorage.setItem(vehicleKey, JSON.stringify(data))
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }

  // deletes license plate from the session storage, so that others can be entered
  const deleteVehicle = () => {
    sessionStorage.removeItem(vehicleKey)
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }


  // if the session storage doesn't have a license plate
  // or if the local storage doesn't have vehicle data, open modal
  useEffect(() => {
    if (!licensePlate && !vehicle) {
      setModalIsOpen(true)      // ! -> LicensePlate deberia ser eliminado porque quiero datos del auto entero

    } else if (licensePlate && !vehicle) {
      setModalIsOpen(false)

    } else if (!licensePlate && vehicle) {
      setModalIsOpen(false)

    }
  }, [licensePlate, vehicle])


  return <VehicleContext.Provider
    value={{
      modalIsOpen,
      setModalIsOpen,
      licensePlate,
      setLicensePlateInStorage,
      deleteLicensePlate,
      setVehicleInStorage,
      deleteVehicle
    }}
  >
    {children}
  </VehicleContext.Provider>
}