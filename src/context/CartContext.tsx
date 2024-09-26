import { createContext, useContext, useReducer } from "react";

// const purchase = {};

// const CartContext = createContext({});

// export function CartProvider({children}) {
//   const [cart, dispatch] = useReducer(orgsReducer, purchase);

//   return (
//     <CartContext.Provider value={[cart, dispatch]}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   return useContext(CartContext);
// }

// function cartReducer(cart, action) {
//   switch(action.type) {
//     case("addCart"): {
//       console.log("ADD TO CART");
//     }
//     default: {
//       return cart;
//     }
//   }
// }