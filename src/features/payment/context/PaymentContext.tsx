"use client"

import { calculateBaseChargeByVehicle, calculateFinalChargeByService } from "@/backend/actions"
import { AmountInterface } from "@/features/bookings"
import { createContext, useContext, useState } from "react"
import { BaseChargeByVehicle } from "../types/service-charge"

interface PaymentContextType {
  baseAmount: AmountInterface
  finalAmount: AmountInterface
  sendBaseChargeByVehicleRequest: (requestData: BaseChargeByVehicle) => Promise<void>
  sendFinalChargeByService: (requestData: string) => Promise<void>
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
  const [baseAmount, setBaseAmount] = useState<AmountInterface>({ disscount: 0, subtotal: 0, total: 0 })
  const [finalAmount, setFinalAmount] = useState<AmountInterface>({ disscount: 0, subtotal: 0, total: 0 })

  const sendBaseChargeByVehicleRequest = async (requestData: BaseChargeByVehicle) => {
    try {
      console.log(requestData)
      const response = await calculateBaseChargeByVehicle(requestData)
      if (!response.success) throw new Error(response.error);

      const { disscount, subtotal, total } = response.data!
      setBaseAmount({ disscount, subtotal, total })

    } catch (error) {
      console.log(error)
    }
  }

  const sendFinalChargeByService = async (requestData: string) => {
    console.log(requestData)
  }


  return <PaymentContext.Provider value={{
    baseAmount,
    finalAmount,
    sendBaseChargeByVehicleRequest,
    sendFinalChargeByService
  }}>
    {children}
  </PaymentContext.Provider>
}