import { TopBanner } from "@/components";
import { MileageMaintenanceFormWrapper } from "./ui";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <MileageMaintenanceFormWrapper />
    </div>
  );
}