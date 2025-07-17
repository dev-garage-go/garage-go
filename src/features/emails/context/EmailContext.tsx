"use client"

import { createContext, useContext } from "react"
import { toast } from "sonner"
import { OrderEmailType } from "../schemas/emails"

interface EmailContextType {
  sendBookingConfirmationEmail: (emailData: OrderEmailType) => Promise<null>
}

interface Props {
  children: React.ReactNode
}

// Create context
const EmailContext = createContext<EmailContextType | null>(null)

// Custom hook to use context
export const useEmailContext = () => {
  const context = useContext(EmailContext)
  if (!context) { throw new Error('useServiceContext must be inside of a context') }
  return context
}

// Provider
export const EmailContextProvider = ({ children }: Props) => {

  const sendOrderStateEmail = async (emailData: OrderEmailType): Promise<null> => {
    const response = await fetch("/api/emails/order", {
      headers: { 'Content-Type': 'application/json', },
      method: 'POST',
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      toast.error("Ocurrio un error al intentar enviar un email con el estado de su Orden")
      throw new Error("error trying send order email to user")
    }

    return null
  }

  return <EmailContext.Provider value={{
    sendBookingConfirmationEmail: sendOrderStateEmail
  }}
  >
    {children}
  </EmailContext.Provider>
}