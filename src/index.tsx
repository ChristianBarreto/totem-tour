import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';

import { routes } from './routes/routes';
import { CartProvider } from './context/CartContext';
import { CounterProvider } from './context/CounterContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CounterProvider>
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  </CounterProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
