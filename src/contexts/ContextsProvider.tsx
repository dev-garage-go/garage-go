'use client'

import { LicensePlateProvider } from "./LicensePlateContext"

interface Props {
  children: React.ReactNode
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <LicensePlateProvider>
      {children}
    </LicensePlateProvider>
  )
}
