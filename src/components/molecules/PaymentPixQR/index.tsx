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
          <p className="text-xl pb-4"><span className="font-bold">Valor:</span> R$ {total?.toFixed(2)}</p>
          <p className="text-xl pb-4">Assim que for pago, sua reserva será efetivada.</p>
          <p className="text-xl pb-4">Este QR Code PIX expira em 5 minutos.</p>
        </div>
      </div>
    </div>
  )
}