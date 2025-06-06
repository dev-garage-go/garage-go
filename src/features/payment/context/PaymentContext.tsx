"use client"

import { AmountInterface } from "@/features/bookings"
import { createContext, useContext } from "react"

interface PaymentContextType {
  amount: AmountInterface
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
  const amount: AmountInterface = {
    subtotal: 0,
    disscount: 0,
    total: 0
  }

  return <PaymentContext.Provider value={{
    amount
  }}>
    {children}
  </PaymentContext.Provider>
}