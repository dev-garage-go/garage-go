import { TopBanner } from "@/components";
import { CheckoutFormWrapper } from "@/components/screens";

export default function TiresChangeCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <CheckoutFormWrapper withBooking={false} />
    </div>
  );
}