'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"

const baseApiUrl = process.env.WEBPAY_API_BASE_URL
if (!baseApiUrl) throw new Error("the enviroment variable WEBPAY_API_URL doesn't exist")

const commerceCode = process.env.WEBPAY_COMMERCE_CODE
if (!commerceCode) throw new Error("the enviroment variable WEBPAY_COMMERCE_CODE doesn't exist")

const apiKey = process.env.WEBPAY_API_KEY
if (!apiKey) throw new Error("the enviroment variable WEBPAY_API_KEY doesn't exist")

export const commitTransaction = async (token: string): Promise<ServerActionResponse<null>> => {
  try {
    // commit endpoint
    const apiEndpoint = `${baseApiUrl}/rswebpaytransaction/api/webpay/v1.3/transactions/${token}`

    const myHeaders = new Headers()
    myHeaders.append('Tbk-Api-Key-Id', `${commerceCode}`)   // special header that Webpay use
    myHeaders.append('Tbk-Api-Key-Secret', `${apiKey}`)     // special header that Webpay use
    myHeaders.append('Content-Type', 'application/json')

    const response = await fetch(apiEndpoint, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(null)
    })

    if (!response.ok) throw new Error(`webpay api responded with an error, status: ${response.status}`)
    const data = await response.json()

    console.log(data)
    // TODO: Update application order

    return {
      success: true,
      data: null,
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