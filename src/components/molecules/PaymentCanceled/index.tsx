import IconClock from "../../atoms/IconClock";
import IconXCircle from "../../atoms/IconXCircle";

export default function PaymentCanceled() {

  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-white border md:w-100">
        <div className="card-body">
          <p className="text-xl text-red-400 mb-4 text-center">Solicitação de pagamento cancelada.</p>
          <div className="flex justify-center">
            <IconXCircle classes={"text-red-500 size-36"} />
          </div>

            <div className="flex justify-center">
              <div className="flex mb-4">
                <IconClock classes="size-6 animate-bounce"/>
                <p className="text-xl"> Sua sessão será encerrada em 30 segundos.</p>
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}