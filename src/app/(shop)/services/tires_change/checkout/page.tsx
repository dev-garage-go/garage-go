import { TopBanner } from "@/features";
import { CheckoutFormWrapper } from "@/components/screens";

export default function TiresChangeCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <CheckoutFormWrapper withBooking={false} />
    </div>
  );
}