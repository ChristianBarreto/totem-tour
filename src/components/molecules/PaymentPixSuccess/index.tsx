import IconCheckCircle from "../../atoms/IconCheckCircle";
import IconLoading from "../../atoms/IconLoading";

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
            <p className="text-xl text-center">Você receberá as informações dos seus passeios por WhatsApp/E-mail.</p>
            <p className="text-xl text-center">(sua sessão será encerrada em 20 segundos)</p>
          </div>
        </div>
      </div>
    </div>
  )
}