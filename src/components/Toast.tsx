// src/components/Toast.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Toast as ToastType } from '../types';
import { getTypeStyles, getAnimationClass, getTypeIcon } from '../utils/helper';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const {
    id,
    message,
    type = 'default',
    radius = 4,
    theme = 'light',
    icon,
    cross = true,
    hoverStop = true,
    time = 5000,
    position = 'top-right',
    animation = 'slide',
    size = 'normal'
  } = toast;

  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(time);
  const startTimeRef = useRef<number | null>(null);

  const startTimer = () => {
    if (time === 0) return; // Permanent toast

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, remainingTime);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const pauseTimer = () => {
    if (isPaused || !startTimeRef.current) return;
    clearTimer();
    const elapsedTime = Date.now() - startTimeRef.current;
    setRemainingTime(Math.max(0, remainingTime - elapsedTime));
    setIsPaused(true);
  };

  const resumeTimer = () => {
    if (!isPaused) return;
    startTimer();
    setIsPaused(false);
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(id);
    }, 300); // Animation duration
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, []);

  const handleMouseEnter = () => {
    if (hoverStop) {
      pauseTimer();
    }
  };

  const handleMouseLeave = () => {
    if (hoverStop) {
      resumeTimer();
    }
  };

  const themeClass = `toast-theme-${theme}`;
  const typeClass = `toast-type-${type}`;
  const sizeClass = `toast-size-${size}`;
  const animationClass = getAnimationClass(animation, position);
  const exitClass = isExiting ? 'toast-exit' : '';

  const typeStyles = getTypeStyles(type, theme);
  
  // Handle icon display
  let iconElement = null;
  if (icon === true) {
    const iconClass = getTypeIcon(type);
    iconElement = iconClass ? <div className={`toast-icon ${iconClass}`}></div> : null;
  } else if (icon) {
    iconElement = <div className="toast-icon">{icon}</div>;
  }

  return (
    <div
      className={`toast ${themeClass} ${typeClass} ${sizeClass} ${animationClass} ${exitClass}`}
      style={{
        borderRadius: `${radius}px`,
        ...typeStyles
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {iconElement}
      <div className="toast-content">{message}</div>
      {cross && (
        <button 
          className="toast-close" 
          onClick={handleClose} 
          aria-label="Close notification"
          type="button"
        >
          <span className="toast-close-icon" aria-hidden="true"></span>
        </button>
      )}
    </div>
  );
};