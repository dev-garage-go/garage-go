import { TopBanner } from "@/components";
import { PaymentFormWrapper } from "./ui";

export default function PaymentPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <PaymentFormWrapper />
    </div>
  );
}