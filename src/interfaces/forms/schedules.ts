export type Hour = '9:00' | '11:00' | '13:00' | '15:00' | '17:00'

export interface Schedules {
  hour: Hour
  type: 'am' | 'pm'
}

export const SchedulesOptions: Schedules[] = [
  { hour: "9:00", type: "am" },
  { hour: "11:00", type: "am" },
  { hour: "13:00", type: "pm" },
  { hour: "15:00", type: "pm" },
  { hour: "17:00", type: "pm" }
]
