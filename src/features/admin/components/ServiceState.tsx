'use client'

import { Select } from "@/components"
import { SelectOptions } from "@/types"
import { useState } from "react"
import { BookingAdmin } from '@/backend/database';
import { ServiceNamesMap } from '@/features/services';

type states = "a ingresar" | "mantenimiento" | "finalizado"


const ServiceStatesOptions: SelectOptions<states>[] = [
  { id: 1, value: "a ingresar" },
  { id: 2, value: "mantenimiento" },
  { id: 3, value: "finalizado" },
]


interface Props {
  booking: BookingAdmin
}

export const ServiceState = ({ booking }: Props) => {
  const [state, setState] = useState<states>("a ingresar")
  const { service, user, vehicle, appointment } = booking;

  const { _id, ...restVehicle } = vehicle;
  const { typeAddress, additionalInfo, ...restUser } = user;

  const handleOnChange = async (newState: states) => {
    setState(newState)

    const data = {
      appointment,
      user: restUser,
      vehicle: restVehicle,
      service: {
        name: ServiceNamesMap[service.name].toLowerCase(),
        state: newState,
      },
    }

    console.log(data)

    const path = process.env.NEXT_PUBLIC_SERVICE_STATE_AGENT_PATH
    console.log(path)
    if (!path) throw new Error("enviroment variable SERVICE_STATE_AGENT_PATH not found");

    const responseWebHook = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(data)
    })

    if (!responseWebHook.ok) throw new Error("unexpected error sending service state data to agent webhook");
    console.log(responseWebHook.ok)
  }

  return (
    <div className="w-full min-w-36">
      <Select
        defaultValue={"-"}
        options={ServiceStatesOptions}
        value={state}
        onChange={(value) => handleOnChange(value)}
      />
    </div>
  )
}
