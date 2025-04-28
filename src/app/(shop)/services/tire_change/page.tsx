import { FAQsDisclosure, OtherServices, ServicePageButtons, StepsCard, TopBanner } from '@/components';
import { StepsTiresChange, TechnicalRevisionFAQs } from '@/constants';
import { Mantencion } from '@/assets';

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

      {/* TODO: Benefits and promotions section */}


      {/* Title and FAQs section */}
      <section className='container-section max-w-page w-full'>
        <h2 className='title-h2 font-medium text-center'>
          ¿Qué debes saber sobre tu
          <br />
          Cambio de neumaticos?
        </h2>

        <div className='faqs-services-pages'>
          {TechnicalRevisionFAQs.map((faq, index) => (
            <FAQsDisclosure {...faq} key={index + faq.question} />
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