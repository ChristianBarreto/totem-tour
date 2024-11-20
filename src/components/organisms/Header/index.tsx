import { IconCart } from "../../atoms/IconCart";
import styles from './Header.module.css';
import { useCart } from "../../../context/CartContext";
import { websiteUrl } from "../../../api/api";

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
        <a href={`${websiteUrl}/totem`} className="flex">
          <img src={require('./logo.png')} alt="" width={80}/>
          <p className="text-4xl text-base-200 mt-4 ml-2">Totem Tour</p>
        </a>
      </div>

      <div className="flex-1 ">
        <a href={`${websiteUrl}/totem/who-we-are`} className="indicator p-2 rounded-md">
          <span className="indicator-item indicator-bottom indicator-right badge bg-blue-400 border-blue-400 text-white mr-8 ">Clique aqui!</span>
          <p className="text-4xl text-base-200 text-white">Dúvidas?</p> <br />
        </a>
      </div>

      
      <div className="flex-none gap-2">
        <div className="indicator">
          <span className="indicator-item badge bg-red-600 text-base-100 text-xl p-3">{cart.products.length}</span>
          <button onClick={() => setCartOpen(true)}><IconCart /></button>
        </div>
      </div>
    </div>   
  )
}