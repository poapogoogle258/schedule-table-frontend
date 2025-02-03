'use client'

import { createContext, useState } from 'react'
import dayjs from 'dayjs'

const defaultDate = dayjs().format("DD/MM/YYYY")

export const CalendarSelectContext = createContext<{ dateCalendarSelect: string, setDateCalendarSelect: (value: string) => void | undefined }>({
  dateCalendarSelect: defaultDate,
  setDateCalendarSelect: () => { }
})

export default function SelectDateProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [dateCalendarSelect, setDateCalendarSelect] = useState(defaultDate)
  const value = { dateCalendarSelect, setDateCalendarSelect }

  return <CalendarSelectContext.Provider value={value}>{children}</CalendarSelectContext.Provider>
}