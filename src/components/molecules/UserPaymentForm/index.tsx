import { useState } from "react"

export default function UserPaymentForm({
 
}: {
  
}) {
  const [payOption, setPayOption] = useState(0)

  return (
    <div
      className="flex flex-col justify-center gap-8"
    >
      <p className="text-4xl text-primary pb-8 text-center">Faça o pagamento para confirmar a sua compra:</p>

      {payOption === 0 && (
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 w-3/4">
            <button className="btn" onClick={() => setPayOption(1)}>Pagar com pix</button>
            <button className="btn" onClick={() => setPayOption(2)}>Pagar com cartão de débito</button>
            <button className="btn" onClick={() => setPayOption(3)}>Pagar com cartão de crédito</button>
          </div>
        </div>
      )}

      {payOption === 1 && (
        <p>Tela pix</p>
      )}

      {payOption === 2 && (
        <p>Tela debito</p>
      )}

      {payOption === 3 && (
        <p>Tela credit</p>
      )}
  
      <br />
    </div>
  )
}