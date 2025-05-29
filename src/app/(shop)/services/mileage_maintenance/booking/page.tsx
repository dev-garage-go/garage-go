import { TopBanner } from "@/features/home";
import { BookingFormWrapper } from "@/features/bookings";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <BookingFormWrapper withBooking />
    </div>
  );
}