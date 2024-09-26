import { Link } from "react-router-dom";
import { IconCart } from "../../atoms/IconCart";
import styles from './Header.module.css';

export default function Header({
  setCartOpen,
}: {
  setCartOpen: (status: boolean) => void,
}) {

  return (
    <div className={`navbar bg-primary p-10 ${styles.container}`}>
      <div className="flex-1">
        <Link to="/totem">
          <p className="text-4xl text-base-200">Totem tour</p>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="indicator">
          <span className="indicator-item badge bg-orange-600 text-base-100 text-xl p-3">3</span>
          <button onClick={() => setCartOpen(true)}><IconCart /></button>
        </div>
      </div>
    </div>
  )
}