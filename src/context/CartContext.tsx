import { createContext, ReactNode, Reducer, useContext, useReducer } from "react";
import { Purchase, PurchaseItem } from "../api";

type ACTIONTYPE =
  | { type: "addToCart"; product: PurchaseItem }
  | { type: "removeItem"; product: PurchaseItem, index: number }
  | { type: "deleteCart" };

const initialPurchase = {
  cartPrice: 0,
  products: [],
  customerData: {
    name: '',
    email: '',
    phone: '',
  },
  paymentMethod: '',
  acceptedTerms: false,
};

const CartContext = createContext({});

export function CartProvider({
  children
}: {
  children: ReactNode
}) {
  const [cart, dispatch] = useReducer<Reducer<Purchase, ACTIONTYPE>>(cartReducer, initialPurchase);

  return (
    <CartContext.Provider value={[cart, dispatch]}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext);
}

function cartReducer(cart: Purchase, action: ACTIONTYPE): Purchase {
  switch(action.type) {
    case 'addToCart': {
      return {
        ...cart,
        cartPrice: cart.cartPrice + action.product.totalPrice,
        products: [...cart.products, action.product]
      }
    }
    case 'removeItem': {
      return {
        ...cart,
        cartPrice: cart.cartPrice - action.product.totalPrice,
        products: cart.products.filter((p, index) => index !== action.index)
      }
    }
    case 'deleteCart': {
      return {
        ...cart,
        cartPrice: 0,
        products: []
      }
    }
    default: {
      return cart;
    }
  }
}