import { TopBanner } from "@/components";

export default function MileageMaintenanceCheckoutPage() {
  return (
    <div>
      <TopBanner
        hasVehicleData
        vehicleName="Haval H6 GT"
        vehiclePatent="TGPL67"
      />

      <section className="container-section max-w-page w-full">
        {/* Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          {/* Form to complete data */}
          <form className="border border-gray-900 rounded-2xl w-full py-4 px-10">
            <h4>1. Datos personales</h4>

            <label></label>
            <input>
            </input>


          </form>

          {/* Summary */}
          <div className="w-full bg-red-50 h-80">

          </div>
        </div>
      </section>
    </div>
  );
}