import IconXCircle from "../../atoms/IconXCircle";

export default function PaymentExpired() {

  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-white border md:w-100">
        <div className="card-body">
          <p className="text-xl text-red-400 mb-4 text-center">Solicitação de pagamento expirada.</p>
          <div className="flex justify-center">
            <IconXCircle classes={"text-red-500 size-36"} />
          </div>
          <p className="text-xl mb-4 text-center">Volte aos meios de pagamento e faça uma nova solicitação.</p>
        </div>
      </div>
    </div>
  )
}