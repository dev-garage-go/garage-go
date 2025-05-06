import { TopBanner } from "@/components";
import { MileageMaintenanceWrapper } from "./ui";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <MileageMaintenanceWrapper />
    </div>
  );
}