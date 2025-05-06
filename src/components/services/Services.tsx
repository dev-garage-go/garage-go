import Image from "next/image";

import { GoogleIcon } from '@/assets';
import { ServiceCard, ViewAllServices } from '@/components';
import { ServicesData } from '@/constants';

export const Services = () => {
  const firstServices = ServicesData.slice(0, 5);
  const extraServices = ServicesData.slice(5);

  return (
    <section>
      <div className="padding-central-page max-w-page">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="title-h2 font-semibold text-primaryBlue-500 mb-4">
            Todos los servicios
            <br />
            que necesita tu auto
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Image
              width={20}
              height={20}
              src={GoogleIcon}
              alt="Google"
              className="object-contain"
            />
            <div className="flex text-yellow-400">
              {"★".repeat(5)}
            </div>
            <span className="text-gray-700 font-medium">4.7</span>
            <span className="text-primaryBlue-500 ml-2 font-medium">Servicios más solicitados</span>
          </div>
        </div>

        {/* Main services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
          {firstServices.slice(0, 3).map((service, index) => (
            <div
              key={index + service.title}
              className={`col-span-1 ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : 'sm:col-span-1'
                }`}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
          <div className="col-span-1 lg:col-span-3">
            <ServiceCard {...firstServices[3]} />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ServiceCard
              {...firstServices[4]}
            />
          </div>
        </div>

        {/* Aditional services as animated block */}
        <ViewAllServices extraServices={extraServices} />
      </div>
    </section>
  );
};
