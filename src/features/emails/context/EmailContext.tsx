"use client"

import { createContext, useContext } from "react"
import { ConfirmationBookingEmailInterface } from "../types/confirmation"

interface EmailContextType {
  sendBookingConfirmationEmail: (emailData: ConfirmationBookingEmailInterface) => Promise<Response>
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

  const sendBookingConfirmationEmail = async (emailData: ConfirmationBookingEmailInterface): Promise<Response> => {
    const response = await fetch("/api/emails/send", {
      headers: { 'Content-Type': 'application/json', },
      method: 'POST',
      body: JSON.stringify(emailData),
    })

    const data = await response.json()
    console.log(data)
    return response
  }

  return <EmailContext.Provider value={{
    sendBookingConfirmationEmail
  }}
  >
    {children}
  </EmailContext.Provider>
}