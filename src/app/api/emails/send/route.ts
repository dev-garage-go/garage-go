// Service to send emails: Resend
// Docs: https://resend.com/docs/send-with-nextjs

import { NextAPIResponse } from '@/backend/types';
import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from '@/features/emails';
import { NextResponse } from 'next/server';
import { CreateEmailResponseSuccess, Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const noReplyDomainEmail = process.env.NO_REPLY_DOMAIN_EMAIL

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

if (!process.env.NO_REPLY_DOMAIN_EMAIL) {
  throw new Error('NO_REPLY_DOMAIN_EMAIL is not defined');
}

export async function POST(request: Request): Promise<NextResponse<NextAPIResponse<CreateEmailResponseSuccess>>> {
  try {
    const body = (await request.json()) as ConfirmationBookingEmailInterface;
    const { bookingId, firstName, service, userEmail } = body

    const isProd = process.env.NODE_ENV === "production";
    let data: CreateEmailResponseSuccess | null;
    let error: Error | null;

    if (isProd) {
      const response = await resend.emails.send({
        from: `GarageGo <${noReplyDomainEmail!}>`,
        to: [userEmail],
        subject: 'Confirmación de reserva',
        react: ConfirmationBookingEmail({ firstName, bookingId, service }),
      });

      data = response.data;
      error = response.error;

    } else {
      const response = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['development@garageservice.cl'], // or can use the resend dashboard email: delivered@resend.dev
        subject: 'Confirmación de reserva',
        react: ConfirmationBookingEmail({ firstName, bookingId, service }),
        headers: {
          'X-Resend-Development-Mode': 'true'
        }
      });

      data = response.data;
      error = response.error;
    }


    if (error) {
      console.log(error)
      return NextResponse.json({
        success: false,
        error: error.message,
      }, {
        status: 500
      });
    }

    return NextResponse.json({
      success: true,
      data: data,
    });

  } catch (err) {
    console.log(err)
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : "unexpected error sending email",
    }, { status: 500 });
  }
}