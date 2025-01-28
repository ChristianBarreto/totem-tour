import { displayPrice } from "../../../helpers"

export default function PriceDisplay({
  price,
  qty,
}: {
  price: number
  qty: number,
}) {

  return (
    <div className="p-4">
      <hr  className="border-indigo-300"/>
      <div className="pb-3">
        <p className="font-bold text-right">Quantidade total: </p>
        <p className="text-right text-2xl" data-cy="total-qty-display">{qty} pessoas</p>
      </div>

      <div className="">
        <p className="font-bold text-right">Valor total: </p>
        <p className="text-right text-2xl" data-cy="price-display">{displayPrice(price)}</p>
      </div>

    </div>

  )
}