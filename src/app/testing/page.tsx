"use client"

import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from "@/features/emails"
import { useState } from "react";

export default function TestingPage() {
  const [state, setState] = useState()

  const d: ConfirmationBookingEmailInterface = {
    userEmail: "development@garageservice.cl",
    firstName: "Edagardo",
    bookingId: "6840a74fc92e6a7cab1d8e34",
    service: "mantencion por kilometraje"
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <button
        onClick={async () => {
          const res = await fetch("/api/emails/send", {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(d),
          })
          const data = await res.json()
          setState(data)
          console.log(data)
        }}
        className="mt-10 bg-slate-50 rounded">
        Mandar email
      </button>

      <div className="bg-gray-300">
        {JSON.stringify(state)}
      </div>
    </div>
  );
}