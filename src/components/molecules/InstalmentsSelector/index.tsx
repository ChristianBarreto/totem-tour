import { NewPurchase } from "../../../api/purchases/types"



export default function InstalmentsSelector({
  disabled,
  purchase,
  setPurchase,
}: {
  disabled: boolean,
  purchase: NewPurchase,
  setPurchase:(value: NewPurchase) => void,
}) {

  const installments = [ // Todo: fetch from MP
    {value: 1, name: 'À vista'},
    {value: 2, name: '2x'},
    {value: 3, name: '3x'},
    {value: 4, name: '4x'},
    {value: 5, name: '5x'},
    {value: 6, name: '6x'},
    {value: 7, name: '7x'},
    {value: 8, name: '8x'},
    {value: 9, name: '9x'},
    {value: 10, name: '10x'},
    {value: 11, name: '11x'},
    {value: 12, name: '12x'},
  ]

  return (
    <select
      className="select select-lg select-bordered w-full max-w-xs"
      disabled={disabled}
      value={purchase.installments}
      onChange={(e) => setPurchase({...purchase, installments: Number(e.target.value)})}
    >
      {installments.map((installment) => (
        <option
          key={installment.value}
          value={installment.value}
          data-cy="credit-card-installment"
        >
          {installment.name}
        </option>
      ))}
    </select>
  )
}