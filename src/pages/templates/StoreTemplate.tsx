import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import { Footer } from "../../components/organisms/Footer";
import CartModal from "../../components/organisms/CartModal";
import { useState } from "react";

export default function HeroTemplate() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div style={{ height: '100vh'}}>
      <Header setCartOpen={setCartOpen} />
      <CartModal cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <Outlet />
      <Footer />
    </div>
  );
}