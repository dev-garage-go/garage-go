import { TopBanner } from "@/features/home";
import { PaymentFormWrapper } from "./ui";
import { redirect } from "next/navigation";


export default function PaymentPage() {
  // guard
  if (process.env.NODE_ENV === 'production') {
    redirect("/")
  }

  return (
    <div>
      <TopBanner hasVehicleData />
      <PaymentFormWrapper />
    </div>
  );
}