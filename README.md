# React Better Toast

A lightweight, customizable toast notification library for React applications.

## Features

- 🚀 **Lightweight** - Less than 5KB gzipped
- 🎨 **Customizable** - Multiple themes, animations, and positions
- 🧩 **Easy to use** - Simple API
- ⌨️ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Works on all screen sizes
- 🔄 **Flexible API** - Create, update, and dismiss toasts programmatically

## Installation

```bash
npm install react-better-toast
# or
yarn add react-better-toast
# or
pnpm add react-better-toast
```

## Usage

### Basic Example

```jsx
import React from 'react';
import { ToastContainer, setToast } from 'react-better-toast';
import 'react-better-toast/dist/index.css'; // Import styles

function App() {
  const showToast = () => {
    setToast('Hello, World!', { type: 'success' });
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </div>
  );
}

export default App;
```

### API Methods

#### `setToast(message, options)`

Creates a new toast notification.

```jsx
import { setToast } from 'react-better-toast';

// Basic usage
const id = setToast('Hello, World!');

// With options
setToast('Operation successful!', {
  type: 'success',
  position: 'top-right',
  time: 3000,
  theme: 'colored'
});
```

#### `updateToast(id, message, options)`

Updates an existing toast by its ID.

```jsx
import { setToast, updateToast } from 'react-better-toast';

// Create a toast and store its ID
const id = setToast('Loading...', { type: 'info' });

// Update it later
setTimeout(() => {
  updateToast(id, 'Operation completed!', { type: 'success' });
}, 2000);
```

#### `dismissToast(id)`

Dismisses a specific toast by its ID.

```jsx
import { setToast, dismissToast } from 'react-better-toast';

const id = setToast('This will be dismissed');

setTimeout(() => {
  dismissToast(id);
}, 2000);
```

#### `clearToasts()`

Clears all active toasts.

```jsx
import { clearToasts } from 'react-better-toast';

clearToasts();
```

### ToastContainer Props

The `ToastContainer` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | string | `'top-center'` | Position of the toasts |
| `theme` | string | `'light'` | Theme of the toasts |
| `time` | number | `5000` | Duration in milliseconds |
| `type` | string | `'default'` | Default toast type |
| `animation` | string | `'slide'` | Animation type |
| `className` | string | `''` | Additional CSS class |
| `style` | object | `{}` | Inline styles |

### Toast Options

All toasts can be customized with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | `'default'` | One of: `'success'`, `'error'`, `'info'`, `'warning'`, `'default'` |
| `position` | string | `'top-center'` | One of: `'top-right'`, `'top-center'`, `'top-left'`, `'bottom-right'`, `'bottom-center'`, `'bottom-left'` |
| `theme` | string | `'light'` | One of: `'light'`, `'dark'`, `'colored'` |
| `animation` | string | `'slide'` | One of: `'slide'`, `'fade'`, `'bounce'`, `'zoom'`, `'none'` |
| `time` | number | `5000` | Duration in milliseconds (0 for permanent) |
| `size` | string | `'normal'` | One of: `'xsmall'`, `'small'`, `'normal'`, `'large'`, `'xlarge'` |
| `radius` | number | `10` | Border radius in pixels |
| `icon` | boolean or ReactNode | `true` | Show default icon or custom icon |
| `cross` | boolean | `true` | Show close button |
| `hoverStop` | boolean | `true` | Pause timer on hover |

## License

MIT
