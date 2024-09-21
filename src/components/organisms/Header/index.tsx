import { IconCart } from "../../atoms/IconCart";

export default function Header() {

  return (
    <div className="navbar bg-primary p-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-base-100 text-4xl">Totem Tour</a>
      </div>
      <div className="flex-none gap-2">
        <IconCart />
      </div>
    </div>
  )
}