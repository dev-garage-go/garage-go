import { NextResponse } from "next/server"
import { findVehicleByLicensePlate } from "@/backend/database/queries"

export async function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 })
  }

  try {
    const { licensePlate } = await req.json()
    const result = await findVehicleByLicensePlate(licensePlate)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    if (!result.data) {
      return NextResponse.json({ found: false }, { status: 200 })
    }

    return NextResponse.json({ found: true, vehicle: result.data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
