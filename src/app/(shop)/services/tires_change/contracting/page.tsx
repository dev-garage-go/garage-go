import { TopBanner } from "@/features/home";
import { TiresContractingWrapper } from "./ui";

export default function TiresCheckoutPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <TiresContractingWrapper />
    </div>
  );
}