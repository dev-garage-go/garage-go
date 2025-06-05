"use client"

import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from "@/features/emails"

export default function TestingPage() {
  const d: ConfirmationBookingEmailInterface = {
    firstName: "Edagardo",
    bookingId: "6840a74fc92e6a7cab1d8e34",
    service: "mantencion por kilometraje"
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <ConfirmationBookingEmail
        firstName="Edagardo"
        service="mantencion por kilometraje"
        bookingId="6840a74fc92e6a7cab1d8e34"
      />

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
          console.log(data)
        }}
        className="mt-10 bg-slate-50 rounded">
        Mandar email
      </button>
    </div>
  );
}