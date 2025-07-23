import { NextResponse } from "next/server";
import { commitTransaction } from "@/backend/actions";
import { APIResponse, HttpStatus } from "@/backend/types";

export async function POST(request: Request): Promise<NextResponse<APIResponse<null | Error>>> {
  try {
    const formData = await request.formData();
    const token_ws = formData.get("token_ws")?.toString();

    if (!token_ws) {
      return NextResponse.json({
        success: false,
        error: "Missing token_ws"
      }, { status: 400 });
    }

    const result = await commitTransaction(token_ws);
    if (!result.success) throw new Error(`error creating webpay transaction`)

    return NextResponse.json<APIResponse<null>>({
      success: true,
      data: null
    }, { status: HttpStatus.OK })

  } catch (error) {
    console.error(error)
    return NextResponse.json<APIResponse<Error>>({
      success: false,
      error: error as string
    }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
}