// Service to send emails: Resend
// Docs: https://resend.com/docs/send-with-nextjs

import { HttpStatus, NextAPIResponse, ServerActionResponse } from '@/backend/types';
import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from '@/features/emails';
import { NextResponse } from 'next/server';
import { CreateEmailResponseSuccess, ErrorResponse, Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domainEmail = process.env.DOMAIN_EMAIL

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

if (!process.env.DOMAIN_EMAIL) {
  throw new Error('DOMAIN_EMAIL is not defined');
}

export async function POST(request: Request): Promise<NextResponse<NextAPIResponse<CreateEmailResponseSuccess>>> {
  try {
    const body = (await request.json()) as ConfirmationBookingEmailInterface;
    const { bookingId, firstName, service, userEmail } = body

    // ! To prod
    // const { data, error } = await resend.emails.send({
    //   from: domainEmail!,
    //   to: [userEmail],
    //   subject: 'Confirmación de reserva',
    //   react: ConfirmationBookingEmail({ firstName, bookingId, service }),
    // });

    // ! To testing
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['development@garageservice.cl'], // or can use the resend dashboard email: delivered@resend.dev
      subject: 'Confirmación de reserva',
      react: ConfirmationBookingEmail({ firstName, bookingId, service }),
      headers: {
        'X-Resend-Development-Mode': 'true'
      }
    });

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