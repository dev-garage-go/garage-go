import { TopBanner } from "@/features/home";
import { PaymentFormWrapper } from "./ui";
import { redirect } from "next/navigation";


export default function PaymentPage() {
  // guard
  redirect("/")

  return (
    <div>
      <TopBanner hasVehicleData />
      <PaymentFormWrapper />
    </div>
  );
}