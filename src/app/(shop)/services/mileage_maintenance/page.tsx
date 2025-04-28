import { FAQsDisclosure, OtherServices, ServicePageButtons, StepsCard, TopBanner } from '@/components';
import { MileageMaintenanceFAQs, StepsMileageMaintenance } from '@/constants';
import { Mantencion } from '@/assets';

export default function MileageMaintenancePage() {
  return (
    <div>
      {/* Top banner */}
      <TopBanner
        title='MANTENCIÓN POR KILOMETRAJE'
        description='Mantencion por pauta según el fabricante, tu sevicio incluye retiro y entrega a domicilio, Super check y lavado de cortesía.'
        withImage
        imageSrc={Mantencion}
        imageAlt='playero'
        featuresImages={['pick-delivery', 'super-check', 'garantia']}
      />

      <div className='container-section'>
        <h3 className='title-h3 text-center'>
          Reserva tu mantención por kilometraje desde los $189.990
          <br />
          Y obtén un 25% De descuento.
        </h3>

        {/* Buttons */}
        <ServicePageButtons />
      </div>

      <section className='container-section'>
        <h2 className='title-h2 font-semibold'>¿Como funciona?</h2>
        <p className='description-of-title-h2'>Darle el mejor cuidado a tu auto es muy facil</p>

        <div className='max-w-page padding-central-page grid-steps-central-page'>
          {StepsMileageMaintenance.map((item, index) => (
            <StepsCard {...item} key={index} />
          ))}
        </div>
      </section>

      {/* Title and FAQs section */}
      <section className='container-section max-w-page w-full'>
        <h2 className='title-h2 font-semibold text-center'>
          ¿Qué debes saber sobre tu
          <br />
          Mantencion por Kilometraje?
        </h2>

        <div className='faqs-services-pages'>
          {MileageMaintenanceFAQs.map((faq, index) => (
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
        searchServicesFrom={3}
        searchServicesTo={5}
      />
    </div>
  );
}