'use client'

import {
  ServiceContextProvider,
  VehicleContextProvider,
  BookingContextProvider
} from "@/contexts"

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <VehicleContextProvider>
      <ServiceContextProvider>
        <BookingContextProvider>
          {children}
        </BookingContextProvider>
      </ServiceContextProvider>
    </VehicleContextProvider>
  )
}
