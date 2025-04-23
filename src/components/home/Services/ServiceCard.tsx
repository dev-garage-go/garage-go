"use client"

import { Garantia, PickDelivery, SuperCheck } from "@/assets";

interface ButtonProps {
  text: string;
  variant: string;
  icon?: string;
}

interface Props {
  title: string;
  price?: number;
  image: string;
  discount?: string;
  features?: string[];
  func: () => void;
  isWide?: boolean;
  buttons?: ButtonProps[];
}

export const ServiceCard = ({
  title,
  price,
  image,
  discount,
  features = [],
  func,
  isWide,
  buttons
}: Props) => {
  const featureIcons: Record<string, string> = {
    'pick-delivery': PickDelivery,
    'super-check': SuperCheck,
    'garantia': Garantia,
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#2D31FA] text-white py-3 px-4 rounded-t-2xl font-medium mb-1">
        {title}
      </div>

      <div className="bg-white rounded-2xl shadow-md flex-1 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          {discount && (
            <span className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {discount}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex gap-4 mb-auto">
            {features.map((feature, index) => (
              <img
                key={index}
                src={featureIcons[feature]}
                alt={feature}
                className="h-6"
              />
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            {buttons ? (
              <>
                <button className="bg-[#1E1B4B] text-white px-6 py-2 rounded-lg font-medium">
                  {buttons[0].text}
                </button>
                <button className="border border-[#2D31FA] text-[#2D31FA] px-6 py-2 rounded-lg hover:bg-blue-50 font-medium flex items-center gap-1">
                  {buttons[1].text}
                  {buttons[1].icon && <span className="text-lg">{buttons[1].icon}</span>}
                </button>
              </>
            ) : (
              <>
                {price && (
                  <div className="bg-[#1E1B4B] text-white px-4 py-2 rounded-lg font-medium mr-auto">
                    Desde $ {price.toLocaleString('es-CL')}
                  </div>
                )}
                <button
                  onClick={func}
                  className="border border-[#2D31FA] text-[#2D31FA] px-6 py-2 rounded-lg hover:bg-blue-50 font-medium flex items-center gap-1"
                >
                  Agendar <span className="text-lg">→</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
