/* Doc:
1. Reads the sessionStorage looking for the value under vehicleKey.
2. Stores that value in the internal state (authorization).
3. Listens for changes via:
  - Storage events (when the sessionStorage changes from another tab or window).
  - A custom event (customVehicleUpdateEvent) that you fire manually in the code when you change the sessionStorage from the same tab.
4. When it detects a change, it rereads the sessionStorage and updates its state (authorization) if it changed.
5. If it is the first time it detects a new value, it calls router.refresh(), which re-renders the server component associated to the current route in Next.js App Router.
*/

"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAdminContext } from "@/contexts"

export const useAdminGuard = () => {
  const { isAdminSessionValid, clearAdminSession } = useAdminContext()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      const isValid = isAdminSessionValid()

      if (!isValid && pathname.startsWith("/admin")) {
        clearAdminSession()
        router.push("/admin")
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [pathname, router])
}
