'use client'

import {
  ServiceContextProvider,
  VehicleContextProvider,
  BookingContextProvider,
  AdminContextProvider,
  EmailContextProvider,
  PaymentContextProvider,
  OrderContextProvider
} from "./contexts"
import { RefreshListener } from "./RefreshListener"
import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <>
      <Toaster
        richColors
        position="bottom-center"
      />
      <RefreshListener />

      {/* Apps contexts */}
      <VehicleContextProvider>
        <ServiceContextProvider>
          <EmailContextProvider>
            <PaymentContextProvider>
              <BookingContextProvider>
                <OrderContextProvider>
                  <AdminContextProvider>
                    {children}
                  </AdminContextProvider>
                </OrderContextProvider>
              </BookingContextProvider>
            </PaymentContextProvider>
          </EmailContextProvider>
        </ServiceContextProvider>
      </VehicleContextProvider>
    </>
  )
}
