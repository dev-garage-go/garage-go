'use server'

import { cookies } from 'next/headers'
import { AmountInterface } from "@/features/bookings"
import { HttpStatus, ServerActionResponse } from '@/backend/types'

const amountCookieKey = "baseAmunt"

export const setBaseAmountInCookie = async (amount: AmountInterface): Promise<ServerActionResponse<null>> => {
  try {
    const value = JSON.stringify(amount)

    cookies().set(amountCookieKey, value, {
      path: '/',
      secure: true,
      httpOnly: true,   // the use couldn't access by javascript
      sameSite: 'strict',
      maxAge: 60 * 60  // one hour
    })

    return {
      data: null,
      success: true,
      httpStatus: HttpStatus.OK
    }
  } catch (error) {
    return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error as string
    }
  }
}

export const getBaseAmountInCookie = async (): Promise<ServerActionResponse<AmountInterface>> => {
  try {
    const cookieStore = cookies()
    const value = cookieStore.get(amountCookieKey)?.value

    if (!value) return {
      success: false,
      httpStatus: HttpStatus.NOT_FOUND,
      error: "amount cookie not found"
    }

    const amount = await JSON.parse(value)

    return {
      data: amount,
      success: true,
      httpStatus: HttpStatus.OK
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      httpStatus: HttpStatus.NOT_FOUND,
      error: `unexpectec error getting amount cookie: ${error}`
    }
  }
}