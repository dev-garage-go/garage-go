import { TopBanner } from "@/features";
import { BookingFormWrapper } from "@/features/bookings";

export default function TiresChangeCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <BookingFormWrapper withBooking={false} />
    </div>
  );
}