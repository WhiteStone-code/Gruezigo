import { useEffect, useState } from 'react'

/**
 * Persiste cualquier estado serializable en localStorage.
 * Es la base de todo el "backend" de GrüeziGo (sin servidor).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch (err) {
      console.warn(`[GrüeziGo] No se pudo leer localStorage["${key}"]`, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`[GrüeziGo] No se pudo escribir localStorage["${key}"]`, err)
    }
  }, [key, value])

  return [value, setValue]
}
