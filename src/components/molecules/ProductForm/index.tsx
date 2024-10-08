import { Availabilities, Availabilitiy, Product } from "../../../api"
import DateSelector from "../DateSelector"
import PriceDisplay from "../PriceDisplay"
import QtySelector from "../QtySelector"

export default function ProductForm({
  availabilities,
  setAvailability,
  qty,
  setQty,
  setMaxRound,
  product,
  availability,
  qtySelectorDisable,
  price,
}: {
  setAvailability: (date: Availabilitiy | null) => void,
  availabilities: Availabilities,
  qty: number,
  setQty: (value: number) => void
  setMaxRound: (value: boolean) => void,
  product: Product
  availability: Availabilitiy | null
  qtySelectorDisable: boolean
  price: number
}) {

  return (
    <div>
      <ul className="steps steps-vertical">
        <li className={`step text-xl mb-6 step-primary`}>
          <div className="flex justify-between w-full">
            <p className='pt-4 text-xl text-left'> Escolha a data:</p>
            <DateSelector
              setAvailability={setAvailability}
              availabilities={availabilities}
            />
          </div>
        </li>
        <li className={`step text-xl ${availability && "step-primary"}`}>
          <div className="flex justify-between w-full">
            <p className='text-xl text-left'> Escolha a quantidade de pessoas:</p>
            <QtySelector
              qty={qty}
              setQty={setQty}
              maxPerRound={product.maxPerRound}
              remaining={availability?.remaining}
              disabled={qtySelectorDisable}
              setMaxRound={setMaxRound}
            />
          </div>
        </li>
        <li className={`step text-xl ${qty && "step-primary"} `}>
          <div className="flex justify-between w-full">
            <p className='text-xl text-left mt-6'> Adicione ao carrinho:</p>
            <PriceDisplay price={price} />
          </div>
        </li>
      </ul>
    </div>
  )
}