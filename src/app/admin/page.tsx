import { getBookings } from "@/actions";
import { BookingTable } from "./BookingTable";
import { BookingDB } from "@/database/interfaces";

export default async function AdminPage() {
  const bookings = await getBookings() as BookingDB[]

  return (
    <section className="min-h-screen w-full bg-neutral-200 p-10">
      <h1 className="title-h3 mb-6 font-semibold">
        Reservas
      </h1>

      <BookingTable bookings={bookings} />
    </section>
  );
}