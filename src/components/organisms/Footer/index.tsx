import IconRowBack from "../../atoms/IconRowBack";

export function Footer() {
  return (
    <div className="bg-neutral-600 flex justify-between">
      <div className="p-10">
        <button className="btn btn-lg btn-outline">
          <IconRowBack />
          <p className="text-3xl">Apagar carrinho</p>
        </button>
      </div>
      <div className="bg-orange-600 p-10">
        <p className="btn btn-lg btn-ghost text-5xl text-base-100">Reservar</p>
      </div>
    </div>
  )
}