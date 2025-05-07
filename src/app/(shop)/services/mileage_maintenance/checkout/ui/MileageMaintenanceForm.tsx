"use client"

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MileageMaintenanceFormInputs } from "@/interfaces";
import { CalendarPicker, ErrorMessage, SchedulePicker, Select } from "@/components";

const addressTypes = [
  { id: 1, value: 'casa' },
  { id: 2, value: 'oficina' },
  { id: 3, value: 'depto' }
]

export const MileageMaintenanceForm = () => {
  const { register, control, formState: { errors } } = useFormContext<MileageMaintenanceFormInputs>()

  const [calendarPicker, setCalendarPicker] = useState(true)
  const [schedulePicker, setSchedulePicker] = useState(false)

  return (
    <div className="form-container">
      <section className="flex flex-col gap-4">
        <h4 className="font-medium text-primaryBlue-900">1. Datos personales</h4>

        {/* Nombre y apellido */}
        <div className="input-form-container mt-4">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4">
              Nombre
            </label>
            <input
              type="text"
              autoFocus
              placeholder="John"
              className={`${errors.user?.name ? "input-form-error" : "input-form"}`}
              {...register("user.name", { required: true })}
            />
            {errors.user?.name && <ErrorMessage message="Se requiere su nombre" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4">
              Apellido
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Doe"
              className={`${errors.user?.lastName ? "input-form-error" : "input-form"}`}
              {...register("user.lastName", { required: true })}
            />
            {errors.user?.lastName && <ErrorMessage message="Se requiere su apellido" className="mt-1 ml-2" />}
          </div>
        </div>

        {/* Telefono y correo  */}
        <div className="input-form-container">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4">
              Telefono
            </label>
            <input
              type="text"
              autoFocus
              placeholder="+56912345678"
              className={`${errors.user?.phone ? "input-form-error" : "input-form"}`}
              {...register("user.phone", { required: true })}
            />
            {errors.user?.phone && <ErrorMessage message="Se requiere su telefono" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4">
              Email
            </label>
            <input
              type="text"
              autoFocus
              placeholder="john-doe@gmail.com"
              className={`${errors.user?.email ? "input-form-error" : "input-form"}`}
              {...register("user.email", { required: true })}
            />
            {errors.user?.email && <ErrorMessage message="Se requiere su email" className="mt-1 ml-2" />}
          </div>
        </div>

        {/* Vehicle data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-end w-full bg-gray-100 rounded-2xl p-4 ">
          <div className="flex flex-col">
            <p className="font-medium text-primaryBlue-900">TGPL67</p>
            <div className="flex justify-between w-full lg:hidden text-primaryBlue-500">
              <p className="text-gray-500">Haval H6 GT</p>
              <p>10.000 kms.</p>
            </div>

          </div>
          <div className="hidden lg:block">
            <p className="font-medium text-primaryBlue-500">10.000 kms.</p>
          </div>
          <div>
            <button className="text-xs mt-4 lg:mt-0 text-primaryBlue-500 hover:font-medium duration-200 transition-all">
              Ingresar otra patente
            </button>
          </div>
        </div>
      </section>

      {/* Calendario y selector de hora */}
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">2. Día y horario</h4>

        {/* Switch calendar and hour */}
        <div className="flex justify-start items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setCalendarPicker(true)
              setSchedulePicker(false)
            }}
            className={`w-full max-w-48 py-3 transition-colors duration-300 rounded-md ${calendarPicker ? 'bg-primaryBlue-900 text-white' : 'bg-white text-primaryBlue-900 border border-primaryBlue-900'}`}>
            Calendario
          </button>
          <button
            type="button"
            onClick={() => {
              setSchedulePicker(true)
              setCalendarPicker(false)
            }}
            className={`w-full max-w-48 py-3 transition-colors duration-300 rounded-md ${schedulePicker ? 'bg-primaryBlue-900 text-white' : 'bg-white text-primaryBlue-900 border border-primaryBlue-900'}`}>
            Horario
          </button>
        </div>

        {
          calendarPicker ? (
            <Controller // controlador de react-hook-form para componentes externos
              name="booking.date" // equivalente a register("booking.date")
              control={control}
              render={({ field }) => (
                <CalendarPicker
                  onChange={field.onChange}
                />
              )}
            >
            </Controller>
          ) : (
            <Controller
              name="booking.time"
              control={control}
              render={({ field }) => (
                <SchedulePicker
                  onChange={field.onChange}
                />
              )}
            >
            </Controller>
          )
        }
      </section>

      {/* Direccion del usuario */}
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">3. Dirección</h4>

        {/* Direccion y tipo de domicilio */}
        <div className="input-form-container">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4">
              Ingresa tu dirección
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Calle, numero y comuna"
              className={`${errors.user?.address ? "input-form-error" : "input-form"}`}
              {...register("user.address", { required: true })}
            />
            {errors.user?.address && <ErrorMessage message="Se requiere su dirección" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full max-w-44 flex-col mb-2">
            <Controller
              name="user.typeAddress"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  label="Selecciona"
                  options={addressTypes}
                />
              )}
            />
          </div>
        </div>

        {/* Info adicional */}
        <div className="input-form-container">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4">
              Información adicional
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Nº depto, oficina, piso"
              className={"input-form"}
              {...register("user.additionalInfo")}
            />
          </div>

          {/* Div vacio para mantener el mismo espacio */}
          <div className="flex w-full" />
        </div>
      </section>
    </div>
  )
}
