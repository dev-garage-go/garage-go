import { firstLetterUppercase } from "@/utils";
import { ErrorMessage } from "@/components";

import { getOrderBySecureToken } from "@/backend/actions";

import { OrderStatusDetailMap, OrderStatusMap, PayStatusDetailType, PayStatusType } from "@/features/orders";
import { ServicesTypes, ServiceTypesMap } from "@/features/services";

interface Props {
  params: {
    secure_token: string
  }
}

export default async function OrderSecureTokenPage({ params }: Props) {
  const secureToken = params.secure_token

  const response = await getOrderBySecureToken(secureToken)
  if (!response.success || !response.data) {
    return (
      <div className="new-page max-w-page padding-central-page w-full">
        <ErrorMessage message="No se pueden obtener los datos de su orden" />
      </div>
    )
  }

  const order = response.data

  const paidDate = order.paid_at ? new Date(order.paid_at).toLocaleDateString('es-CL', {
    dateStyle: "long"
  }) : 'No pagado'

  const paidHour = order.paid_at ? new Date(order.paid_at).toLocaleTimeString('es-CL', {
    timeStyle: "short"
  }) : '-';

  const serviceContracted = firstLetterUppercase(ServiceTypesMap[order.external_reference as ServicesTypes])
  const provider = firstLetterUppercase(order.provider.replace("-", " "))
  const paymentStatus = OrderStatusMap[order.pay_status as PayStatusType]
  const paymentStatusDetail = OrderStatusDetailMap[order.pay_status_detail as PayStatusDetailType]

  return (
    <section className="new-page max-w-page padding-central-page w-full">
      <div className="bg-primaryBlue-100 rounded-lg p-6">
        <h1 className="title-h2 font-semibold">Orden: #{order._id.slice(0, 10)}</h1>

        <div className="bg-primaryBlue-50 rounded-lg p-4 mt-4">
          <ul className="flex flex-col gap-2">
            <li>
              <span className="font-medium text-primaryBlue-700">Servicio:</span> {serviceContracted}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Proveedor:</span> <span className="capitalize">{provider}</span>
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Estado del pago:</span> {paymentStatus}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Detalle:</span> {paymentStatusDetail}
            </li>
          </ul>
        </div>

        <div className="bg-primaryBlue-50 rounded-lg p-4 mt-4">
          <ul className="flex flex-col gap-2">
            <li>
              <span className="font-medium text-primaryBlue-700">Subtotal:</span> {order.subtotal.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
              })}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Descuento:</span> {order.disscount.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
              })}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Total:</span> {order.total_price.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
              })}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">ID del pago:</span> {order.payment_id}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">ID de su reserva:</span> {order.booking_id.slice(0, 10)}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Pagado el:</span> {paidDate}
            </li>
            <li>
              <span className="font-medium text-primaryBlue-700">Hora del pago:</span> {paidHour}
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}