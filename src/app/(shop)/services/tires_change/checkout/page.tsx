import { CheckoutFormWrapper, TopBanner } from "@/features";

export default function TiresChangeCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <CheckoutFormWrapper withBooking={false} />
    </div>
  );
}