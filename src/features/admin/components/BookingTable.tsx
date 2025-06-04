'use client'

import { BookingAdmin } from "@/backend/database/types/bookings"
import { ServiceNamesMap } from "@/features/services";
import dayjs from 'dayjs';

import { formatNumberWithDots } from '@/utils';
import { useAdminGuard } from "@/features/admin/hooks/useAdminGuard";

interface Props {
  bookings: BookingAdmin[]
}

export const BookingTable = ({ bookings }: Props) => {
  useAdminGuard()

  if (!bookings) return (
    <div>
      Error obteniendo las reservas
    </div>
  )

  const formatDate = (data: any): string => {
    const f = dayjs(data).format('DD/MM/YYYY')
    return f
  }

  return (
    <table className="min-w-full">
      <thead className="border-b">
        <tr>
          <th scope="col" className="table-col-style">
            #ID
          </th>
          <th scope="col" className="table-col-style">
            Nombre completo
          </th>
          <th scope="col" className="table-col-style">
            Servicio
          </th>
          <th scope="col" className="table-col-style">
            Fecha y hora
          </th>
          <th scope="col" className="table-col-style">
            Vehiculo
          </th>
          <th scope="col" className="table-col-style">
            Contacto
          </th>
          <th scope="col" className="table-col-style">
            Dirección
          </th>
          <th scope="col" className="table-col-style">
            Total
          </th>
          {/* TODO: Habilitar columna de estado */}
          {/* <th scope="col" className="table-col-style">
            Estado
          </th> */}
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking) => {
          return (
            <tr
              key={booking._id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-primaryBlue-50 hover:brightness-110 cursor-pointer">

              <td className="table-row-style whitespace-nowrap">
                #{booking._id?.slice(0, 8)}
              </td>

              <td className="table-row-style whitespace-nowrap">
                {booking.user.name + " " + booking.user.lastName}
              </td>

              <td className="table-row-style whitespace-nowrap">
                {ServiceNamesMap[booking.service.name]}
              </td>

              <td className="table-row-style whitespace-nowrap">
                <div>
                  <p>{booking.appointment?.date ? formatDate(booking.appointment.date) : '-'}</p>
                  <p>{booking.appointment?.time || ''}</p>
                </div>
              </td>

              <td className="table-row-style text-wrap capitalize">
                {booking.vehicle.brand + " " + booking.vehicle.model}
                <br />
                {booking.vehicle.year}
              </td>

              <td className="table-row-style">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span>
                    {booking.user.phone}
                  </span>
                  <span>
                    {booking.user.email}
                  </span>
                </div>
              </td>

              <td className="table-row-style text-wrap">
                {booking.user.address}
              </td>

              <td className="table-row-style text-wrap font-semibold">
                $ {formatNumberWithDots(booking.amount.total)}
              </td>

              {/* TODO: Habilitar columna de estado */}
              {/* <td className="table-row-style text-wrap font-semibold">
                <PayState state="refunded" />
              </td> */}

            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
