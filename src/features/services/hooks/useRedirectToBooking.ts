"use client"

import { usePathname, useRouter } from 'next/navigation'

export const useRedirectToBooking = () => {
  const pathname = usePathname()
  const router = useRouter()

  // caching the path if not change and return it
  const redirect = () => {
    const segments = pathname.split('/').filter(Boolean)
    const bookingPath = segments[0] === 'services' ? `/services/${segments[1]}/booking` : ''
    router.push(bookingPath)
  }

  return redirect
}
