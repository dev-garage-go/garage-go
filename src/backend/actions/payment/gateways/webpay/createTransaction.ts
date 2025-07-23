'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { PaymentParamsSchema, PaymentParamsType } from "@/features/payment"

const baseApiUrl = process.env.WEBPAY_API_BASE_URL
if (!baseApiUrl) throw new Error("the enviroment variable WEBPAY_API_URL doesn't exist")

const commerceCode = process.env.WEBPAY_COMMERCE_CODE
if (!commerceCode) throw new Error("the enviroment variable WEBPAY_COMMERCE_CODE doesn't exist")

const apiKey = process.env.WEBPAY_API_KEY
if (!apiKey) throw new Error("the enviroment variable WEBPAY_API_KEY doesn't exist")

export const createTransaction = async (params: PaymentParamsType): Promise<ServerActionResponse<string>> => {
  try {
    const check = PaymentParamsSchema.safeParse(params)
    if (!check.success || !check.data) throw check.error

    // transactions api endopint
    const apiEndpoint = `${baseApiUrl}/rswebpaytransaction/api/webpay/v1.3/transactions`

    const myHeaders = new Headers()
    myHeaders.append('Tbk-Api-Key-Id', `${commerceCode}`)   // special header that Webpay use
    myHeaders.append('Tbk-Api-Key-Secret', `${apiKey}`)     // special header that Webpay use
    myHeaders.append('Content-Type', 'application/json')

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(params)
    })

    if (!response.ok) throw new Error(`webpay api responded with an error, status: ${response.status}`)
    const token = await response.json()


    // TODO: Webpay retorna un token y con este token debemos hacer un commit transaction
    // esto quiere decir que nosotros hacemos una request para solicitar el estado del pago
    console.log(token)

    return {
      success: true,
      data: token,
      httpStatus: HttpStatus.CREATED
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