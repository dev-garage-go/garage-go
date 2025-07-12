'use client'

import { createInitialOrder, deleteBaseAmountInCookie } from "@/backend/actions"
import { createContext, useContext } from "react"
import { PayloadInitialOrder } from "../schemas/orders"

interface Props {
  children: React.ReactNode
}

interface OrderContextType {
  sendInitialOrderRequest: ({ provider, bookingId }: PayloadInitialOrder) => Promise<void>
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
    try {
      const initialOrder = await createInitialOrder({ provider, bookingId })
      if (!initialOrder.success || !initialOrder.data) throw new Error(initialOrder.error)

      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      let apiRoute: string = ""

      if (provider === "mercado-pago") apiRoute = "/api/payment/mercado-pago"
      else if (provider === "getnet") apiRoute = "/api/payment/getnet"
      else if (provider === "webpay") apiRoute = "/api/payment/webpay"
      else throw new Error(`the provider ${provider} doesn't exist`)

      const response = await fetch(apiRoute, {
        headers: myHeaders,
        body: JSON.stringify(initialOrder)
      })

      if (!response.ok) throw new Error(`error response with status ${response.status} in api route: ${apiRoute}`)

      // delete cookies when initial order was created
      await deleteBaseAmountInCookie()
    } catch (error) {
      console.error(error)
    }
  }

  return <OrderContext.Provider value={{
    sendInitialOrderRequest
  }}>
    {children}
  </OrderContext.Provider>
}