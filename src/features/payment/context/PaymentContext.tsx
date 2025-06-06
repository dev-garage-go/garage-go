"use client"

import { calculateBaseChargeByVehicle, calculateFinalChargeByService } from "@/backend/actions"
import { AmountInterface } from "@/features/bookings"
import { createContext, useContext } from "react"
import { BaseChargeByVehicle } from "../types/service-charge"

interface PaymentContextType {
  baseAmount: AmountInterface
  finalAmount: AmountInterface
  sendBaseChargeByVehicleRequest: (requestData: BaseChargeByVehicle) => Promise<void>
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
  let baseAmount: AmountInterface = {
    subtotal: 0,
    disscount: 0,
    total: 0
  }

  let finalAmount: AmountInterface = {
    subtotal: baseAmount.subtotal + 0,
    disscount: baseAmount.disscount + 0,
    total: baseAmount.total + 0
  }

  const sendBaseChargeByVehicleRequest = async (requestData: BaseChargeByVehicle) => {
    try {
      const response = await calculateBaseChargeByVehicle(requestData)
      if (!response.success) throw new Error(response.error);

      const { disscount, subtotal, total } = response.data!

      baseAmount = {
        subtotal,
        disscount,
        total
      }
    } catch (error) {
      console.log(error)
    }
  }


  return <PaymentContext.Provider value={{
    baseAmount,
    finalAmount,
    sendBaseChargeByVehicleRequest
  }}>
    {children}
  </PaymentContext.Provider>
}