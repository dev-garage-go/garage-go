'use client'

import { useLicensePlateOnChangeStorage } from "@/hooks"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface LicensePlateContextType {
  licensePlateModalIsOpen: boolean
  setLicensePlateModalIsOpen: React.Dispatch<SetStateAction<boolean>>
  licensePlate: string | null
}


interface Props {
  children: React.ReactNode
}

// Create the context
const LicensePlateContext = createContext<LicensePlateContextType | null>(null)

// Custom hook
export const useLicensePlateContext = () => {
  const context = useContext(LicensePlateContext)
  if (!context) { throw new Error('useLicensePlateContext must be inside of a context') }
  return context
}


// Provider
export const LicensePlateProvider = ({ children }: Props) => {
  const [licensePlateModalIsOpen, setLicensePlateModalIsOpen] = useState<boolean>(false)
  const licensePlate = useLicensePlateOnChangeStorage()

  useEffect(() => {
    if (!licensePlate) {
      setLicensePlateModalIsOpen(true)
    }
  }, [licensePlate])


  return <LicensePlateContext.Provider
    value={{
      licensePlateModalIsOpen,
      setLicensePlateModalIsOpen,
      licensePlate
    }}
  >
    {children}
  </LicensePlateContext.Provider>
}