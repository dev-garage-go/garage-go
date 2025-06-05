import { obtainLogo } from '@/assets/helpers'
import Image from 'next/image'
import { ConfirmationBookingEmailInterface } from '@/features/emails'

export const ConfirmationBookingEmail = ({ firstName, service, bookingId }: ConfirmationBookingEmailInterface) => {
  return (
    <div className='w-full bg-white max-w-7xl p-20'>
      <div className='bg-primaryBlue-500 rounded-xl p-4 w-full'>
        <Image
          src={obtainLogo("company", "logoFooter")}
          alt='logo empresa'
          width={200}
          height={100}
          className='object-contain'
        />
      </div>

      <div className='flex flex-col mt-10 gap-4'>
        <h1 className='title-h2 font-medium'>
          ¡Hola {firstName}!
        </h1>

        <div className='flex flex-col'>
          <p className='text-base'>
            Queremos confirmarte que tu reserva de <span className='font-medium'>{service}</span> se ha realizado con éxito. Estamos encantados de que nos hayas elegido y estamos listos para ofrecerte el mejor servicio.  ha sido confirmada con exito.
          </p>
          <p className='my-10'>
            El ID de tu reserva es: <span className='font-medium'>#{bookingId}</span>
          </p>
        </div>

        <div className='bg-primaryBlue-50/50 w-full px-6 py-10 rounded-xl'>
          <p className='text-neutral-700 text-sm'>
            ¡Gracias por confiar en Garage Go! Nos entusiasma que nos hayas elegido. Estamos listos para ofrecerte el mejor servicio y asegurarnos de que tu experiencia con nosotros sea impecable.
          </p>
        </div>
      </div>
    </div>
  )
}
