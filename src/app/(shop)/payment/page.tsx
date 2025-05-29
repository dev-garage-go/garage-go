import { TopBanner } from "@/features";
import { PaymentFormWrapper } from "./ui";

export default function PaymentPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <PaymentFormWrapper />
    </div>
  );
}