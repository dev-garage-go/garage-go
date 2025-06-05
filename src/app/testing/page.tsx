import { ConfirmationBookingEmail } from "@/features/emails"


export default function TestingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <ConfirmationBookingEmail
        firstName="Edagardo"
        service="mantencion por kilometraje"
        bookingId="6840a74fc92e6a7cab1d8e34"
      />
    </div>
  );
}