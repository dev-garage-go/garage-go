import { getBookingsWithVehicleData } from "@/backend/actions";
import { BookingTable } from "@/features/admin";

export default async function BookingAdminPage() {
  const response = await getBookingsWithVehicleData()

  if (!response.success) return; // show toast with error message
  const bookings = response.data

  return (
    <section className="min-h-screen w-full bg-customGray-200 p-10">
      <h1 className="title-h3 mb-6 font-semibold">
        Reservas
      </h1>

      <BookingTable bookings={bookings} />
    </section>
  );
}