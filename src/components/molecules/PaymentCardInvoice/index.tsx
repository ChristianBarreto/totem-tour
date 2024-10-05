import IconClock from "../../atoms/IconClock";

export default function PaymentCardInvoice({
}: {
}) {
  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-white border md:w-100">
        <div className="card-body text-center">
          <p className="text-2xl text-primary text-center">Pagamento com cartão</p>
          <div className="text-start p-4 m-2 border-t border-b">
            <p className="text-xl pb-4">
              1. Aperte o botão <span className="font-bold bg-green-500 text-white p-1 rounded">VERDE</span> da maquininha.
            </p>
            <img src={require('./maquininha.png')} alt='maquininha' width={70} className="ml-auto mr-auto pb-2"/>
            <p className="text-xl pb-4">
              2. <span className="font-bold">Aproxime</span> ou <span className="font-bold">insira</span> seu cartão e digite a senha se solicitado.
            </p>
            <p className="text-xl pb-4">3. Aperto o botão <span className="font-bold bg-green-500 text-white p-1 rounded">VERDE</span> para confirmar o pagamento.</p>
          </div>
          
          
          <div className="flex justify-center">
            <div className="flex mb-4">
              <IconClock classes="size-6 animate-bounce"/>
              <p className="text-xl">Aguardando o pagamento.</p>
            </div>

          </div>
          <p style={{marginTop: '-20px'}}>(Este pagamento expira em 5 minutos)</p>

        </div>
      </div>
    </div>
  )
}