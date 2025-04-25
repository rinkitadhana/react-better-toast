import { ToastOptions } from "../types"

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  type: "default",
  size: "normal",
  radius: 10,
  theme: "light",
  icon: true,
  cross: true,
  hoverStop: true,
  time: 5000,
  position: "top-center",
  animation: "slide",
}
