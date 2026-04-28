import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';

// Ensure assets from /public work under GitHub Pages subpaths.
document.documentElement.style.setProperty(
  '--back-image',
  `url(${import.meta.env.BASE_URL}back.png)`,
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

