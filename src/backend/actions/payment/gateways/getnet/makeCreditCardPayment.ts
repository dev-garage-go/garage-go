'use server'

// Docs in: https://docs.globalgetnet.com/es/products/online-payments/web-checkout/swagger#tag/payment-intent/POST/payment-intent

import { tokenizeCard } from "./tokenization";
import { getAccessToken } from "./getAccessToken";
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { GetnetCreditPaymentResponseSchema, GetnetCreditPaymentResponseType, PaymentParamsType } from "@/features/payment";

const env = process.env.GETNET_ENV === "production" ? "api" : "sandbox-api";

const selledId = process.env.GETNET_SELLER_ID;
if (!selledId) throw new Error("the enviroment variable GETNET_SELLER_ID doesn't exist")

export async function makeCreditCardPayment(params: PaymentParamsType): Promise<ServerActionResponse<GetnetCreditPaymentResponseType>> {
  try {
    const token = await getAccessToken();
    const numberToken = await tokenizeCard({
      user_card_number: params.cardNumber,
      user_email: params.userEmail,
      user_order_id: params.userOrderId
    });

    const payload = {
      seller_id: selledId,
      amount: params.amount,
      order: {
        order_id: `${params.userOrderId}`,
      },
      customer: {
        customer_id: params.customerId,
        first_name: "Test",
        last_name: "User",
      },
      device: {
        ip_address: "127.0.0.1",
      },
      credit: {
        delayed: false,
        pre_authorization: false,
        save_card_data: false,
        transaction_type: "FULL",
        number_installments: 1,
        card: {
          number_token: numberToken,
          cardholder_name: params.cardHolderName,
          expiration_month: params.expirationMonth,
          expiration_year: params.expirationYear,
          security_code: params.securityCode,
        },
      },
    };

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    const res = await fetch(`https://${env}.getnet.com.br/v1/payments/credit`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Error en el pago:", error);
      throw new Error("Error al realizar el pago");
    }

    const body = await res.json()
    const check = GetnetCreditPaymentResponseSchema.safeParse(body)
    if (!check.success || !check.data) throw check.error

    return {
      success: true,
      data: check.data,
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
