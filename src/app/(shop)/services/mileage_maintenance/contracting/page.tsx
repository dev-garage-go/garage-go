import { TopBanner } from "@/components";
import { MileageMaintenanceContractingWrapper } from "./ui";

export default function MileageMaintenanceContractingPage() {
  return (
    <div className="relative">
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <MileageMaintenanceContractingWrapper />
    </div>
  );
}
