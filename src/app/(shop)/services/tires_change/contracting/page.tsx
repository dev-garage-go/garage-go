import { TopBanner } from "@/components";
import { TiresContractingWrapper } from "./ui";

export default function TiresCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <TiresContractingWrapper />
    </div>
  );
}