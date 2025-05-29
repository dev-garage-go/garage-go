import { BookingServiceButton, FAQsDisclosure, OtherServices, ServicePageButtons, StepsCard, TopBanner } from '@/features';
import { StepsTechnicalRevision, TechnicalRevisionFAQs } from '@/constants';
import { Mantencion } from '@/assets';

export default function TechnicalRevisionPage() {
  return (
    <div>
      {/* Top banner */}
      <TopBanner
        title='GESTIÓN DE REV. TÉCNICA'
        description='Lo llevamos, la sacamos y te lo llevamos de vuelta con su revisión al día.'
        withImage
        imageSrc={Mantencion}
        imageAlt='playero'
        featuresImages={['pick-delivery', 'super-check']}
      />

      <div className='container-section'>
        <h3 className='title-h3 font-light text-center'>
          Reserva tu gestión de Revisión Técnica
          <br />
          desde los $39.900
        </h3>

        {/* Buttons */}
        <ServicePageButtons />
      </div>

      <section className='container-section'>
        <h2 className='title-h2 font-medium'>¿Como funciona?</h2>
        <p className='description-of-title-h2'>Ahorrate todo el tramite que nosotros lo llevamos por ti.</p>

        <div className='max-w-page padding-central-page grid-steps-central-page'>
          {StepsTechnicalRevision.map((item, index) => (
            <StepsCard {...item} key={index + item.title} />
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