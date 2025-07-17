"use server"

import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { OrderEmailType } from "@/features/emails"

export const sendOrderStateEmail = async ({ email, name, secure_token, service_name }: OrderEmailType): Promise<ServerActionResponse<null>> => {
  try {
    const emailData: OrderEmailType = {
      email,
      name,
      secure_token,
      service_name
    }

    const response = await fetch("/api/emails/order", {
      headers: { 'Content-Type': 'application/json', },
      method: 'POST',
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error("error sending order email to user")
    }

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: null
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