'use client'

import {
  ServiceContextProvider,
  VehicleContextProvider,
  BookingContextProvider,
  AdminContextProvider,
  EmailContextProvider
} from "./contexts"

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <VehicleContextProvider>
      <ServiceContextProvider>
        <EmailContextProvider>
          <BookingContextProvider>
            <AdminContextProvider>
              {children}
            </AdminContextProvider>
          </BookingContextProvider>
        </EmailContextProvider>
      </ServiceContextProvider>
    </VehicleContextProvider>
  )
}
