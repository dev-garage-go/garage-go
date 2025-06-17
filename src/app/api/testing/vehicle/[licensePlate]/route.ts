import { deleteVehicle, findVehicleByLicensePlate } from "@/backend/database/queries"
import { NextResponse } from "next/server"

interface Params {
  params: { licensePlate: string }
}

// find a vehicle in db
export async function GET(_: Request, { params }: Params) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 })
  }

  try {
    const result = await findVehicleByLicensePlate(params.licensePlate)

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

// delete a vehicle in db
export async function DELETE(_: Request, { params }: Params) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 })
  }

  try {
    const result = await deleteVehicle(params.licensePlate)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
