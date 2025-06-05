// This component use @react-email/components
// Docs: https://react.email/docs/getting-started/manual-setup

import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const domain = process.env.NEXT_PUBLIC_BASE_URL
if (!domain) throw new Error("domain in process.NEXT_PUBLIC_BASE_URL not found")

interface Props {
  firstName: string
  service: string
  bookingId: string
}

export const ConfirmationBookingEmail = ({ firstName, service, bookingId }: Props) => {
  const imgPath = `${domain}/images/garage_go_logo_2.svg`; // Usa una URL absoluta pública

  return (
    <Html>
      <Head />
      <Preview>Tu reserva en Garage Go fue confirmada</Preview>

      <Body style={{ backgroundColor: '#ffffff', margin: 0, padding: 0, fontFamily: "sans-serif" }}>
        <Container style={{ width: "100%", maxWidth: "100%", margin: '0 auto', padding: '10px' }}>
          <Section style={{ backgroundColor: '#1D4ED8', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <Img
              src={imgPath}
              alt="Logo de Garage Go"
              width="200"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Section>

          <Section style={{ marginTop: '32px' }}>
            <Text style={{ fontSize: '22px', fontWeight: 'bold' }}>¡Hola {firstName}!</Text>

            <Text style={{ fontSize: '16px', lineHeight: '1.5' }}>
              Queremos confirmarte que tu reserva de <strong>{service}</strong> se ha realizado con éxito. Estamos encantados de que nos hayas elegido y estamos listos para ofrecerte el mejor servicio.
            </Text>

            <Text style={{ margin: '24px 0', fontSize: '16px' }}>
              El ID de tu reserva es: <strong>#{bookingId}</strong>
            </Text>

            <Section style={{ backgroundColor: '#EFF6FF', padding: '10px', borderRadius: '12px' }}>
              <Text style={{ fontSize: '14px', color: '#404040' }}>
                ¡Gracias por confiar en Garage Go! Nos entusiasma que nos hayas elegido. Estamos listos para ofrecerte el mejor servicio y asegurarnos de que tu experiencia con nosotros sea impecable.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};