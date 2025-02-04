'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type CalendarPageStore , createCalendarStore, initCalendarPage } from '@/state/stores/calendar-page-store'

export type CalendarPageStoreApi = ReturnType<typeof createCalendarStore>

export const CalendarPageContext = createContext<CalendarPageStoreApi | undefined>(
  undefined,
)

export interface CalendarPageProviderProps {
  children: ReactNode
}

export const CalendarPageProvider = ({
  children,
}: CalendarPageProviderProps) => {
  const storeRef = useRef<CalendarPageStoreApi | null>(null)
  if (!storeRef.current) {
    storeRef.current = createCalendarStore(initCalendarPage())
  }

  return (
    <CalendarPageContext.Provider value={storeRef.current}>
      {children}
    </CalendarPageContext.Provider>
  )
}

export const useCalendarPageStore = <T,>(
  selector: (store: CalendarPageStore) => T,
): T => {
  const calendarPageContext = useContext(CalendarPageContext)

  if (!calendarPageContext) {
    throw new Error(`calendarPageContext must be used within CalendarPageContext`)
  }

  return useStore(calendarPageContext, selector)
}