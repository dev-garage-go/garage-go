'use client'

import { useGetVehicleOnChangeStorage, useLicensePlateOnChangeStorage } from "@/hooks"
import { VehicleModalForm } from "@/interfaces"
import { customLicensePlateUpdateEvent, customVehicleUpdateEvent, licensePlateKey, vehicleKey } from "@/keys"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface LicensePlateContextType {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>
  licensePlate: string | null
  setLicensePlateInStorage: (value: string) => void
  deleteLicensePlate: () => void
  setVehicleInStorage: (data: VehicleModalForm) => void
  getVehicleDataInStorage: () => { exist: boolean; data?: VehicleModalForm }
  deleteVehicle: () => void
}


interface Props {
  children: React.ReactNode
}

// Create the context
const LicensePlateContext = createContext<LicensePlateContextType | null>(null)

// Custom hook to use context
export const useLicensePlateContext = () => {
  const context = useContext(LicensePlateContext)
  if (!context) { throw new Error('useLicensePlateContext must be inside of a context') }
  return context
}

// Provider
export const LicensePlateProvider = ({ children }: Props) => {
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
  const setVehicleInStorage = (data: VehicleModalForm) => {
    localStorage.setItem(vehicleKey, JSON.stringify(data))
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }

  // localStorage: Get vehicle data
  const getVehicleDataInStorage = (): { exist: boolean; data?: VehicleModalForm } => {
    const data = localStorage.getItem(vehicleKey)
    if (data) {
      return { exist: true, data: JSON.parse(data) }
    } else {
      return { exist: false, data: undefined }
    }
  }

  // deletes license plate from the session storage, so that others can be entered
  const deleteVehicle = () => {
    sessionStorage.removeItem(vehicleKey)
    window.dispatchEvent(new Event(customVehicleUpdateEvent))
  }


  // if the session storage doesn't have a license plate, open modal
  useEffect(() => {
    if (!licensePlate && !vehicle) {
      setModalIsOpen(true)      // ! -> LicensePlate deberia ser eliminado porque quiero datos del auto entero

    } else if (licensePlate && !vehicle) {
      setModalIsOpen(false)

    } else if (!licensePlate && vehicle) {
      setModalIsOpen(false)

    }
  }, [licensePlate, vehicle])


  return <LicensePlateContext.Provider
    value={{
      modalIsOpen,
      setModalIsOpen,
      licensePlate,
      setLicensePlateInStorage,
      deleteLicensePlate,
      setVehicleInStorage,
      getVehicleDataInStorage,
      deleteVehicle
    }}
  >
    {children}
  </LicensePlateContext.Provider>
}