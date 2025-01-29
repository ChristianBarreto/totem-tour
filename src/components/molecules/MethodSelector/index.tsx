import { NewPurchase } from "../../../api/purchases/types";
import InstalmentsSelector from "../InstalmentsSelector";


export default function MethodSelector({
  purchase,
  setPurchase,
  handlePay,
}: {
  purchase: NewPurchase,
  setPurchase:(value: NewPurchase) => void,
  handlePay:() => void,
}) {

  const handleDebit = () => {
    setPurchase({...purchase, paymentMethod: 'debit_card', installments: 1})
  }

  const handleCredit = () => {
    setPurchase({...purchase, paymentMethod: 'credit_card', installments: 1})
  }

  return (
    <div className="">
      <div className={`form-control border p-4 pb-14 w-82 ${purchase.paymentMethod === 'debit_card' && "bg-blue-100 border-blue-500"}`}>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="radio-10"
            className="radio radio-lg checked:bg-blue-500"
            checked={purchase.paymentMethod === 'debit_card'}
            onChange={handleDebit}
            data-cy="debit-card-selection"
          />
          <span className="label-text text-2xl m-2">Cartão de Débito</span>
        </label>
      </div>
      <div className={`form-control border p-4 w-82  ${purchase.paymentMethod === 'credit_card' && "bg-blue-100 border-blue-500"}`}>
        <label className="label cursor-pointer pb-6">
        <input
            type="radio"
            name="radio-10"
            className="radio radio-lg checked:bg-blue-500"
            checked={purchase.paymentMethod === 'credit_card'}
            onChange={handleCredit}
            data-cy="credit-card-selection"
          />
          <span className="label-text text-2xl m-2">Cartão de Crédito</span>
        </label>
        <InstalmentsSelector
          purchase={purchase}
          setPurchase={setPurchase}
          disabled={purchase.paymentMethod !== 'credit_card'}
        />
        {((purchase.installments) && (purchase.installments > 1)) && <p className="pt-2 text-red-500">* Com juros, ver total na maquininha</p>}
      </div>
      
      <button
          className="btn btn-lg btn-primary mt-8 w-full"
          onClick={handlePay}
          data-cy="card-method-pay"
        >
        Pagar
      </button>
    </div>

  )
}