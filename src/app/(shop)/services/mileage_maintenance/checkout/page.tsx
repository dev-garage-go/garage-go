import { TopBanner } from "@/components";
import { CheckoutFormWrapper } from "@/components/screens";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <CheckoutFormWrapper withBooking />
    </div>
  );
}