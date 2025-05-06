import Link from 'next/link'
import { ServiceCard } from './ServiceCard'
import { ServicesData } from '@/constants'

interface Props {
  searchServicesFrom: number
  searchServicesTo: number
}

export const OtherServices = ({ searchServicesFrom, searchServicesTo }: Props) => {
  return (
    <section className='container-section pb-from-footer w-full bg-gray-200'>
      <div className='w-full max-w-page'>
        <div className='flex flex-col lg:flex-row w-full justify-between items-center'>

          <div className='flex flex-col  lg:h-fit lg:w-fit justify-center items-start lg:mr-10'>
            <h3 className='title-h2 font-normal mb-4'>Estos servicios te pueden interesar</h3>
            <Link
              href="/services"
              className="hidden lg:flex border-primaryBlue-500 text-primaryBlue-500 hover:bg-primaryBlue-600 py-2
              justify-center items-center text-center w-full rounded-lg border hover:text-white duration-300">
              Ver todos
            </Link>
          </div>

          <div className='lg:w-2/3'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {ServicesData.slice(searchServicesFrom, searchServicesTo).map((service, index) => (
                <ServiceCard {...service} key={index + service.title} />
              ))}
            </div>
          </div>

          <Link
            href="/services"
            className="flex lg:hidden mt-10 border-primaryBlue-500 text-primaryBlue-500 hover:bg-primaryBlue-600 py-2
              px-10 justify-center items-center text-center rounded-lg border hover:text-white duration-300">
            Ver todos
          </Link>
        </div>
      </div>
    </section>
  )
}
