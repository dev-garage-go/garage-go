'use client'

import { createInitialOrder, deleteBaseAmountInCookie } from "@/backend/actions"
import { createContext, useContext } from "react"
import { ProvidersType } from "../schemas/orders"

interface Props {
  children: React.ReactNode
}

interface OrderContextType {
  sendRequestOrder: (provider: ProvidersType, bookingId: string) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export const useOrderContext = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrderContext must be inside of a context')
  return context
}

export const OrderContextProvider = ({ children }: Props) => {

  const sendRequestOrder = async (provider: ProvidersType, bookingId: string) => {
    await createInitialOrder({ provider, bookingId })

    // delete cookies when initial order was created
    await deleteBaseAmountInCookie()
  }

  return <OrderContext.Provider value={{
    sendRequestOrder
  }}>
    {children}
  </OrderContext.Provider>
}