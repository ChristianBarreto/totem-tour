import { Availability, Availabilities } from "../../../api/availabilities/types"; 
import { Product } from "../../../api/products/types";
import DateSelector from "../DateSelector";
import PriceDisplay from "../PriceDisplay";
import QtySelector from "../QtySelector";

export default function ProductForm({
  availabilities,
  setAvailability,
  qty,
  setQty,
  qtyAdult,
  setQtyAdult,
  qtyFree,
  setQtyFree,
  qtyHalf,
  setQtyHalf,
  setMaxRound,
  product,
  availability,
  qtySelectorDisable,
  price,
}: {
  setAvailability: (date: Availability | null) => void,
  availabilities: Availabilities,
  qty: number,
  setQty: (value: number) => void,
  qtyAdult: number,
  setQtyAdult: (value: number) => void,
  qtyFree: number,
  setQtyFree: (value: number) => void
  qtyHalf: number,
  setQtyHalf: (value: number) => void
  setMaxRound: (value: boolean) => void,
  product: Product
  availability: Availability | null
  qtySelectorDisable: boolean
  price: number
}) {

  return (
    <div className="grid grid-cols-10 gap-0">
      <div>
        {/* <div className="bg-indigo-500 absolute top-2 w-3 h-24"></div> */}
        <div className="bg-indigo-500 text-white rounded-full w-10 h-10 mb-4">
          <p className='text-xl text-center pt-1'>1</p>
        </div>
      </div>

      <div className="col-span-9 mb-4">
        <p className='text-xl text-left pb-4'> Escolha a data:</p>
        <DateSelector
          setAvailability={setAvailability}
          availabilities={availabilities}
          unavailableToday={product.todayUnavailable}
        />
      </div>
      <div className={`text-white rounded-full w-10 h-10 ${availability ? "bg-indigo-500" : "bg-gray-400 "}`}>
        <p className='text-xl text-center pt-1'>2</p>
      </div>
      <div className="col-span-9 mb-4">
        <p className='text-xl text-left pb-4'> Escolha a quantidade de pessoas:</p>
        <QtySelector
          qty={qty}
          setQty={setQty}
          qtyAdult={qtyAdult}
          setQtyAdult={setQtyAdult}
          qtyFree={qtyFree}
          setQtyFree={setQtyFree}
          qtyHalf={qtyHalf}
          setQtyHalf={setQtyHalf}
          maxPerRound={product.maxPerRound}
          remaining={availability?.remaining}
          disabled={qtySelectorDisable}
          setMaxRound={setMaxRound}
          isFreePaxAllowed={product.isFreePaxAllowed}
          freePaxRuleMsg = {product.freePaxRuleMsg}
          isHalfPaxAllowed={product.isHalfPaxAllowed}
          halfPaxRuleMsg={product.halfPaxRuleMsg}
        />
        <PriceDisplay price={price} qty={qty} />

      </div>
      <div className={`text-white rounded-full w-10 h-10 ${availability && qty ? "bg-indigo-500" : "bg-gray-400 "}`}>
        <p className='text-xl text-center pt-1'>3</p>
      </div>
      <div className="col-span-9 mb-4">
        <p className='text-xl text-left'>Adicione ao carrinho:</p>
      </div>
    </div>
  )
}