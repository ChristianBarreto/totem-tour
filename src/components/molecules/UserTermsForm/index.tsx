import { useState } from "react"

export default function UserTermsForm({
 
}: {
  
}) {
  const [status, setStatus] = useState({
    info: false,
    local: false,
    cancel: false,
    taxes: false,
    terms: false,
  });

  return (
    <div
      className="flex flex-col justify-center gap-8"
    >
      <p className="text-4xl text-primary pb-8 text-center">Saiba destas informações importantes antes da compra:</p>

      <div className="flex justify-center">
        <div className="flex flex-col gap-4 w-3/4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-2xl pr-4">
                <span className="font-bold text-primary">1.</span> Assim que confirmado o pagamento, enviaremos todas as informações sobre os seus passeios.
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={status.info}
                onChange={() => setStatus({...status, info: !status.info})}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-2xl pr-4">
              <span className="font-bold text-primary">2.</span> Você deverá estar no local indicado com no mínimo 30 minutos de antecedência.
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={status.local}
                onChange={() => setStatus({...status, local: !status.local})}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-2xl pr-4">
              <span className="font-bold text-primary">3.</span> O passeio de barco e o mergulho estão sujeitos à cancelamento pela Marinha do Brasil devido ao mal tempo.
                <span className="font-bold text-blue-400"> Não se preocupe</span>, caso aconteça, o valor pago dos passeios cancelados será devolvido.
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={status.cancel}
                onChange={() => setStatus({...status, cancel: !status.cancel})}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-2xl pr-4">
              <span className="font-bold text-primary">4.</span> Taxas extras, como entrada na Marina dos Anjos e estacionamentos não estão inclusos.
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={status.taxes}
                onChange={() => setStatus({...status, taxes: !status.taxes})}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-2xl pr-4">
              <span className="font-bold text-primary">5.</span> Ao realizar a compra, você concorda com nossos <span className="font-bold underline">termos de uso</span>.
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={status.terms}
                onChange={() => setStatus({...status, terms: true})}
              />
            </label>
          </div>
        </div>
      </div>
  
      <br />
    </div>
  )
}