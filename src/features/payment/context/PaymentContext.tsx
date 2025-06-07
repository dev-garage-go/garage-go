"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

import { AmountInterface } from "@/features/bookings"
import { BaseChargeByVehicle } from "../types/service-charge"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"
import { ServicesTypes, useServiceContext } from "@/features/services"

import { calculateBaseChargeByVehicle } from "@/backend/actions"

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

      const { disscount, subtotal, total } = response.data!
      setBaseAmount({ disscount, subtotal, total })

    } catch (error) {
      console.log(error)
    }
  }

  const sendFinalChargeByService = async (requestData: string) => {
    // action -> calculateFinalChargeByService()
    console.log(requestData)
  }

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
      } else if (vehicle && service) {
        await sendFinalChargeByService("prueba")
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