'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { GetnetTokenizationRequestType, TokenReturnedSchema, TokenReturnedType } from "@/features/payment";
import { getAccessToken } from "./getAccessToken";

const clientId = process.env.GETNET_CLIENT_ID
if (!clientId) throw new Error("the enviroment variable GETNET_CLIENT_ID doesn't exist")

const clientSecret = process.env.GETNET_CLIENT_SECRET
if (!clientSecret) throw new Error("the enviroment variable GETNET_CLIENT_SECRET doesn't exist")

const domain = process.env.NEXT_PUBLIC_BASE_URL
if (!domain) throw new Error("the enviroment variable NEXT_PUBLIC_BASE_URL doesn't exist")

const envRequest = process.env.NODE_ENV === "production" ? "api" : "sandbox-api"

// generates the token to encrypt the user credit/debit cards
export async function tokenizeCard({ user_card_number, user_email, user_order_id }: GetnetTokenizationRequestType): Promise<ServerActionResponse<string>> {
  try {
    const response = await getAccessToken()
    if (!response.success || !response.data) throw response.error
    const accessToken = response.data.access_token

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${accessToken}`)

    // send request to encrypt user card
    const res = await fetch(`https://${envRequest}.getnet.com.br/v1/tokens/card`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        card_number: user_card_number,
        customer_id: `${user_email}:${user_order_id}`,
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

    return {
      success: true,
      data: numberCardToken,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error as string,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}