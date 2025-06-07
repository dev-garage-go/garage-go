"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

import { BaseChargeByVehicle } from "../types/service-charge"
import { AmountInterface } from "@/features/bookings"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"
import { useServiceContext } from "@/features/services"

import { calculateBaseChargeByVehicle, setBaseAmountInCookie } from "@/backend/actions"

interface PaymentContextType {
  baseAmount: AmountInterface
  finalAmount: AmountInterface
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
  const { getServiceFromStorage, serviceType } = useServiceContext()

  // get vehicle from storage
  const vehicle = useGetVehicleOnChangeStorage()
  const service = getServiceFromStorage()

  const [baseAmount, setBaseAmount] = useState<AmountInterface>({ disscount: 0, subtotal: 0, total: 0 })
  const [finalAmount, setFinalAmount] = useState<AmountInterface>({ disscount: 0, subtotal: 0, total: 0 })

  const sendBaseChargeByVehicleRequest = async (requestData: BaseChargeByVehicle) => {
    try {
      const response = await calculateBaseChargeByVehicle(requestData)
      if (!response.success) throw new Error(response.error);

      const amount = response.data!
      setBaseAmount(amount)

      // save amount in cookies
      await setBaseAmountInCookie(amount)

    } catch (error) {
      console.log(error)
    }
  }

  // future feature: if in the future the app needs calculates an extra amount 
  // ! by service options that user has selected, execute this func
  // const sendFinalChargeByService = async (requestData: string) => {
  // action -> calculateFinalChargeByService()
  // }

  // prevent an infinite loop when the vehicle in the local storage changed
  const lastVehicle = useRef<string | null>(null)

  // execute the logic of charging
  useEffect(() => {
    if (!vehicle) return

    const serialized = JSON.stringify(vehicle)
    if (serialized === lastVehicle.current) return; // si es el mismo vehículo que antes, no recalcula
    lastVehicle.current = serialized

    const run = async () => {
      if (vehicle && !service && serviceType) {
        await sendBaseChargeByVehicleRequest({ serviceType, vehicle })
      }
    }

    run()
  }, [vehicle, service, serviceType])


  return <PaymentContext.Provider value={{
    baseAmount,
    finalAmount,
  }}>
    {children}
  </PaymentContext.Provider>
}