import { TopBanner } from "@/features/home";
import { BookingFormWrapper } from "@/features/bookings";

export default function TiresChangeCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <BookingFormWrapper withBooking={false} />
    </div>
  );
}