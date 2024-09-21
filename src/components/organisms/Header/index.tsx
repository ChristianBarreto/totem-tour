import { IconCart } from "../../atoms/IconCart";

export default function Header({
  setCartOpen,
}: {
  setCartOpen: (status: boolean) => void,
}) {

  return (
    <div className="navbar bg-primary p-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-base-100 text-4xl">Totem Tour</a>
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