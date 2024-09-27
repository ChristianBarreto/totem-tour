import { useCart } from "../../../context/CartContext";
import IconTrash from "../../atoms/IconTrash";

export default function Footer({
  setCartOpen,
}: {
  setCartOpen: (value: boolean) => void
}) {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCart();

  return (
    <div className="bg-neutral-600 flex justify-between">
      <div className="p-10">
        <button className="btn btn-lg btn-outline" style={{ color: 'white'}} onClick={() => dispatch({type: 'deleteCart'})}>
          <IconTrash size={10} />
          <p className="text-3xl">Deletar carrinho</p>
        </button>
      </div>
      <div className="bg-orange-600 p-10" onClick={() => setCartOpen(true)}>
        <p className="btn btn-lg btn-ghost text-5xl text-base-100">Reservar</p>
      </div>
    </div>
  )
}