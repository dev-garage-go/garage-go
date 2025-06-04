import { getBookingsWithVehicleData } from "@/backend/actions";
import { BookingTable } from "@/features/admin";
import { BookingAdmin } from "@/backend/database/types";

export default async function BookingAdminPage() {
  const bookings = await getBookingsWithVehicleData() as BookingAdmin[]

  return (
    <section className="min-h-screen w-full bg-customGray-200 p-10">
      <h1 className="title-h3 mb-6 font-semibold">
        Reservas
      </h1>

      <BookingTable bookings={bookings} />
    </section>
  );
}