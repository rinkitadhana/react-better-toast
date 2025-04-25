// ToastContext.tsx
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react"
import { Toast, ToastContextValue, ToastOptions } from "../types"
import { DEFAULT_TOAST_OPTIONS } from "../constants/defaults"

// Create context
export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
)

// Local state (singleton-style)
let toasts: Toast[] = []
let defaultOptions: ToastOptions = { ...DEFAULT_TOAST_OPTIONS }
const listeners: (() => void)[] = []

// Helper to notify components
const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

// Actions
const addToast = (message: string, options?: ToastOptions): string => {
  const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const newToast: Toast = {
    id,
    message,
    createdAt: Date.now(),
    ...defaultOptions,
    ...options,
  }
  toasts = [...toasts, newToast]
  notifyListeners()
  return id
}

const removeToast = (id: string): void => {
  toasts = toasts.filter((toast) => toast.id !== id)
  notifyListeners()
}

const clearToasts = (): void => {
  toasts = []
  notifyListeners()
}

const setDefaultOptions = (options: ToastOptions): void => {
  defaultOptions = { ...defaultOptions, ...options }
  notifyListeners()
}

// Toast context value
const contextValue: ToastContextValue = {
  get toasts() {
    return [...toasts]
  },
  addToast,
  removeToast,
  clearToasts,
  get defaultOptions() {
    return { ...defaultOptions }
  },
  setDefaultOptions,
}

// Export the function to get toast context value (singleton pattern)
export const createToastContextValue = (): ToastContextValue => {
  return contextValue;
}

// Provider
export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const listener = () => forceUpdate({})
    listeners.push(listener)

    return () => {
      const index = listeners.indexOf(listener)
      if (index !== -1) listeners.splice(index, 1)
    }
  }, [])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  )
}

// Optional: easy access hook
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context)
    throw new Error("useToast must be used within ToastContextProvider")
  return context
}
