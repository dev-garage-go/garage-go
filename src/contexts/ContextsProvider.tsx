'use client'

import {
  ServiceContextProvider,
  VehicleContextProvider
} from "@/contexts"

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <VehicleContextProvider>
      <ServiceContextProvider>
        {children}
      </ServiceContextProvider>
    </VehicleContextProvider>
  )
}
