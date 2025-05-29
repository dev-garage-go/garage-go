import Image from 'next/image';
import { IoInformationCircleOutline } from 'react-icons/io5';

import { BookingServiceButton, FAQsDisclosure, OtherServices, ServicePageButtons, StepsCard, TopBanner } from '@/features';
import { StepsTiresChange, TiresChangeFAQs } from '@/constants';
import { ChangeTiresPromotion, Mantencion } from '@/assets';

export default function TiresChangePage() {
  return (
    <div>
      {/* Top banner */}
      <TopBanner
        title='CAMBIO DE NEUMÁTICOS'
        description='Cotiza tus neumáticos y obtén sin costo Instalación y balanceo.'
        withImage
        imageSrc={Mantencion}
        imageAlt='playero'
        featuresImages={['pick-delivery', 'super-check', 'garantia']}
      />

      <div className='container-section'>
        <h3 className='title-h3 font-light text-center'>
          Solicita tu cotización, contamos con amplia variedad
          <br />
          Marcas y todas las medidas.
        </h3>

        {/* Buttons */}
        <ServicePageButtons />
      </div>

      <section className='container-section'>
        <h2 className='title-h2 font-medium'>¿Como funciona?</h2>
        <p className='description-of-title-h2'>Cotiza, confirma y nos encargaremos de todo</p>

        <div className='max-w-page padding-central-page grid-steps-central-page'>
          {StepsTiresChange.map((item, index) => (
            <StepsCard {...item} key={index + item.title} />
          ))}
        </div>
      </section>

      {/* Benefits and promotions section */}
      <section className='container-section w-full'>
        <div className='flex flex-col items-center justify-center bg-gray-100 w-full py-10 md:py-16'>
          <h2 className='title-h2'>Beneficios y promociones</h2>
          <p className='description-of-title-h2 mt-4 font-light'>4x3 en neumáticos, más seguridad y más ahorro con Garage Go!</p>

          {/* Main container */}
          <div className='flex flex-col md:flex-row w-full justify-center items-center gap-10 h-full max-w-page mt-10'>
            {/* Image card */}
            <div className="relative h-60 w-60 md:h-80 md:w-80 rounded-3xl bg-white flex items-center justify-center overflow-hidden shadow-xl">
              <div className="relative h-56 w-56 md:w-72 md:h-72 rounded-2xl overflow-hidden">
                <Image
                  fill
                  sizes='calc(min-width: 768px) 288px, 224px'
                  src={ChangeTiresPromotion}
                  alt="promocion de cambio de cubiertas"
                  className="object-cover w-auto h-auto"
                />
              </div>
            </div>

            {/* Text */}
            <div className='flex flex-col justify-start items-center px-6 md:px-0 gap-10'>
              <div>
                <p className='font-medium mb-6'>¿Qué incluye el servicio?</p>
                <div className='flex flex-col gap-4 justify-start items-start px-10 font-light'>
                  <span>Instalación y balanceo para un desempeño óptimo.</span>
                  <span>Super Check de 35 puntos para revisar el estado general de tu auto.</span>
                  <span>Lavado completo para que tu vehículo quede impecable.</span>
                  <span>Pick&delivery: Retiramos tu auto y te lo entregamos listo, sin que tengas que moverte de tu casa u oficina.</span>
                </div>
              </div>

              {/* More information */}
              <div className='flex justify-start items-center gap-2 w-full'>
                <IoInformationCircleOutline
                  size={20}
                  className='text-primaryBlue-500'
                />
                <p className='text-primaryBlue-500 font-light hover:font-normal duration-200 cursor-pointer'>
                  Bases y condiciones de la promocion
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Title and FAQs section */}
      <section className='container-section max-w-page w-full'>
        <h2 className='title-h2 font-medium text-center'>
          ¿Qué debes saber sobre tu
          <br />
          Cambio de neumaticos?
        </h2>

        <div className='faqs-services-pages'>
          {TiresChangeFAQs.map((faq, index) => (
            <FAQsDisclosure {...faq} key={index + faq.question} />
          ))}
        </div>

        <div className='flex justify-center items-center w-full mb-10 md:mb-28 lg:mb-36 mt-4 md:mt-6'>
          <BookingServiceButton />
        </div>
      </section>

      {/* Gray section */}
      <OtherServices
        searchServicesFrom={5}
        searchServicesTo={7}
      />
    </div>
  );
}