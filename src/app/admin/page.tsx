
export default function AdminPage() {
  return (
    <section className="min-h-screen w-full bg-neutral-200 p-10">
      <h1 className="title-h3 mb-6 font-semibold">
        Reservas
      </h1>

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
          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-customGray-50 cursor-pointer">

            <td className="table-row-style whitespace-nowrap">
              682ce
            </td>

            <td className="table-row-style whitespace-nowrap">
              Alex Arraga
            </td>

            <td className="table-row-style whitespace-nowrap">
              Mantencion kilometraje
            </td>

            <td className="table-row-style whitespace-nowrap">
              20-07-2025 - 15:00 hs
            </td>

            <td className="table-row-style whitespace-nowrap">
              Chevrolet Tracker LTZ AT - 2019
            </td>

            <td className="table-row-style">
              <div className="flex flex-col items-center justify-center gap-1">
                <span>
                  +56 32180318
                </span>
                <span>
                  arraga.alex@gmail.com
                </span>
              </div>
            </td>

            <td className="table-row-style max-w-40 text-wrap">
              Cordillera 580, Salida Lo Boza Pudahuel
            </td>

          </tr>
        </tbody>

      </table>
    </section>
  );
}