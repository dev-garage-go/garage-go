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
import { ServiceNamesMap, ServicesNames } from '@/features/services';

const domain = process.env.NEXT_PUBLIC_BASE_URL
if (!domain) throw new Error("domain in process.NEXT_PUBLIC_BASE_URL not found")

interface Props {
  name: string
  service_name: ServicesNames
  secure_token: string
}

export const OrderEmailComponent = ({ name, secure_token, service_name }: Props) => {
  const imgPath = `${domain}/images/garage_go_email.png`;   // Usa una URL absoluta pública
  const orderStateUrl = `${domain}/orders/${secure_token}`  // path para ver estado de la orden
  const serviceName = ServiceNamesMap[service_name]

  return (
    <Html>
      <Head />
      <Preview>Tu orden en Garage Go ha sido creada con exito</Preview>

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
            <Text style={{ fontSize: '22px', fontWeight: 'bold' }}>¡Hola {name}!</Text>

            <Text style={{ fontSize: '16px', lineHeight: '1.5' }}>
              Queremos confirmarte que tu orden de <strong>{serviceName}</strong> se ha creado con éxito. Estamos encantados de que nos hayas elegido y estamos listos para ofrecerte el mejor servicio.
            </Text>

            <Text style={{ margin: '24px 0', fontSize: '16px' }}>
              Puede visitar el estado de su orden con este link: <strong>{orderStateUrl}</strong>
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