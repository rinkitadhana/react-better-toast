// src/types/index.ts

export type ToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left"

export type ToastTheme = "light" | "dark" | "colored"

export type ToastAnimation = "slide" | "fade" | "bounce" | "zoom" | "none"

export type ToastType = "success" | "error" | "info" | "warning" | "default"

export type ToastSize = "xsmall" | "small" | "normal" | "large" | "xlarge"

export interface ToastOptions {
  type?: ToastType
  size?: ToastSize
  radius?: number
  theme?: ToastTheme
  icon?: boolean | React.ReactNode
  cross?: boolean
  hoverStop?: boolean
  time?: number
  position?: ToastPosition
  animation?: ToastAnimation
  id?: string
}

export interface Toast extends ToastOptions {
  id: string
  message: string
  createdAt?: number
}

export interface ToastContainerProps extends ToastOptions {
  className?: string
  style?: React.CSSProperties
}

export interface ToastContextValue {
  toasts: Toast[]
  addToast: (message: string, options?: ToastOptions) => string
  removeToast: (id: string) => void
  clearToasts: () => void
  defaultOptions: ToastOptions
  setDefaultOptions: (options: ToastOptions) => void
}
