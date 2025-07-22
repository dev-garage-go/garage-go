import { NextResponse } from "next/server";
import { APIResponse, HttpStatus } from "@/backend/types";

import { makeCreditCardPayment } from "@/backend/actions";
import { PaymentParamsSchema } from "@/features/payment";

// execute a credit card payment request
export async function POST(request: Request): Promise<NextResponse<APIResponse<null | Error>>> {
  try {
    const body = await request.json()
    const check = PaymentParamsSchema.safeParse(body)
    if (!check.success) throw check.error
    const data = check.data

    const result = await makeCreditCardPayment({ ...data })
    if (!result.success || !result.data) throw new Error(`error making credit card payment: ${result.error}`)
    const payment = result.data

    // data of approve payment
    console.log(payment)

    // const resultUpdated = await updateInitialOrder({ id: orderId, data: updateOrder })
    // if (!result.success) throw resultUpdated.error

    return NextResponse.json<APIResponse<null>>({
      success: true,
      data: null
    }, { status: HttpStatus.CREATED })

  } catch (error) {
    console.error(error)
    return NextResponse.json<APIResponse<Error>>({
      success: false,
      error: error as string
    }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
} 