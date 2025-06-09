"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NamePage() {
  const router = useRouter()

  // guard
  useEffect(() => { router.back() }, [router])

  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}