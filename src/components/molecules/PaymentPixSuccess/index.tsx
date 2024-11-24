import IconCheckCircle from "../../atoms/IconCheckCircle";
import IconClock from "../../atoms/IconClock";

export default function PaymentPixSuccess() {
  return (
    <div className="flex justify-center">
      <div className="align-center">

        <div className="card card-compact bg-white border md:w-100">
          <div className="card-body">
            <p className="text-2xl text-primary text-center">Pagamento feito com sucesso</p>
            <div className="flex justify-center">
              <IconCheckCircle  classes="text-primary size-36"/>
            </div>
            <p className="text-xl text-center">Você receberá as informações dos seus passeios por WhatsApp/E-mail <span className="font-bold">em até 1h</span>.</p>
            
            <div className="flex justify-center">
              <div className="flex mb-4">
                <IconClock classes="size-6 animate-bounce"/>
                <p className="text-xl"> Sua sessão será encerrada em 30 segundos.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}