'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { GetnetAuthTokenSchema, GetnetAuthTokenType } from "@/features/payment";

const clientId = process.env.GETNET_CLIENT_ID
if (!clientId) throw new Error("the enviroment variable GETNET_CLIENT_ID doesn't exist")

const clientSecret = process.env.GETNET_CLIENT_SECRET
if (!clientSecret) throw new Error("the enviroment variable GETNET_CLIENT_SECRET doesn't exist")

// obtain an access token to authenticate in Getnet
export async function getAccessToken(): Promise<ServerActionResponse<GetnetAuthTokenType>> {
  try {
    const authUrl = process.env.GETNET_AUTH_API_URL
    if (!authUrl) throw new Error("the enviroment variable GETNET_AUTH_API_URL doesn't exist")

    const token = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Basic ${token}`)

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: myHeaders,
      body: "grant_type=client_credentials",
    })

    if (!response.ok) throw new Error("error fetching authUrl to generate Getnet token")

    // check the getnet response
    const body = await response.json()
    const check = GetnetAuthTokenSchema.safeParse(body)
    if (!check.success) throw Error(`error validating Getnet auth token schema: ${check.error}`)

    const data = check.data

    return {
      success: true,
      data: data,
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