'use client'

import {
  ServiceContextProvider,
  VehicleContextProvider,
  BookingContextProvider,
  AdminContextProvider,
  EmailContextProvider,
  PaymentContextProvider
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
              <PaymentContextProvider>
                {children}
              </PaymentContextProvider>
            </AdminContextProvider>
          </BookingContextProvider>
        </EmailContextProvider>
      </ServiceContextProvider>
    </VehicleContextProvider>
  )
}
