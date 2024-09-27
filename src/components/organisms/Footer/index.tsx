import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import IconTrash from "../../atoms/IconTrash";
import DeleteCartModal from "../../molecules/DeleteCartModal";

export default function Footer({
  setCartOpen,
}: {
  setCartOpen: (value: boolean) => void
}) {
  const [openDeleteCartModal, setOpenDeleteCartModal] = useState(false);
  // @ts-expect-error: TODO: fix type of context
  const [cart] = useCart();
  return (
  <>
    <div className="bg-neutral-600 flex justify-between">
      <div className="p-10">
        {!!cart.products.length && (
          <button
            className="btn btn-lg btn-outline"
            style={{ color: 'white'}}
            onClick={() => setOpenDeleteCartModal(true)}
            disabled={!cart.products.length}
          >
            <IconTrash size={10} />
            <p className="text-3xl">Deletar carrinho</p>
          </button>
        )}
      </div>
      <div className="bg-orange-600 p-10" onClick={() => setCartOpen(true)}>
        <p className="btn btn-lg btn-ghost text-5xl text-base-100">Reservar</p>
      </div>
    </div>
    <DeleteCartModal open={openDeleteCartModal} setOpen={setOpenDeleteCartModal} />
  </>

  )
}