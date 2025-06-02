import dynamic from "next/dynamic"
import { Loader } from "@/components"

export const LazyVehicleDataModal = dynamic(() =>
  import("../VehicleDataModal").then(mod => mod.VehicleDataModal),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0">
        <Loader bgModal="bg-black/20" bgLoader />
      </div>
    )
  }
)
