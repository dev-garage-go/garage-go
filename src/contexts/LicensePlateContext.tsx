'use client'

import { useLicensePlateOnChangeStorage } from "@/hooks"
import { VehicleModalForm } from "@/interfaces"
import { customLicensePlateUpdateEvent, licensePlateKey, vehicleKey } from "@/keys"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface LicensePlateContextType {
  licensePlateModalIsOpen: boolean
  setLicensePlateModalIsOpen: React.Dispatch<SetStateAction<boolean>>
  licensePlate: string | null
  setLicensePlateInStorage: (value: string) => void
  deleteLicensePlate: () => void
  setVehicleDataInStorage: (data: VehicleModalForm) => void
  getVehicleDataInStorage: () => { exist: boolean; data?: VehicleModalForm }
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
  const [licensePlateModalIsOpen, setLicensePlateModalIsOpen] = useState<boolean>(false)
  const licensePlate = useLicensePlateOnChangeStorage()

  // sessionStorage: Only the license plate
  const setLicensePlateInStorage = (value: string) => {
    sessionStorage.setItem(licensePlateKey, value)
    window.dispatchEvent(new Event(customLicensePlateUpdateEvent))
  }

  // localStorage: All vehicle data
  const setVehicleDataInStorage = (data: VehicleModalForm) => {
    localStorage.setItem(vehicleKey, JSON.stringify(data))
    window.dispatchEvent(new Event(customLicensePlateUpdateEvent))
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
  const deleteLicensePlate = () => {
    sessionStorage.removeItem(licensePlateKey)
    window.dispatchEvent(new Event(customLicensePlateUpdateEvent))
  }


  // if the session storage doesn't have a license plate, open modal
  useEffect(() => {
    if (!licensePlate) {
      setLicensePlateModalIsOpen(true)
    }
  }, [licensePlate])


  return <LicensePlateContext.Provider
    value={{
      licensePlateModalIsOpen,
      setLicensePlateModalIsOpen,
      licensePlate,
      setLicensePlateInStorage,
      deleteLicensePlate,
      setVehicleDataInStorage,
      getVehicleDataInStorage
    }}
  >
    {children}
  </LicensePlateContext.Provider>
}