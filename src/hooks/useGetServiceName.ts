"use client"

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export const useGetServiceName = () => {
  const pathname = usePathname()

  // caching the path if not change and return it
  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    return segments[0] === 'services' ? segments[1] : ''
  }, [pathname])
}
