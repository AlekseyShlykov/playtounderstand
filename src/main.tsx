import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';
import { initOutboundClickTracking } from './analytics/outboundClicks';

// Ensure assets from /public work under GitHub Pages subpaths.
document.documentElement.style.setProperty(
  '--back-image',
  `url(${import.meta.env.BASE_URL}back.png)`,
);

initOutboundClickTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

