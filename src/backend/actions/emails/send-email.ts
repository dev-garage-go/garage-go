"use server"

import { ErrorInterface, User, HttpStatus } from "@/interfaces"
import sgMail from '@sendgrid/mail'

export const sendEmailAction = async ({ email, name, lastName }: User): Promise<ErrorInterface> => {
  const fullName = name + " " + lastName
  const message = "Algo a redactar"

  const apiKey = process.env.SENDGRID_API_KEY
  const domain = process.env.NEXT_PUBLIC_BASE_URL

  // TODO: if (!apiKey) {
  //   throw new Error('SendGrid API Key not founded in process.env.SENDGRID_API_KEY')
  // }

  if (!domain) {
    throw new Error('Domain API Key not founded in process.env.NEXT_PUBLIC_BASE_URL')
  }

  sgMail.setApiKey(apiKey!)

  const msg = {
    to: 'tucorreo@tudominio.com',            // destinatario
    from: `no-reply@${domain}`,          // remitente verificado en SendGrid
    subject: `Nuevo mensaje de ${fullName}`,
    text: message,
    html: `<p><strong>Nombre:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message}</p>`,
  }

  try {
    await sgMail.send(msg)
    return {
      success: true,
      errorMessage: null,
      status: HttpStatus.OK
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      errorMessage: `Error sending email to user: ${error}`,
      status: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}