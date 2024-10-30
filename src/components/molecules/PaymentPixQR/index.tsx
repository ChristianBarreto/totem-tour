import IconClock from "../../atoms/IconClock";

export default function PaymentPixQR({
  total,
  qrCode,
}: {
  total: number,
  qrCode: string,
}) {
  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-white border md:w-100">
        <div className="card-body text-center">
          <p className="text-2xl text-primary text-center">Pague com PIX QR Code</p>
          <img src={`data:image/jpeg;base64,${qrCode}`} alt="QR Code" width={400}/>
          <p className="text-xl pb-4">Aguardando pagamento...</p>
          <p className="text-xl pb-2"><span className="font-bold">Valor:</span> R$ {total?.toFixed(2)}</p>
          <p className="text-sm pb-4 font-bold">Digital Storm Serviços de Tecnologia LTDA. <br /> CNPJ: 46.547.192/0001-51</p>
          <p className="text-xl pb-4">Assim que for pago, sua reserva será efetivada.</p>
          
          <div className="flex justify-center">
            <div className="flex mb-4">
              <IconClock classes="size-6 animate-bounce"/>
              <p className="text-xl">Este QR Code PIX expira em 5 minutos.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}