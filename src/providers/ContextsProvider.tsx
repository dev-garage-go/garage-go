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
          <PaymentContextProvider>
            <BookingContextProvider>
              <AdminContextProvider>
                {children}
              </AdminContextProvider>
            </BookingContextProvider>
          </PaymentContextProvider>
        </EmailContextProvider>
      </ServiceContextProvider>
    </VehicleContextProvider>
  )
}
