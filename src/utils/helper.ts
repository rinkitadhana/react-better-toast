import { ToastPosition, ToastType, ToastAnimation } from '../types';
import React from 'react';

/**
 * Gets the CSS positioning styles for a toast position
 * @param position The position of the toast
 * @returns CSS styles object
 */
export const getPositionStyles = (position: ToastPosition): React.CSSProperties => {
  switch (position) {
    case 'top-right':
      return { top: '20px', right: '20px' };
    case 'top-center':
      return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
    case 'top-left':
      return { top: '20px', left: '20px' };
    case 'bottom-right':
      return { bottom: '20px', right: '20px' };
    case 'bottom-center':
      return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-left':
      return { bottom: '20px', left: '20px' };
    default:
      return { top: '20px', right: '20px' };
  }
};

/**
 * Gets the CSS styles for a toast type and theme
 * @param type The type of toast
 * @param theme The theme of the toast
 * @returns CSS styles object
 */
export const getTypeStyles = (type: ToastType, theme: string): React.CSSProperties => {
  if (theme !== 'colored') return {};
  
  switch (type) {
    case 'success':
      return { backgroundColor: '#4caf50', color: '#fff' };
    case 'error':
      return { backgroundColor: '#f44336', color: '#fff' };
    case 'warning':
      return { backgroundColor: '#ff9800', color: '#fff' };
    case 'info':
      return { backgroundColor: '#2196f3', color: '#fff' };
    default:
      return { backgroundColor: '#424242', color: '#fff' };
  }
};

/**
 * Gets the CSS animation class for a toast
 * @param animation The animation type
 * @param position The position of the toast
 * @returns CSS class name
 */
export const getAnimationClass = (animation: ToastAnimation, position: ToastPosition): string => {
  if (animation === 'none') return '';
  
  if (animation === 'slide') {
    if (position.includes('top')) return 'toast-slide-in-down';
    return 'toast-slide-in-up';
  }
  if (animation === 'fade') return 'toast-fade-in';
  if (animation === 'bounce') return 'toast-bounce-in';
  if (animation === 'zoom') return 'toast-zoom-in';
  return '';
};

/**
 * Gets a CSS class for a toast type icon
 * @param type The type of toast
 * @returns CSS class name for the icon
 */
export const getTypeIcon = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return 'toast-icon-success';
    case 'error':
      return 'toast-icon-error';
    case 'warning':
      return 'toast-icon-warning';
    case 'info':
      return 'toast-icon-info';
    default:
      return '';
  }
};