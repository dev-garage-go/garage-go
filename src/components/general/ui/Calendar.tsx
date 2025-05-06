// Este componente es un calendario basado en Ant Design - https://ant.design/components/calendar#calendar-demo-customize-header
// - Usa `antd` para la lógica y estructura de calendario.
// - Usa `dayjs` para comparar y formatear fechas (esto lo usa internamente ant para manejar fechas).
// - Se customiza completamente con Tailwind, sin global.css.
// - Se sobrescribe el renderizado de cada celda con `fullCellRender()`.
// - El día actual se marca con fondo azul claro (bg-primaryBlue-50 text-customGray-600).
// - El día seleccionado dinámicamente se marca con fondo azul oscuro (bg-primaryBlue-900 text-white).
// - El evento hover se marca con fondo gris claro (hover:bg-customGray-100)
// - Se adapta a dispositivos pequeños con clases Tailwind como `max-w-sm`.
// - El formato de fechas esta en español y es DD-MM-YYY. Ej: 09-05-2025

'use client';

import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

import { ConfigProvider, Calendar, Typography } from 'antd';
import type { CalendarProps } from 'antd';
import esES from 'antd/es/locale/es_ES';

dayjs.extend(localeData);
dayjs.locale('es');

export const CalendarToBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const onSelect: CalendarProps<Dayjs>['onSelect'] = (date) => {
    setSelectedDate(date);
    console.log(date.format('DD-MM-YYYY'));
  };

  // Custom style to day cells

  return (
    <ConfigProvider locale={esES}>
      <div className='w-full max-w-sm border rounded-2xl p-4 bg-white shadow-md'>
        <Typography.Text className="block mb-2 font-semibold text-primaryBlue-900">
          Días disponibles
        </Typography.Text>
        <Calendar
          fullscreen={false}
          onSelect={onSelect}
          headerRender={() => null}
          fullCellRender={(current) => {
            const isToday = current.isSame(dayjs(), 'day');
            const isSelected = selectedDate?.isSame(current, 'day');
            const isCurrentMonth = current.month() === dayjs().month();

            let dayCellClass = 'flex items-center hover:bg-customGray-100 justify-center mx-2 w-8 h-8 rounded-full text-sm font-light transition-all duration-300';

            if (!isCurrentMonth) {
              dayCellClass += ' text-customGray-300';
            } else if (isSelected) {
              dayCellClass += ' bg-primaryBlue-900 text-white';
            } else if (isToday) {
              dayCellClass += ' bg-primaryBlue-50 text-customGray-600';
            } else {
              dayCellClass += ' text-primaryBlue-900';
            }

            return <div className={dayCellClass}>{current.date()}</div>;
          }}
        />
      </div>
    </ConfigProvider>
  );
};
