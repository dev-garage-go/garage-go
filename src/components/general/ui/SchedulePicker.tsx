'use client'

import { Hour, SchedulesOptions } from "@/interfaces"
import { useState } from "react"

interface Props {
}

export const SchedulePicker = ({ }: Props) => {
  const [hourSelected, setHourSelected] = useState<Hour>('9:00')

  return (
    <div className="w-full max-w-sm border rounded-2xl p-4 bg-white shadow-md">
      <h4 className="text-sm font-medium text-primaryBlue-900">Horarios disponibles</h4>

      <div className="relative grid grid-cols-2 w-full gap-4 mt-4 py-2">
        {SchedulesOptions.map((item, index) => (
          <button
            key={item.hour + index}
            onClick={() => setHourSelected(item.hour)}
            className={`w-full h-12 max-w-42 rounded-xl transition-colors duration-300 ${hourSelected === item.hour ?
              'bg-primaryBlue-900 border-none text-white' :
              'bg-white border border-primaryBlue-900 text-primaryBlue-900'}`}
          >
            <p className="text-center font-light">{item.hour + " " + item.type}</p>
          </button>
        ))}
      </div>

      <p className="text-xs text-primaryBlue-500 text-wrap text-start mt-6 mb-2">
        Los horarios con entrega en el mismo dia son horarios am, los horarios pm tienen entrega para el día siguiente.
      </p>
    </div>
  )
}
