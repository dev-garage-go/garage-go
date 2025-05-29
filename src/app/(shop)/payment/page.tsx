import { TopBanner } from "@/features/home";
import { PaymentFormWrapper } from "./ui";

export default function PaymentPage() {
  return (
    <div>
      <TopBanner hasVehicleData />
      <PaymentFormWrapper />
    </div>
  );
}