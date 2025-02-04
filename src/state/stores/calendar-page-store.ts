import { createStore } from 'zustand/vanilla'
import dayjs from 'dayjs'

export type CalendarPageState = {
  textSearched: string
  dateSelected: string
}

export type CalendarPageActions = {
  setTextSearched: (text: string) => void
  setDateSelected: (text: string) => void
}

export type CalendarPageStore = CalendarPageState & CalendarPageActions

export const initCalendarPage = (): CalendarPageState => {
  return {
    textSearched: "",
    dateSelected: dayjs().format("DD/MM/YYYY")
  }
}

export const defaultInitState: CalendarPageState = {
  textSearched: "",
  dateSelected: dayjs().format("DD/MM/YYYY")
}

export const createCalendarStore = (
  initState: CalendarPageState = defaultInitState,
) => {
  return createStore<CalendarPageStore>()((set) => ({
    ...initState,
    setTextSearched: (textSearched: string) => set({ textSearched }),
    setDateSelected: (dateSelected: string) => set({ dateSelected }),
  }))
}