import { ConfirmationBookingEmail, ConfirmationBookingEmailInterface } from '@/features/emails';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ firstName, service, bookingId }: ConfirmationBookingEmailInterface) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['test@resend.dev'],
      subject: 'Hello world',
      react: ConfirmationBookingEmail({ firstName, bookingId, service }),
      headers: {
        'X-Resend-Development-Mode': 'true'
      }
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}