'use client'

import { VehicleProvider } from "./LicensePlateContext"

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <VehicleProvider>
      {children}
    </VehicleProvider>
  )
}
