import { FAQsDisclosure, OtherServices, ServicePageButtons, StepsCard, TopBanner } from '@/components';
import { StepsTechnicalRevision, TechnicalRevisionFAQs } from '@/constants';
import { Mantencion } from '@/assets';

export default function OilAndFilterChangePage() {
  return (
    <div>
      {/* Top banner */}
      <TopBanner
        title='CAMBIO DE ACEITE Y FILTRO'
        description='Asegura la vida de tu motor con el lubricante correcto y su cambio de filtro'
        withImage
        imageSrc={Mantencion}
        imageAlt='playero'
        featuresImages={['pick-delivery', 'garantia']}
      />

      <div className='container-section'>
        <h3 className='title-h3 font-light text-center'>
          Reserva tu cambio de aceite
          <br />
          desde los $78.990
        </h3>

        {/* Buttons */}
        <ServicePageButtons />
      </div>

      <section className='container-section'>
        <h2 className='title-h2 font-medium'>¿Como funciona?</h2>
        <p className='description-of-title-h2'>Tu cambio de aceite y filtro, tal como lo exige el fabricante.</p>

        <div className='max-w-page padding-central-page grid-steps-central-page'>
          {StepsTechnicalRevision.map((item, index) => (
            <StepsCard {...item} key={index} />
          ))}
        </div>
      </section>

      {/* Title and FAQs section */}
      <section className='container-section max-w-page w-full'>
        <h2 className='title-h2 font-medium text-center'>
          ¿Qué debes saber sobre tu
          <br />
          Gestión de Revisión Técnica?
        </h2>

        <div className='faqs-services-pages'>
          {TechnicalRevisionFAQs.map((faq, index) => (
            <FAQsDisclosure {...faq} key={index} />
          ))}
        </div>

        <div className='flex justify-center items-center w-full mb-10 mt-4'>
          <button className='text-sm sm:text-base bg-primaryBlue-900 rounded-md px-10 sm:px-14 md:px-20 py-2 text-center text-white'>
            Agenda Ahora
          </button>
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