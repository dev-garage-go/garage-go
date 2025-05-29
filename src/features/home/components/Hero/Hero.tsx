import { Mujer } from '@/assets';
import { HeroButtons } from '@/features';
import { CompanyDescription } from '@/constants';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className='py-4 px-2 sm:p-8 xl:p-16'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-12 items-center">
          <div>
            <h1 className="text-4xl uppercase font-bold text-blue-900 leading-tight mb-6">
              HACEMOS MÁS FÁCIL
              <br />
              EL CUIDADO DE TU
              <br />
              AUTO 🚗
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {CompanyDescription}
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <HeroButtons />
            </div>
          </div>

          <div className="relative flex justify-center items-center mt-10 md:mt-0 h-72 sm:h-80 md:h-[450px]">
            <Image
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              src={Mujer}
              alt="Mujer conduciendo feliz"
              className="absolute bottom-0 object-contain w-auto h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};