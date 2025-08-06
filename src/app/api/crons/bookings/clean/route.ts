import { NextResponse } from "next/server"
import { HttpStatus } from "@/backend/types"
import { purgeOrphanedBookings } from "@/backend/actions"

export async function GET(): Promise<NextResponse> {
  try {
    const result = await purgeOrphanedBookings()
    if (!result.success || !result.data) throw result.error

    return NextResponse.json({
      message: result.data
    }, { status: result.httpStatus })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
}