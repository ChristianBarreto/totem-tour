import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function CartTotal({
  setCartOpen,
}: {
  setCartOpen: (value: boolean) => void,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [cart, ] = useCart();
  const navigate = useNavigate();


  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Total</p>
        <p>R${cart.cartPrice},00</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">Você reberá todas as informações por WhatsApp/E-mail</p>
      <div className="mt-6">
        <button
          className="btn w-full bg-orange-600 px-6 py-3 text-base text-white shadow-sm hover:bg-orange-500 disabled:bg-organge-200"
          disabled={!cart.products.length}
          onClick={() => navigate("/totem/checkout")}
        >
          Reservar
        </button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          ou{' '}
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Continuar comprando
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  )
}