import { TopBanner } from "@/features/home";
import { TiresContractingWrapper } from "./ui";
import { redirect } from "next/navigation";

export default function TiresCheckoutPage() {
  // guard
  redirect("/services")

  return (
    <div>
      <TopBanner hasVehicleData />
      <TiresContractingWrapper />
    </div>
  );
}