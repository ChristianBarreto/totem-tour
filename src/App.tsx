import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { CartProvider } from './context/CartContext';
import { CounterProvider } from './context/CounterContext';
import { TotemProvider } from './context/TotemContext';

export default function App() {
  return (
    <TotemProvider>
      <CounterProvider>
        <CartProvider>
          <RouterProvider router={routes} />
        </CartProvider>
      </CounterProvider>
    </TotemProvider>
  )
}