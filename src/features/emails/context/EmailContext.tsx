"use client"

import { createContext, useContext } from "react"

interface EmailContextType {
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
  return <EmailContext.Provider value={{}}
  >
    {children}
  </EmailContext.Provider>
}