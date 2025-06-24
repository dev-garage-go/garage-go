import { getBookingsWithVehicleData } from "@/backend/actions";
import { RefreshButton } from "@/components";
import { BookingTable } from "@/features/admin";
import { redirect } from "next/navigation";

// force that next not caching the page
export const dynamic = 'force-dynamic';

export default async function BookingAdminPage() {
  const response = await getBookingsWithVehicleData()

  if (!response.success || !response.data) {
    console.error(response.error)
    redirect('/admin')
  };

  const bookings = response.data.length > 0 ? response.data : []

  return (
    <section className="min-h-screen w-full bg-customGray-200 p-10">
      <h1 className="title-h3 mb-6 font-semibold">
        Reservas
      </h1>

      <div className="mt-10 mb-4">
        <RefreshButton />
      </div>

      <BookingTable bookings={bookings} />
    </section>
  );
}