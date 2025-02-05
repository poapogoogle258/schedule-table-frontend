import { createStore } from 'zustand/vanilla'

export type CollapsedState = {
    collapsed : boolean
}

export type CollapsedActions = {
  switchCollapsed : () => void
}

export type CollapsedStore = CollapsedActions & CollapsedState

export const defaultInitState: CollapsedState = {
    collapsed: false,
}

export const createCollapsedStore = (
  initState: CollapsedState = defaultInitState,
) => {
  return createStore<CollapsedStore>()((set) => ({
    ...initState,
    switchCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  }))
}