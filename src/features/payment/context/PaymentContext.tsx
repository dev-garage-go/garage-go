"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

import { BaseChargeByVehicle } from "../types/service-charge"
import { AmountInterface } from "@/features/bookings"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"
import { useServiceContext } from "@/features/services"

import {
  calculateBaseChargeByVehicle,
  deleteBaseAmountInCookie,
  getBaseAmountInCookie,
  setBaseAmountInCookie
} from "@/backend/actions"

interface PaymentContextType {
  handleShowAmount: () => AmountInterface
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
  const [amountInCookie, setAmountInCookie] = useState<AmountInterface | null>()

  // calling function that executes charging logic
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

  // prevent an infinite loop when the vehicle when the local storage changed
  const lastVehicle = useRef<string | null>(null)
  const hasCalculated = useRef<boolean>(false)

  // calculate the amount in contracting page when a service doesn't exist in localStorage
  useEffect(() => {
    if (!vehicle || !serviceType || hasCalculated.current) return;

    if (!service && vehicle) {
      hasCalculated.current = true
      const calculateAmount = async () => {
        await sendBaseChargeByVehicleRequest({ serviceType, vehicle })
      }
      calculateAmount()
    }
  }, [vehicle, service, serviceType, amountInCookie])

  // if the vehicle change, delete cookie and recalculate
  useEffect(() => {
    if (!vehicle || !serviceType) return;
    const serialized = JSON.stringify(vehicle)

    if (serialized !== lastVehicle.current) {
      const deleteCookie = async () => {
        const response = await deleteBaseAmountInCookie()
        if (response.success) {
          setAmountInCookie(null)
          await sendBaseChargeByVehicleRequest({ serviceType, vehicle })
        }
      }
      deleteCookie()
    }

    lastVehicle.current = serialized

  }, [vehicle, serviceType])

  // verify if exist amount cookie
  useEffect(() => {
    const verifyCookie = async () => {
      const response = await getBaseAmountInCookie()
      if (!response.success || response.data === null) return;
      setAmountInCookie(response.data)
    }
    verifyCookie()
  }, [])

  // handling the amount that will be show in UI
  const handleShowAmount = (): AmountInterface => {
    return amountInCookie ?? baseAmount
  }

  return <PaymentContext.Provider value={{
    handleShowAmount
  }}>
    {children}
  </PaymentContext.Provider>
}