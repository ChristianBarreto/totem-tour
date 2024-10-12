import { Link } from "react-router-dom";
import { IconCart } from "../../atoms/IconCart";
import styles from './Header.module.css';
import { useCart } from "../../../context/CartContext";
import { websiteUrl } from "../../../api";

export default function Header({
  setCartOpen,
}: {
  setCartOpen: (status: boolean) => void,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [cart, ] = useCart();
  return (
    <div className={`navbar bg-primary p-10 ${styles.container}`}>
      <div className="flex-1">
        <a href={`${websiteUrl}/totem`}><p className="text-4xl text-base-200">Totem tour</p></a>
      </div>
      <div className="flex-none gap-2">
        <div className="indicator">
          <span className="indicator-item badge bg-orange-600 text-base-100 text-xl p-3">{cart.products.length}</span>
          <button onClick={() => setCartOpen(true)}><IconCart size={10} /></button>
        </div>
      </div>
    </div>
  )
}