'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type CollapsedStore, createCollapsedStore } from '@/state/stores/switch-menu-store'

export type CollapsedStoreApi = ReturnType<typeof createCollapsedStore>

export const CollapsedStoreContext = createContext<CollapsedStoreApi | undefined>(
  undefined,
)

export interface CollapsedStoreProviderProps {
  children: ReactNode
}

export const CollapsedStoreProvider = ({
  children,
}: CollapsedStoreProviderProps) => {
  const storeRef = useRef<CollapsedStoreApi | null>(null)
  if (!storeRef.current) {
    storeRef.current = createCollapsedStore()
  }

  return (
    <CollapsedStoreContext.Provider value={storeRef.current}>
      {children}
    </CollapsedStoreContext.Provider>
  )
}

export const useCollapseStore = <T,>(
  selector: (store: CollapsedStore) => T,
): T => {
  const collapseStoreContext = useContext(CollapsedStoreContext)

  if (!collapseStoreContext) {
    throw new Error(`collapseStoreContext must be used within CollapsedStoreContext`)
  }

  return useStore(collapseStoreContext, selector)
}