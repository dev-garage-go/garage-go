import { CheckoutFormWrapper, TopBanner } from "@/features";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <CheckoutFormWrapper withBooking />
    </div>
  );
}