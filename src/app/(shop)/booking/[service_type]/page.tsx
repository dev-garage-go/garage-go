import { TopBanner } from "@/features/home"
import { BookingFormWrapper } from "../ui/BookingFormWrapper"

interface Props {
  params: {
    service_type: string
  }
}

export default function BookingPage({ params }: Props) {
  return (
    <div>
      <TopBanner hasVehicleData />
      <BookingFormWrapper params={params} />
    </div>
  )
}
