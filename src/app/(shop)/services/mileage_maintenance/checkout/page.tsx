import { TopBanner } from "@/components";
import { CheckoutFormWrapper } from "@/components/screens";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <CheckoutFormWrapper />
    </div>
  );
}