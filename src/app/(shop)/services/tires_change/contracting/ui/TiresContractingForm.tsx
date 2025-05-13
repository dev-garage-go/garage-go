"use client"

import { useForm } from "react-hook-form";

import { InfoRuedas, Promotion4x3Tires } from "@/assets";
import { QuantityTires, TypesTiresOptions } from "@/interfaces";
import { AddMoreServices, QuantityTiresOptions, TypesTires } from "@/constants";

import { TiresQuantitySelector } from "./TiresQuantitySelector";
import { AddServiceCard, InformationButton, SwitchButton, PromotionCard } from "@/components";

type FormInputs = {
  promotion: boolean;
  quantityTires: QuantityTires;
  typeTires: TypesTiresOptions;
}

export const TiresCheckoutForm = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    shouldFocusError: true,
    defaultValues: {
      promotion: false,
      quantityTires: 0,
      typeTires: 'ciudad'
    }
  })

  const promotion = watch("promotion")
  const quantityTires = watch("quantityTires")
  const typeTires = watch("typeTires")

  const handleTypeTires = (type: TypesTiresOptions) => {
    if (typeTires === type) {
      setValue("typeTires", "ciudad")
    } else {
      setValue("typeTires", type)
    }
  }

  const handleSelectPromotion = (state: boolean) => {
    if (promotion === state) {
      setValue("promotion", false)
    } else {
      setValue("promotion", true)
    }
  }

  const handleSelectQuantityTires = (quantity: QuantityTires) => {
    if (quantityTires === quantity) {
      setValue("quantityTires", 0)
    } else {
      setValue("quantityTires", quantity)
    }
  }

  // Function that will be executed when the form is submitted
  const onSumbit = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <form
      className="border border-customGray-600 rounded-3xl w-full py-4 px-4 md:px-6 lg:px-10 overflow-visible"
      onSubmit={handleSubmit(onSumbit)}
    >
      <section className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-start mb-4">

          {/* Title and subtitle */}
          <div>
            <h4 className="title-h4">Cambio de neumaticos</h4>
            <p className="text-sm text-primaryBlue-900">Configura tu servicio antes de continuar</p>
          </div>

          {/* Promotion 4x3 */}
          <PromotionCard
            title="Promocion 4x3"
            className="mt-4"
            imageSrc={Promotion4x3Tires}
            imageAlt="promocion 4x3 cubiertas"
            promotionChecked={promotion}
            register={register("promotion")}
            handleSelect={() => handleSelectPromotion(true)}
            informationButtonData={{
              text: "Bases y condicionies de la promocion",
              hasModal: true,
              modal: {
                title: "Condiciones",
                description: "Promoción 4x3 aplica a la compra de 3 neumáticos de igual medida y marca. Confirma tu descuento al cotizar.Marcas participantes, Dunlop, Falken, Bridgestone, Goodyear, Sumitomo, Roadx, Ohtsu y Mirage desde aro 15. Sujeto a disponibilidad. Incluye sin costo los servicios de instalación, Super Check, lavado.Retiro y entrega disponible sólo en la Región Metropolitana, sujeto a disponibilidad.No acumulable con otros descuentos o promociones.Promoción válida hasta el 31 de marzo de 2025 o hasta agotar stock.",
              }
            }}
          />
        </div>

        {/* Container - Choose tires quantity and types  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2">

          {/* Quantity */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primaryBlue-900 font-semibold">Cantidad de neumaticos</h4>

            {/* Selects quantity of tires - inputs radios */}
            <div className="flex w-full justify-start gap-8 items-center px-2">
              {QuantityTiresOptions.map((option, index) => (
                <TiresQuantitySelector
                  key={option.label + index}
                  quantity={option.value}
                  checked={quantityTires === option.value}
                  register={register("quantityTires")}
                  onClick={() => handleSelectQuantityTires(option.value)}
                />
              ))}
            </div>
          </div>

          {/* Select tires types - switches buttons */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primaryBlue-900 font-semibold">Uso de los neumaticos</h4>
            {/* Switches */}
            {TypesTires.map(({ label, value }) => (
              <div key={value} className="flex items-center justify-between w-full">
                <span className="text-sm md:text-base">{label}</span>
                <SwitchButton
                  value={value}
                  valueSelected={typeTires}
                  setValueSelected={() => handleTypeTires(value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tires size input */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <h4 className="title-h4">Ingresa tu medida</h4>
          <div className="flex justify-center items-center gap-2 p-2 rounded-xl shadow-lg bg-white w-full ">
            <input
              className="py-2 px-4 border w-full rounded-md bg-gray-100 placeholder-primaryBlue-400 placeholder:font-light placeholder:text-customGray-400"
              placeholder="Ancho / Perfil / Aro"
              type="text"
            />

            <button className="py-2 px-3 md:px-6 lg:px-10 bg-primaryBlue-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-125 transition-all duration-200">
              Aceptar
            </button>
          </div>
          <div className="mt-2">
            <InformationButton
              text="Medida de tus neumaticos"
              hasModal={true}
              modalInfo={{
                imageSrc: InfoRuedas,
                imageAlt: "informacion sobre el rodado de las ruedas"
              }}
            />
          </div>
        </div>

        {/* Add more services */}
        <div className="flex flex-col gap-4 my-10">
          <h4 className="title-h4">¿Quieres agregar algo mas?</h4>

          <div className="flex flex-col gap-6 w-full">
            {AddMoreServices.map((service, index) => (
              <AddServiceCard
                key={service.name + index}
                {...service}
              />
            ))}
          </div>
        </div>
      </section>
    </form>
  )
}
