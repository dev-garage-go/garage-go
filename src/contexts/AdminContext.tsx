"use client"

import { validateAdminPassword } from "@/actions"
import { expiresIsAuthorized, isAuthorized } from "@/keys"
import { useRouter } from "next/navigation"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface AdminContextInterface {
  password: string,
  setPassword: React.Dispatch<SetStateAction<string>>
  wrongPassword: boolean
  setWrongPassword: React.Dispatch<SetStateAction<boolean>>
  authorized: boolean
  isValidPassword: (password: string) => Promise<void>
  isAdminSessionValid: () => boolean | void,
  clearAdminSession: () => void
}

interface Props {
  children: React.ReactNode
}

const AdminContext = createContext<AdminContextInterface | null>(null)

export const useAdminContext = () => {
  const context = useContext(AdminContext)
  if (!context) { throw new Error('useAdminContext must be inside of a context') }
  return context
}

export const AdminContextProvider = ({ children }: Props) => {
  const isClient = typeof window !== 'undefined' // avoids server errors
  const router = useRouter();

  const [password, setPassword] = useState("")
  const [wrongPassword, setWrongPassword] = useState<boolean>(false)
  const [authorized, setAuthorized] = useState<boolean>(false);

  // save the authorization in the session storage with a time stamp
  const saveAuthorizationInStorage = () => {
    if (!isClient) return;

    const expiresIn = 1000 * 60 * 1440 * 7;   // 1 week en ms (1440 minutes = 1 day)
    const expiresAt = Date.now() + expiresIn;

    sessionStorage.setItem(isAuthorized, "true")
    sessionStorage.setItem(expiresIsAuthorized, expiresAt.toString());
  }

  // delete admin authorization
  const clearAdminSession = () => {
    if (!isClient) return;

    sessionStorage.removeItem(isAuthorized);
    sessionStorage.removeItem(expiresIsAuthorized);
  };

  // verifies if the user is authorized
  const isAdminSessionValid = (): boolean | void => {
    if (!isClient) return;

    const hasAuthorized = sessionStorage.getItem(isAuthorized) === "true"
    const expiresAt = parseInt(sessionStorage.getItem(expiresIsAuthorized) || "0")
    console.log(hasAuthorized)
    console.log(expiresAt)

    if (!hasAuthorized || Date.now() > expiresAt) return false
    else return true
  }

  // verifies if the password entered is correct
  const isValidPassword = async (password: string): Promise<void> => {
    const isValid = await validateAdminPassword(password)

    if (isValid.success) {
      saveAuthorizationInStorage()
      setAuthorized(true)
    } else {
      setWrongPassword(true)
    }
  }

  // Verifies is user is authorized
  useEffect(() => {
    if (authorized) {
      router.push("/admin/bookings")  // guard
    }
  }, [authorized])

  return (
    <AdminContext.Provider
      value={{
        wrongPassword,
        setWrongPassword,
        password,
        setPassword,
        authorized,
        isValidPassword,
        isAdminSessionValid,
        clearAdminSession
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}