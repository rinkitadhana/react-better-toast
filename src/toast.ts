// src/toast.ts

import { ToastOptions } from './types';
import { createToastContextValue } from './context/ToastContext';

/**
 * Creates a new toast notification.
 * @param message - The message to display in the toast.
 * @param options - Optional configuration options for the toast.
 * @returns The ID of the created toast.
 */
export const setToast = (message: string, options?: ToastOptions): string => {
  const contextValue = createToastContextValue();
  return contextValue.addToast(message, options);
};

/**
 * Updates an existing toast by its ID.
 * @param id - The ID of the toast to update.
 * @param message - The new message for the toast.
 * @param options - Optional new configuration options for the toast.
 * @returns boolean indicating if the update was successful.
 */
export const updateToast = (id: string, message: string, options?: ToastOptions): boolean => {
  const contextValue = createToastContextValue();
  const existingToasts = contextValue.toasts;
  const existingToast = existingToasts.find(toast => toast.id === id);
  
  if (!existingToast) {
    return false;
  }
  
  // Remove the existing toast
  contextValue.removeToast(id);
  
  // Create updated toast options with the original ID preserved
  const updatedOptions: ToastOptions = {
    ...existingToast, // Keep existing options
    ...options,       // Apply new options
    id                // Preserve original ID
  };
  
  // Add the updated toast
  contextValue.addToast(message, updatedOptions);
  
  return true;
};

/**
 * Dismisses a toast by its ID.
 * @param id - The ID of the toast to dismiss.
 */
export const dismissToast = (id: string): void => {
  const contextValue = createToastContextValue();
  contextValue.removeToast(id);
};

/**
 * Clears all active toasts.
 */
export const clearToasts = (): void => {
  const contextValue = createToastContextValue();
  contextValue.clearToasts();
};