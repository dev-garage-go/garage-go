"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

import { BaseChargeByVehicle } from "../types/service-charge"
import { AmountInterface } from "@/features/payment"
import { useVehicleContext } from "@/features/vehicle"
import { useServiceContext } from "@/features/services"

import {
  calculateBaseChargeByVehicle,
  deleteBaseAmountInCookie,
  getBaseAmountInCookie,
  loadBaseAmountInCookie
} from "@/backend/actions"
import { usePathname, useRouter } from "next/navigation"

interface PaymentContextType {
  amountInCookie: AmountInterface
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
  const { serviceInStorage, serviceType } = useServiceContext()
  const { vehicleInStorage } = useVehicleContext()

  const [amountInCookie, setAmountInCookie] = useState<AmountInterface>({ disscount: 0, subtotal: 0, total: 0 })

  const router = useRouter();
  const pathname = usePathname();

  // calling function that executes charging logic
  const sendBaseChargeByVehicleRequest = async (requestData: BaseChargeByVehicle) => {
    try {
      const response = await calculateBaseChargeByVehicle(requestData)
      if (!response.success) throw new Error(response.error);

      const amount = response.data!

      // save amount in cookies
      await loadBaseAmountInCookie(amount)
      setAmountInCookie(amount)

    } catch (error) {
      console.log(error)
    }
  }

  // prevent an infinite loop when the vehicle when the local storage changed
  const lastVehicle = useRef<string | null>(null)
  const hasCalculated = useRef<boolean>(false)

  // calculate the amount in contracting page when a service doesn't exist in localStorage
  useEffect(() => {
    if (!vehicleInStorage || !serviceType || hasCalculated.current) return;

    if (!serviceInStorage && vehicleInStorage) {
      hasCalculated.current = true
      const calculateAmount = async () => {
        await sendBaseChargeByVehicleRequest({ serviceType, vehicle: vehicleInStorage })
      }
      calculateAmount()
    }
  }, [vehicleInStorage, serviceInStorage, serviceType])

  // ! guards
  // if the vehicle change, delete cookie and recalculate
  useEffect(() => {
    if (!vehicleInStorage || !serviceType) return;
    const serialized = JSON.stringify(vehicleInStorage)

    if (serialized !== lastVehicle.current) {
      const deleteCookie = async () => {
        const response = await deleteBaseAmountInCookie()
        if (response.success) {
          await sendBaseChargeByVehicleRequest({ serviceType, vehicle: vehicleInStorage })
        }
      }
      deleteCookie()
    }

    lastVehicle.current = serialized

  }, [vehicleInStorage, serviceType])

  // verify if exist amount cookie when the page is mounted
  useEffect(() => {
    const verifyCookie = async () => {
      const response = await getBaseAmountInCookie()
      if (!response.success || response.data === null) return;
      setAmountInCookie(response.data)
    }
    verifyCookie()
  }, [])

  // if the cookie was deleted (maxAge = 1hour) because the user took
  // too long to make the reservation, redirect to /services
  useEffect(() => {
    if (!amountInCookie.subtotal && pathname.startsWith('/booking')) {
      router.push('/services')
    }
  }, [amountInCookie, amountInCookie.subtotal, pathname, router])


  return <PaymentContext.Provider value={{
    amountInCookie
  }}>
    {children}
  </PaymentContext.Provider>
}