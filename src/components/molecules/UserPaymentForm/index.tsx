import { useEffect, useState } from "react"
import { Customer } from "../../../api/customers/types";
import { Totem } from "../../../api/totems/types";
import PaymentPix from "../PaymentPix"
import { useCart } from "../../../context/CartContext";
import PaymentCard from "../PaymentCard";
import { logEvents } from "../../../firebase";

export default function UserPaymentForm({
  customerData,
  totem,
}: {
  customerData: Customer,
  totem: Totem,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [cart, ] = useCart();
  const [payOption, setPayOption] = useState(0);

  useEffect(() => {
    if (totem?.nickName) {
      logEvents(`checkout_payment`, {totemNickName: totem.nickName});
    }
  }, [totem]);

  return (
    <div
      className="flex flex-col justify-center gap-8"
    >
      <p className="text-4xl text-primary pb-8 text-center">Faça o pagamento para confirmar a sua compra:</p>
      <p className="text-2xl text-primary text-center">Seu pagamento está seguro com o <span className="text-blue-400">Mercado Pago</span>.</p>

      {(payOption === 0) ? (
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 w-3/4">
            <button
              className="btn btn-lg btn-primary"
              onClick={() => setPayOption(1)}
              data-cy="method-pix-button"
            >
              Pagar com PIX
            </button>
            <button
              className="btn btn-lg btn-primary"
              onClick={() => setPayOption(2)}
              data-cy="method-card-button"
            >
              Pagar com cartão (débito ou crédito)
            </button>
          </div>
          
        </div>
      ): (
        <>
          {payOption === 1 && (
            <PaymentPix
              cart={cart}
              customerData={customerData}
              totem={totem}
            />
          )}

          {payOption === 2 && (
            <PaymentCard
              cart={cart}
              customerData={customerData}
              totem={totem}
            />
          )}
        </>
      )}
      {(payOption !== 0) && (
        <button
          className="btn btn-lg"
          onClick={() => setPayOption(0)}
          data-cy="payment-method-back"
        >
          Escolher outra forma de pagamento
        </button>
      )}
      <br />
    </div>
  )
}