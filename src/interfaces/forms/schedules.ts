export type Hour = '9:00 am' | '11:00 am' | '13:00 pm' | '15:00 pm' | '17:00 pm'

interface Schedules {
  hour: Hour
}

export const SchedulesOptions: Schedules[] = [
  { hour: "9:00 am" },
  { hour: "11:00 am" },
  { hour: "13:00 pm" },
  { hour: "15:00 pm" },
  { hour: "17:00 pm" }
]
