import { useEffect, useState } from "react"
import IconChevronDown from "../../atoms/IconChevronDown";
import TermsModal from "../TermsModal";
import { getTotemTour } from "../../../api/totemtour/api";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../firebase";

export default function UserTermsForm({
 terms,
 setTerms,
}: {
  terms: boolean,
  setTerms: (value: boolean) => void,
}) {
  const [status, setStatus] = useState({
    info: false,
    local: false,
    cancel: false,
    taxes: false,
    terms: false,
  });
  
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    logEvent(analytics, `checkout_terms`)
    getTotemTour().then((res) => {
      setCompany(res)
    }).catch((err) => {
      console.log("Err", err)
    })
  }, [])

  if (
    status.info
    && status.local
    && status.cancel
    && status.taxes
    && status.terms
  ) {
    setTerms(true);
  } else {
    setTerms(false)
  }

  return (
    <div
      className="flex flex-col justify-center gap-8"
    >
      <p className="text-4xl text-primary pb-8 text-center">Saiba destas informações importantes antes da compra:</p>

      <div className="flex justify-center">
        <div className="flex flex-col gap-4 w-3/4">
        <button className="btn btn-sm btn-circle btn-outline animate-bounce ml-auto bg-primary text-white mr-1">
          <IconChevronDown />
        </button>
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
              <span className="font-bold text-primary">3.</span> O passeio de barco e o mergulho estão sujeitos à cancelamento pela Marinha do Brasil devido ao mau tempo.
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
              <span className="font-bold text-primary">5.</span> Ao realizar a compra, você concorda com nossos 
              <span className="font-bold underline text-blue-700" onClick={() => setOpenTermsModal(true)}> termos de uso</span>.
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={status.terms}
                onChange={() => setStatus({...status, terms: !status.terms})}
              />
            </label>
          </div>
        </div>
      </div>
      <TermsModal open={openTermsModal} setOpen={setOpenTermsModal} company={company}/>
      <br />
    </div>
  )
}