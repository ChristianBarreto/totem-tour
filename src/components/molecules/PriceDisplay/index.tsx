export default function PriceDisplay({
  price,
}: {
  price: number
}) {

  return (
    <div className="border border-indigo-200 rounded-lg p-2 pl-8">
      <p className="font-bold text-right">Valor total: </p>
      <p className="text-right text-2xl">R$ {price}</p>
    </div>
  )
}