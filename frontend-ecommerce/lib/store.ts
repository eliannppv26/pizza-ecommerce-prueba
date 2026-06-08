"use client"

import { useSyncExternalStore } from "react"

type Listener = () => void

/**
 * Store global minimalista con persistencia opcional en localStorage.
 * Evita añadir dependencias externas (zustand, redux, etc.).
 */
export function createStore<T extends object>(
  initial: T,
  persistKey?: string
) {
  let state = initial
  let hydrated = false
  const listeners = new Set<Listener>()

  const hydrate = () => {
    if (hydrated || typeof window === "undefined" || !persistKey) {
      hydrated = true
      return
    }
    try {
      const raw = window.localStorage.getItem(persistKey)
      if (raw) state = { ...initial, ...JSON.parse(raw) }
    } catch {
      /* ignore */
    }
    hydrated = true
  }

  const persist = () => {
    if (typeof window === "undefined" || !persistKey) return
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }

  const getSnapshot = (): T => {
    if (!hydrated) hydrate()
    return state
  }
  const getServerSnapshot = (): T => initial

  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const set = (updater: (prev: T) => T) => {
    state = updater(state)
    persist()
    listeners.forEach((l) => l())
  }

  const get = (): T => {
    if (!hydrated) hydrate()
    return state
  }

  function useStore<S>(selector: (s: T) => S): S {
    return useSyncExternalStore(
      subscribe,
      () => selector(getSnapshot()),
      () => selector(getServerSnapshot())
    )
  }

  return { useStore, set, get }
}
