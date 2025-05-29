import { TopBanner } from "@/features";
import { TiresContractingWrapper } from "./ui";

export default function TiresCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <TiresContractingWrapper />
    </div>
  );
}