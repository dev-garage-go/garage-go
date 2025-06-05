import * as React from 'react';
import { ConfirmationBookingEmailInterface } from '@/features/emails';

const domain = process.env.NEXT_PUBLIC_BASE_URL
if (!domain) throw new Error("domain in process.NEXT_PUBLIC_BASE_URL not found")

export const ConfirmationBookingEmail = ({ firstName, service, bookingId }: ConfirmationBookingEmailInterface) => {
  const imgPath = `${domain}/images/garage_go_logo_2.svg`; // Usa una URL absoluta pública

  return (
    <div style={{
      display: "flex",
      justifyContent: "start",
      justifyItems: "start",
      width: '100%',
      fontFamily: "sans-serif"
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: '#1D4ED8',
          borderRadius: '12px', padding: '16px',
          width: '100%'
        }}>
          <img
            src={imgPath}
            alt='logo empresa'
            width="200"
            height="100"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 500 }}>
            ¡Hola {firstName}!
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '16px' }}>
              Queremos confirmarte que tu reserva de <span style={{ fontWeight: 500 }}>{service}</span> se ha realizado con éxito. Estamos encantados de que nos hayas elegido y estamos listos para ofrecerte el mejor servicio.
            </p>
            <p style={{ margin: '40px 0' }}>
              El ID de tu reserva es: <span style={{ fontWeight: 500, color: "#1D4ED8" }}>#{bookingId}</span>
            </p>
          </div>

          <div style={{ backgroundColor: '#EFF6FF', padding: '20px', borderRadius: '12px', width: '100%' }}>
            <p style={{ color: '#404040', fontSize: '14px' }}>
              ¡Gracias por confiar en Garage Go! Nos entusiasma que nos hayas elegido. Estamos listos para ofrecerte el mejor servicio y asegurarnos de que tu experiencia con nosotros sea impecable.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
