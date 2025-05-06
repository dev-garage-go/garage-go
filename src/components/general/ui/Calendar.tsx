// Component from: https://ant.design/components/calendar#calendar-demo-customize-header

import { Calendar, theme, Typography } from 'antd';
import type { CalendarProps } from 'antd';
import esES from 'antd/locale/es_ES';
import { ConfigProvider } from 'antd';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import localeData from 'dayjs/plugin/localeData';
import type { Dayjs } from 'dayjs';

dayjs.extend(localeData);
dayjs.locale('es')

export const CalendarToBooking = () => {
  const { token } = theme.useToken();

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('DD-MM-YYYY'), mode);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 320,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    padding: 8
  };

  return (
    <ConfigProvider locale={esES}>
      <div style={wrapperStyle}>
        <Typography.Text style={{ fontWeight: 600, color: '#1f1f1f' }}>
          Días disponibles
        </Typography.Text>
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          headerRender={() => null} // Quita cabecera por completo
        />
      </div>
    </ConfigProvider>
  );
};