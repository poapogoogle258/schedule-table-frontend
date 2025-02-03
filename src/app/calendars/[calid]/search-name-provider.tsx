'use client'

import { createContext, useState } from 'react'

export const searchContext = createContext<{search : string , setSearch : (data : string) => void | undefined}>({
  search: "",
  setSearch: () => { }
})

export default function SearchNameProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [search, setSearch] = useState("")

  return <searchContext.Provider value={{search, setSearch}}>{children}</searchContext.Provider>
}