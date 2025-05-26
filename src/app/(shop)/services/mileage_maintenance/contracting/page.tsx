import { TopBanner } from "@/components";
import { MileageMaintenanceContractingWrapper } from "./ui";

export default function MileageMaintenanceContractingPage() {
  return (
    <div className="relative">
      <TopBanner hasVehicleData />

      <MileageMaintenanceContractingWrapper />
    </div>
  );
}
