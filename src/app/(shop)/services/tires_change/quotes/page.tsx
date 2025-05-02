import { TopBanner } from "@/components";
import { QuotesForm, QuotesSummary } from "./ui";

export default function TiresQuotesPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
          <QuotesForm />
          <QuotesSummary />
        </div>
      </section>
    </div>
  );
}