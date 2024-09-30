import IconLoading from "../../atoms/IconLoading";

export default function PaymentLoading() {
  return (
    <div className="flex justify-center">
      <div className="align-center">
        <div className="card card-compact bg-white border md:w-100">
          <div className="card-body">

            <p className="text-xl text-primary-400 mb-4 text-center">Carregando sua solicitação de pagamento.</p>
            <div className="flex justify-center">
              <IconLoading classes="size-36 text-primary"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}