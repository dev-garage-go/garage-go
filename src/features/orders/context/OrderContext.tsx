'use client'

import { createInitialOrder, deleteBaseAmountInCookie } from "@/backend/actions"
import { createContext, useContext } from "react"
import { PayloadInitialOrder } from "../schemas/orders"

interface Props {
  children: React.ReactNode
}

interface OrderContextType {
  sendInitialOrderRequest: ({ provider, bookingId }: PayloadInitialOrder) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export const useOrderContext = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrderContext must be inside of a context')
  return context
}

export const OrderContextProvider = ({ children }: Props) => {
  // calls action to craete the initial order
  const sendInitialOrderRequest = async ({ provider, bookingId }: PayloadInitialOrder) => {
    const initialOrder = await createInitialOrder({ provider, bookingId })

    
    // delete cookies when initial order was created
    await deleteBaseAmountInCookie()
  }

  return <OrderContext.Provider value={{
    sendInitialOrderRequest
  }}>
    {children}
  </OrderContext.Provider>
}