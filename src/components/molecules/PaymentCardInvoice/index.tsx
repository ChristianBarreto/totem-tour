import IconClock from "../../atoms/IconClock";
import pinpadimage from './maquininha.png';

export default function PaymentCardInvoice() {
  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-white border md:w-100">
        <div className="card-body text-center">
          <p className="text-2xl text-primary text-center">Pagamento com cartão</p>
          <div className="text-start p-4 m-2 border-t border-b">
            <p className="text-xl text-center mb-4">Faça o pagamento na maquininha conforme as instruções abaixo:</p>
            <img src={pinpadimage} alt='maquininha' width={70} className="ml-auto mr-auto pb-2"/>

            <ul className="steps steps-vertical">
              <li className="step">
                  <p className="text-xl">
                    Aperte o botão <span className="font-bold bg-green-500 text-white p-1 rounded">VERDE</span> da maquininha.
                  </p>
              </li>
              <li className="step">
                <p className="text-xl pb-4">
                  <span className="font-bold">Aproxime</span> ou <span className="font-bold">insira</span> seu cartão e digite a senha se solicitado.
                </p>
              </li>
              <li className="step">
                  <p className="text-xl pb-4">Aperto o botão <span className="font-bold bg-green-500 text-white p-1 rounded">VERDE</span> para confirmar o pagamento.</p>
              </li>
            </ul>
            <p className="pl-12 pt-4 pb-4">(ou aperto o botão <span className="font-bold bg-red-500 text-white p-1 rounded">vermelho</span> para cancelar o pagamento)</p>

            
          </div>
   
          
          <div className="flex justify-center">

            <div className="flex mb-4">
              <IconClock classes="size-6 animate-bounce"/>
              <p className="text-xl">Aguardando o pagamento.</p>
            </div>

          </div>
          <p style={{marginTop: '-20px'}}>(Este pagamento expira em 5 minutos)</p>
          <p className="text-sm pt-4 pb-4 font-bold">Digital Storm Serviços de Tecnologia LTDA. <br /> CNPJ: 46.547.192/0001-51</p>

        </div>
      </div>
    </div>
  )
}