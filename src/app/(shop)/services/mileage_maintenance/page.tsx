import { obtainImage } from '@/assets/helpers';

import { FAQsDisclosure, TopBanner } from '@/features/home';
import {
  ContractingServiceButton,
  OtherServices,
  ServicePageButtons,
  StepsCard,
  StepsMileageMaintenanceData,
  MileageMaintenanceFAQsData
} from '@/features/services';

export default function MileageMaintenancePage() {
  return (
    <div>
      {/* Top banner */}
      <TopBanner
        title='MANTENCIÓN POR KILOMETRAJE'
        description='Mantencion por pauta según el fabricante, tu sevicio incluye retiro y entrega a domicilio, Super check y lavado de cortesía.'
        withImage
        imageSrc={obtainImage('services', 'mantencion')}
        imageAlt='playero'
        featuresImages={['pick-delivery', 'super-check', 'garantia']}
      />

      <div className='container-section'>
        <h3 className='title-h3 font-light text-center'>
          Reserva tu mantención por kilometraje desde los $189.990
          <br />
          Y obtén un 25% De descuento.
        </h3>

        {/* Buttons */}
        <ServicePageButtons />
      </div>

      <section className='container-section'>
        <h2 className='title-h2 font-medium'>¿Como funciona?</h2>
        <p className='description-of-title-h2'>Darle el mejor cuidado a tu auto es muy facil</p>

        <div className='max-w-page padding-central-page grid-steps-central-page'>
          {StepsMileageMaintenanceData.map((item, index) => (
            <StepsCard {...item} key={index + item.title} />
          ))}
        </div>
      </section>

      {/* Title and FAQs section */}
      <section className='container-section max-w-page w-full'>
        <h2 className='title-h2 font-medium text-center'>
          ¿Qué debes saber sobre tu
          <br />
          Mantencion por Kilometraje?
        </h2>

        <div className='faqs-services-pages'>
          {MileageMaintenanceFAQsData.map((faq, index) => (
            <FAQsDisclosure {...faq} key={index + faq.question} />
          ))}
        </div>

        <div className='flex justify-center items-center w-full mb-10 md:mb-28 lg:mb-36 mt-4 md:mt-6'>
          <ContractingServiceButton />
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