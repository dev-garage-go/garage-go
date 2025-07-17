'use client'

import { createInitialOrder, deleteBaseAmountInCookie } from "@/backend/actions"
import { createContext, useContext } from "react"
import { ParamsToCreateInitialOrder } from "../schemas/orders"
import { useRouter } from "next/navigation"
import { APIResponse, EndpointResponse } from '@/backend/types';

interface Props {
  children: React.ReactNode
}

interface OrderContextType {
  sendInitialOrderRequest: ({ provider, booking_id }: ParamsToCreateInitialOrder) => Promise<void>
}

const OrderContext = createContext<OrderContextType | null>(null)

export const useOrderContext = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrderContext must be inside of a context')
  return context
}

export const OrderContextProvider = ({ children }: Props) => {
  const router = useRouter()
  // calls action to craete the initial order
  const sendInitialOrderRequest = async ({ provider, booking_id }: ParamsToCreateInitialOrder) => {
    try {
      const result = await createInitialOrder({ provider, booking_id })
      if (!result.success || !result.data) throw new Error(result.error)
      const initialOrder = result.data

      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      let apiRoute: string = ""

      if (provider === "mercado-pago") apiRoute = "/api/payment/mercado-pago"
      else if (provider === "getnet") apiRoute = "/api/payment/getnet"
      else if (provider === "webpay") apiRoute = "/api/payment/webpay"
      else throw new Error(`the provider ${provider} doesn't exist`)

      const response = await fetch(apiRoute, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(initialOrder)
      })

      if (!response.ok) throw new Error(`error response with status ${response.status} in api route: ${apiRoute}`)
      const body: APIResponse<EndpointResponse> = await response.json()

      if (!body.success) throw new Error(body.error)
      if (!body.data) throw new Error("error getting path of redirectURL")

      const checkoutUrl = body.data.redirectURL

      // delete cookies when initial order was created
      // TODO: await deleteBaseAmountInCookie()
      router.push(checkoutUrl)

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