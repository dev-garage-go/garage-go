"use client"

import { calculateServiceCharge } from "@/backend/actions"
import { AmountInterface } from "@/features/bookings"
import { createContext, useContext } from "react"
import { ServiceChargeInterface } from "../types/service-charge"

interface PaymentContextType {
  amount: AmountInterface
  sendChargeRequest: (requestData: ServiceChargeInterface) => Promise<void>
}

// Context
const PaymentContext = createContext<PaymentContextType | null>(null)

// Custom hook to use context
export const usePaymentContext = () => {
  const context = useContext(PaymentContext)
  if (!context) throw new Error("PaymentContext must be inside of a provider")
  return context
}

interface Props {
  children: React.ReactNode
}

// Provider
export const PaymentContextProvider = ({ children }: Props) => {
  let amount: AmountInterface = {
    subtotal: 0,
    disscount: 0,
    total: 0
  }

  const sendChargeRequest = async (requestData: ServiceChargeInterface) => {
    try {
      const response = await calculateServiceCharge(requestData)
      if (!response.success) throw new Error(response.error);

      const { disscount, subtotal, total } = response.data!

      amount = {
        subtotal,
        disscount,
        total
      }
    } catch (error) {
      console.log(error)
    }
  }


  return <PaymentContext.Provider value={{
    amount,
    sendChargeRequest
  }}>
    {children}
  </PaymentContext.Provider>
}