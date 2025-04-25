// src/components/ToastContainer.tsx

import React, { useEffect } from 'react';
import { Toast } from './Toast';
import { getPositionStyles } from '../utils/helper';
import { ToastPosition, ToastContainerProps } from '../types';
import { ToastContextProvider, createToastContextValue } from '../context/ToastContext';
import '../styles/toast.css';

export const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const {
    className = '',
    style = {},
    ...defaultOptions
  } = props;
  
  // Get the singleton context value
  const contextValue = createToastContextValue();
  
  // Update default options when props change
  useEffect(() => {
    if (Object.keys(defaultOptions).length > 0) {
      contextValue.setDefaultOptions(defaultOptions);
    }
  }, [JSON.stringify(defaultOptions)]);
  
  // Group toasts by position
  const toastsByPosition: Record<ToastPosition, any[]> = {
    'top-right': [],
    'top-center': [],
    'top-left': [],
    'bottom-right': [],
    'bottom-center': [],
    'bottom-left': []
  };
  
  contextValue.toasts.forEach(toast => {
    const position = toast.position || 'top-right';
    toastsByPosition[position as ToastPosition].push(toast);
  });
  
  // Render using provider to ensure consistent context
  return (
    <ToastContextProvider>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        positionToasts.length > 0 && (
          <div 
            key={position}
            className={`toast-container ${className}`}
            style={{
              ...getPositionStyles(position as ToastPosition),
              ...style
            }}
          >
            {positionToasts.map(toast => (
              <Toast
                key={toast.id}
                toast={toast}
                onRemove={contextValue.removeToast}
              />
            ))}
          </div>
        )
      ))}
    </ToastContextProvider>
  );
};