"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const refreshRequestEventKey = "request-router-refresh"

export const RefreshListener = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRefresh = () => {
      router.refresh()
    }

    window.addEventListener(refreshRequestEventKey, handleRefresh)

    return () => {
      window.removeEventListener(refreshRequestEventKey, handleRefresh)
    }
  }, [])

  return null
}
