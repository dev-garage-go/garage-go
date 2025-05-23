export type Hour = '9:00' | '11:00' | '13:00' | '15:00' | '17:00'

interface Schedules {
  hour: Hour
}

export const SchedulesOptions: Schedules[] = [
  { hour: "9:00" },
  { hour: "11:00" },
  { hour: "13:00" },
  { hour: "15:00" },
  { hour: "17:00" }
]
