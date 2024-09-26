export default function PriceDisplay({
  price,
}: {
  price: number
}) {

  return (
    <div className="flex justify-end">
        <p className="text-2xl"><span className="font-bold">Valor total: </span>R$ {price}</p>
    </div>
  )
}