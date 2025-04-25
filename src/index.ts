// src/index.ts

// Export the main components and functions
export { ToastContainer } from './components/ToastContainer';
export { setToast, updateToast, dismissToast, clearToasts } from './toast';
export { useToast } from './context/ToastContext';

// Export types
export type { 
  ToastOptions, 
  ToastPosition, 
  ToastTheme, 
  ToastAnimation,
  ToastType,
  ToastSize,
  Toast,
  ToastContainerProps
} from './types';

// Export styles
import './styles/toast.css';