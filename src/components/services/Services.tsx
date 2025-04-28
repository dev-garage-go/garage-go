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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {firstServices.slice(0, 3).map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="md:col-span-3">
            <ServiceCard {...firstServices[3]} />
          </div>
          <div className="md:col-span-2">
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
