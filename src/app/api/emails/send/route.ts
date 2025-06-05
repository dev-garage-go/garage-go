import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from '@/features/emails';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domainEmail = process.env.DOMAIN_EMAIL

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

if (!process.env.DOMAIN_EMAIL) {
  throw new Error('DOMAIN_EMAIL is not defined');
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ConfirmationBookingEmailInterface;
    const { bookingId, firstName, service, userEmail } = body

    const { data, error } = await resend.emails.send({
      from: domainEmail!,
      to: [userEmail],
      subject: 'Confirmación de reserva',
      react: ConfirmationBookingEmail({
        userEmail,
        firstName,
        bookingId,
        service
      }),
    });

    // const { data, error } = await resend.emails.send({
    //   from: 'Acme <onboarding@resend.dev>',
    //   // to: ['delivered@resend.dev'],
    //   to: [userEmail],
    //   subject: 'Confirmación de reserva',
    //   react: ConfirmationBookingEmail({ firstName, bookingId, service }),
    //   headers: {
    //     'X-Resend-Development-Mode': 'true'
    //   }
    // });

    if (error) {
      console.log(error)
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}