import { TopBanner } from "@/components";
import { MileageCheckoutFormWrapper } from "./ui";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <MileageCheckoutFormWrapper />
    </div>
  );
}