import { createContext, ReactNode, Reducer, useContext, useReducer } from "react";
import { NewPurchase } from "../api/purchases/types";
import { CartItemType } from "../api/purchaseitems/types";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

type ACTIONTYPE =
  | { type: "addToCart"; product: CartItemType }
  | { type: "removeItem"; product: CartItemType, index: number }
  | { type: "deleteCart" };

const initialPurchase = {
  cartPrice: 0,
  totalNetPrice: 0,
  totalPartnerComm: 0,
  totalCompanyComm: 0,
  products: [],
  customerData: {name: '', email: '', phone: ''},
  paymentId: '',
  payementCaptured: false,
  paymentValue: 0,
  paymentMethod: '',
  acceptedTerms: false,
  totemId: '',
};

const CartContext = createContext({});

export function CartProvider({
  children
}: {
  children: ReactNode
}) {
  const [cart, dispatch] = useReducer<Reducer<NewPurchase, ACTIONTYPE>>(cartReducer, initialPurchase);

  return (
    <CartContext.Provider value={[cart, dispatch]}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext);
}

function cartReducer(cart: NewPurchase, action: ACTIONTYPE): NewPurchase {
  switch(action.type) {
    case 'addToCart': {
      logEvent(analytics, `add_to_cart`)
      return {
        ...cart,
        cartPrice: cart.cartPrice + action.product.totalPrice,
        totalNetPrice: cart.totalNetPrice + action.product.netPrice,
        totalPartnerComm: cart.totalPartnerComm + action.product.partnerComm,
        totalCompanyComm: cart.totalCompanyComm + action.product.companyComm,
        products: [...cart.products, action.product]
      }
    }
    case 'removeItem': {
      return {
        ...cart,
        cartPrice: cart.cartPrice - action.product.totalPrice,
        totalNetPrice: cart.totalNetPrice - action.product.netPrice,
        totalPartnerComm: cart.totalPartnerComm - action.product.partnerComm,
        totalCompanyComm: cart.totalCompanyComm - action.product.companyComm,
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