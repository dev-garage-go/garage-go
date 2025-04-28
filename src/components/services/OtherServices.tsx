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
        <div className='flex flex-col sm:flex-row w-full justify-between items-center'>
          <div className='flex flex-col h-fit w-fit justify-center items-start mr-10'>
            <h3 className='title-h2 font-normal mb-4'>Estos servicios te pueden interesar</h3>
            <Link
              href="/services"
              className="border-primaryBlue-500 text-primaryBlue-500 hover:bg-primaryBlue-600 py-2
                  flex justify-center items-center text-center w-full rounded-md border hover:text-white duration-300">
              Ver todos
            </Link>
          </div>

          <div className='w-2/3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
              {ServicesData.slice(searchServicesFrom, searchServicesTo).map((service, index) => (
                <ServiceCard {...service} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
