import { TopBanner } from "@/components";
import { MileageMaintenanceForm, MileageMaintenanceSummary } from "./ui";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
        {/* Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
          {/* Form to complete data */}
          <MileageMaintenanceForm />

          {/* Summary */}
          <MileageMaintenanceSummary />
        </div>
      </section>
    </div>
  );
}