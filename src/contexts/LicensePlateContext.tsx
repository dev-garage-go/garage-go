'use client'

import { useLicensePlateOnChangeStorage } from "@/hooks"
import { customLicensePlateUpdateEvent, licensePlateKey } from "@/keys"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface LicensePlateContextType {
  licensePlateModalIsOpen: boolean
  setLicensePlateModalIsOpen: React.Dispatch<SetStateAction<boolean>>
  licensePlate: string | null
  setLicensePlate: (value: string) => void
  deleteLicensePlate: () => void
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

  // sets license plate in the session storage
  const setLicensePlate = (value: string) => {
    sessionStorage.setItem(licensePlateKey, value)
    window.dispatchEvent(new Event(customLicensePlateUpdateEvent))
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
      setLicensePlate,
      deleteLicensePlate
    }}
  >
    {children}
  </LicensePlateContext.Provider>
}