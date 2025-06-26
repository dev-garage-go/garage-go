// Este componente es un calendario basado en Ant Design - https://ant.design/components/calendar#calendar-demo-customize-header
// - Usa `antd` para la lógica y estructura de calendario.
// - Usa `dayjs` para comparar y formatear fechas (esto lo usa internamente ant para manejar fechas).
// - Se customiza completamente con Tailwind, sin global.css.
// - Se sobrescribe el renderizado de cada celda con `fullCellRender()`.
// - El día actual se marca con fondo azul claro (bg-primaryBlue-50 text-customGray-600).
// - El día seleccionado dinámicamente se marca con fondo azul oscuro (bg-primaryBlue-900 text-white).
// - El evento hover se marca con fondo gris claro, solo se habilita a partir
//     del breakpoint md, para evitar el hover el dispositivos mobiles (hover:bg-customGray-100)
// - Se adapta a dispositivos pequeños con clases Tailwind como `max-w-sm`.
// - El formato de fechas esta en español y es DD-MM-YYY. Ej: 09-05-2025

'use client';

import { useState } from 'react';
import { ErrorMessage } from '@/components';

import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

import { ConfigProvider, Calendar, Typography } from 'antd';
import type { CalendarProps } from 'antd';
import esES from 'antd/es/locale/es_ES';

dayjs.extend(localeData);
dayjs.locale('es');


interface Props {
  selectedDate: Dayjs | null
  onChange: (value: Dayjs | string) => void
  error?: string
}

export const CalendarPicker = ({ onChange, error, selectedDate }: Props) => {
  const [panelDate, setPanelDate] = useState(dayjs());

  const disabledDate = (current: Dayjs) => {
    const max = dayjs().add(1, 'month').endOf('month');
    const today = dayjs().startOf('day');
    return current.isBefore(today) || current.isAfter(max);
  };

  const onSelect: CalendarProps<Dayjs>['onSelect'] = (date) => {
    const isoString = date.toISOString()
    onChange(isoString)
  };

  return (
    <ConfigProvider locale={esES}>
      {error && (<ErrorMessage message={error} className='mt-1 ml-2' />)}
      <div className='w-full max-w-sm border rounded-2xl p-4 bg-white shadow-md'>
        <Typography.Text className="block mb-2 font-semibold text-primaryBlue-900">
          Días disponibles
        </Typography.Text>
        <Calendar
          value={panelDate}
          disabledDate={disabledDate}
          fullscreen={false}
          onSelect={onSelect}
          onPanelChange={(v) => setPanelDate(v)}
          headerRender={({ value }) => (
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={() => setPanelDate(value.clone().subtract(1, 'month'))}
              >
                ‹
              </button>
              <span className="font-medium capitalize">
                {value.format('MMMM YYYY')}
              </span>
              <button
                type="button"
                onClick={() => setPanelDate(value.clone().add(1, 'month'))}
              >
                ›
              </button>
            </div>
          )}

          fullCellRender={(current) => {
            const isDisabled = disabledDate(current);
            const isSelected = selectedDate ? selectedDate.isSame(current, 'day') : null;
            const isToday = current.isSame(dayjs(), 'day');

            const isCurrentMonth = current.isSame(panelDate, 'month');
            const isNextMonth = current.isSame(panelDate.clone().add(1, 'month'), 'month');

            let dayCellClass = 'flex items-center justify-center mx-2 w-8 h-8 rounded-full text-sm font-light transition-all duration-300';

            if (isDisabled) {
              dayCellClass += ' text-customGray-300 md:hover:bg-opacity-0';
            }
            else if (isSelected) {
              dayCellClass += ' bg-primaryBlue-900 text-white';
            }
            else if (isToday) {
              dayCellClass += ' bg-primaryBlue-50 text-customGray-600';
            }
            else if (!isCurrentMonth && !isNextMonth) {
              dayCellClass += ' text-customGray-300 md:hover:bg-opacity-0';
            }
            else {
              dayCellClass += ' text-primaryBlue-900 md:hover:bg-customGray-100';
            }

            return <div className={dayCellClass}>{current.date()}</div>;
          }}
        />
      </div>
    </ConfigProvider>
  );
};
