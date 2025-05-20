'use client'

import { BookingDB } from "@/database/interfaces/bookings"
import dayjs from 'dayjs';

interface Props {
  bookings: BookingDB[]
}

export const BookingTable = ({ bookings }: Props) => {
  if (!bookings) return;

  const formatDate = (data: any): string => {
    const f = dayjs(data).format('DD/MM/YYYY')
    return f
  }

  return (
    <table className="min-w-full">
      <thead className="bg-neutral-100 border-b">
        <tr className=''>
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
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking) => {
          if (!booking) return;

          return (
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-customGray-50 cursor-pointer">

              <td className="table-row-style whitespace-nowrap">
                {booking._id}
              </td>

              <td className="table-row-style whitespace-nowrap">
                {booking.user.name + " " + booking.user.lastName}
              </td>

              <td className="table-row-style whitespace-nowrap">
                {booking.service.name}
              </td>

              <td className="table-row-style whitespace-nowrap">
                <div>
                  <p>{booking.appointment?.date ? formatDate(booking.appointment.date) : 'sin fecha'}</p>
                  <p>{booking.appointment?.time || 'sin hora'}</p>
                </div>
              </td>

              <td className="table-row-style whitespace-nowrap capitalize">
                {booking.vehicle.brand + " " + booking.vehicle.model + " - " + booking.vehicle.year}
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

              <td className="table-row-style max-w-40 text-wrap">
                {booking.user.address}
              </td>

            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
