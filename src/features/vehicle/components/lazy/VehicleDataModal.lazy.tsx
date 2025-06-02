import dynamic from "next/dynamic"
import { Loader } from "@/components"
import { sleep } from "@/utils/sleep"

export const LazyVehicleDataModal = dynamic(() =>
  sleep(500).then(() =>
    import("../VehicleDataModal").then(mod => mod.VehicleDataModal)
  ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0">
        <Loader className="bg-primaryBlue-50/90" />
      </div>
    )
  }
)
