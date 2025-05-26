/* Doc:
1. must be used in all paths within /admin except /.
2. It takes the expiration date of the admin token (expiresIsAuthorized) expressed in milliseconds and calculates how much time is left until that time. Subtracting the future expiration date minus the current time.
3. If the expiration date has expired, redirect to “/admin”. If it has not expired yet, program a function that will wait for the time needed for the token to expire and then run the function to clear the token, (setTimeout).
*/

"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAdminContext } from "@/contexts"
import { expiresIsAuthorized } from "@/keys"

export const useAdminGuard = () => {
  const { clearAdminSession } = useAdminContext()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isClient = typeof window !== 'undefined'
    if (!isClient) return;

    const expiresAt = parseInt(sessionStorage.getItem(expiresIsAuthorized) || "0", 10)
    const now = Date.now()
    const timeRemaining = expiresAt - now

    // If it's expired, redirect
    if (timeRemaining <= 0 && pathname.startsWith("/admin")) {
      clearAdminSession()
      router.push("/admin")
      return
    }

    const timeout = setTimeout(() => {
      if (pathname.startsWith("/admin")) {
        clearAdminSession()
        router.push("/admin")
        return
      }
    }, timeRemaining)

    return () => clearTimeout(timeout)
  }, [pathname, router, clearAdminSession])
}
