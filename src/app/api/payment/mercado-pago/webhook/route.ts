import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log('🟢 Success WEBHOOK OF APP')

    const body = await request.json()

    console.log('Request:', request)
    console.log('Body:', body)

    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}