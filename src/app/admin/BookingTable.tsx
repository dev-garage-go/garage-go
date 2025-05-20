'use client'

import { BookingDB } from "@/database/interfaces/bookings"

interface Props {
  bookings: BookingDB[]
}

export const BookingTable = ({ bookings }: Props) => {
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
        {bookings.map((booking) => (
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
              {booking.appointment.date + " - " + booking.appointment.time}
            </td>

            <td className="table-row-style whitespace-nowrap">
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
        ))}
      </tbody>
    </table>
  )
}
