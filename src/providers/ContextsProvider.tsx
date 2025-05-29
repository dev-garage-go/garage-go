'use client'

import {
  ServiceContextProvider,
  VehicleContextProvider,
  BookingContextProvider,
  AdminContextProvider
} from "./contexts"

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <VehicleContextProvider>
      <ServiceContextProvider>
        <BookingContextProvider>
          <AdminContextProvider>
            {children}
          </AdminContextProvider>
        </BookingContextProvider>
      </ServiceContextProvider>
    </VehicleContextProvider>
  )
}
