import { NextResponse } from "next/server"
import { insertVehicle } from "@/backend/database/queries"

// create a vehicle in db
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 })
  }

  try {
    const vehicle = await req.json()
    const result = await insertVehicle(vehicle)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    if (!result.data) {
      return NextResponse.json({ found: false, error: "success result but empty data" }, { status: 200 })
    }

    return NextResponse.json({ found: true, vehicle: result.data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}