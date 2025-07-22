import { NextResponse } from "next/server";
import { APIResponse, HttpStatus } from "@/backend/types";
import { GetnetAuthTokenType, GetnetTokenizationRequestSchema, GetnetTokenizationRequestType, TokenReturnedSchema, TokenReturnedType } from "@/features/payment";

const clientId = process.env.GETNET_CLIENT_ID
if (!clientId) throw new Error("the enviroment variable GETNET_CLIENT_ID doesn't exist")

const clientSecret = process.env.GETNET_CLIENT_SECRET
if (!clientSecret) throw new Error("the enviroment variable GETNET_CLIENT_SECRET doesn't exist")

const domain = process.env.NEXT_PUBLIC_BASE_URL
if (!domain) throw new Error("the enviroment variable NEXT_PUBLIC_BASE_URL doesn't exist")

const envRequest = process.env.NODE_ENV === "production" ? "api" : "sandbox-api"

// generates the token to encrypt the user credit/debit cards
export async function POST(request: Request): Promise<NextResponse<APIResponse<string | Error>>> {
  try {
    // parse the request
    const body: GetnetTokenizationRequestType = await request.json()
    const checkBody = GetnetTokenizationRequestSchema.safeParse(body)
    if (!checkBody.success || !checkBody.data) throw checkBody.error

    const cardNumber = checkBody.data.user_card_number
    const userEmail = checkBody.data.user_email
    const userOrderId = checkBody.data.user_order_id

    // send request to get Getnet auth token
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const authTokenResponse = await fetch(`${domain}/api/payment/getnet/auth`, {
      method: 'POST',
      headers: myHeaders
    })
    const checkAuthToken: APIResponse<GetnetAuthTokenType> = await authTokenResponse.json()
    if (!checkAuthToken.success) throw checkAuthToken.error

    const authToken = checkAuthToken.data?.access_token
    myHeaders.append("Authorization", `Bearer ${authToken}`)

    // send request to encrypt user card
    const res = await fetch(`https://${envRequest}.getnet.com.br/v1/tokens/card`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        card_number: cardNumber,
        customer_id: `${userEmail}:${userOrderId}`,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Tokenization failed:", err);
      throw new Error("Error tokenization user card");
    }

    // zod validation
    const data: TokenReturnedType = await res.json()
    const check = TokenReturnedSchema.safeParse(data)
    if (!check.success || !check.data) throw new Error(`error validating token returned by Getnet: ${check.error}`)

    const numberCardToken = check.data.number_token

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: numberCardToken
    }, { status: HttpStatus.CREATED })

  } catch (error) {
    console.error(error)
    return NextResponse.json<APIResponse<Error>>({
      success: false,
      error: error as string
    }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
}