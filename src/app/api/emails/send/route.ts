import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from '@/features/emails';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ConfirmationBookingEmailInterface;
    const { bookingId, firstName, service } = body

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      // to: ['delivered@resend.dev'],
      to: ['development@garageservice.cl'],
      subject: 'Confirmación de reserva',
      react: ConfirmationBookingEmail({ firstName, bookingId, service }),
      headers: {
        'X-Resend-Development-Mode': 'true'
      }
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}