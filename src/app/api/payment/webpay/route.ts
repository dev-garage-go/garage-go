import { NextResponse } from "next/server";
import { createTransaction } from "@/backend/actions";
import { APIResponse, HttpStatus } from "@/backend/types";
import { PaymentParamsSchema, PaymentParamsType } from "@/features/payment";

export async function POST(request: Request): Promise<NextResponse<APIResponse<string | Error>>> {
  try {
    const body: PaymentParamsType = await request.json();

    const check = PaymentParamsSchema.safeParse(body)
    if (!check.success || !check.data) throw check.error
    const data = check.data

    const result = await createTransaction(data);
    if (!result.success) throw new Error(`error creating webpay transaction`)
    const token = result.data

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: token
    }, { status: HttpStatus.OK })

  } catch (error) {
    console.error(error)
    return NextResponse.json<APIResponse<Error>>({
      success: false,
      error: error as string
    }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
}