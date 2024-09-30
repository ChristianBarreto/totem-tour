import { useEffect, useState } from "react";
import PaymentError from "../PaymentError";
import { CustomerData, pixPayment, Purchase } from "../../../api";
import IconChevronDown from "../../atoms/IconChevronDown";

export default function PaymentPix({
  cart,
  customerData,
}: {
  cart: Purchase
  customerData: CustomerData,
}) {
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [isPayError, setIsPayError] = useState(false);
  const [paymentError, setPaymentError] = useState({});
  const [isPayExpired, setIsPayExpired] = useState(false);
  const [pix, setPix] = useState({
    transaction_data: {
      qr_code_base64: '',
    },
    transaction_details: {
      total_paid_amount: 0,
    }
  });

  useEffect(() => {
    let ignore = false;
    setPaymentLoading(true)

    const consultTimer = setInterval(() => {
      console.log("Consulta PIX")
    }, 5000);

    const secondTimer = setInterval(() => {
      setIsPayExpired(true);
    }, 20000);
   
    const purchase = {
      ...cart,
      customerData: customerData,
      paymentMethod: 'pix',
    }
    
    pixPayment(purchase).then((res) => {
      if (!ignore) {
        setPaymentLoading(false)
        setIsPayError(false);
        setPaymentError({})

        setPix({
          transaction_data: res.point_of_interaction.transaction_data,
          transaction_details: res.transaction_details
        });
        // console.log("Payment ID", res.id)
        // console.log("Date of expiration", res.date_of_expiration)
        // console.log("Taxas", res.charges_details)
        // console.log(res)


      }
    }).catch((err) => {
      if (!ignore) {
        console.log("API ERROR:", err)
        setIsPayError(true);
        setPaymentError(err.response?.data)
        setPaymentLoading(false)
      }
    })

    return () => {
      ignore = true;
      clearInterval(consultTimer);
      clearInterval(secondTimer);
    };
  }, []);
  
  return (

    <>
      {paymentLoading ? (
        <div className="flex justify-center">
          <div className="align-center">
            <div>
              <p>
                <span>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </p>
            </div>
 
          </div>
        </div>
    
      ): (
        <>
          {isPayError ? (
            <PaymentError errorData={paymentError}/>
          ): (
            <>
              {isPayExpired ? (
                <div className="flex justify-center">
                  <div>
                    <p className="text-xl text-red-400 mb-4 text-center">QR Code PIX expirado</p>
                    <p className="text-xl mb-4 text-center">Volte aos meios de pagamento e faça a solicitação novamente.</p>
                  </div>
                </div>
              ): (
                <div className="flex justify-center">
                  <div className="text-center">
                    <p className="text-xl pb-4">Pague com PIX QR Code</p>
                    <p className="text-xl pb-4">Aguardando pagamento...</p>
                    <p className="text-xl pb-4"><span className="font-bold">Valor:</span> R$ {pix.transaction_details.total_paid_amount?.toFixed(2)}</p>
                    <img src={`data:image/jpeg;base64,${pix.transaction_data.qr_code_base64}`} alt="QR Code" width={400}/>
                    <p className="text-xl pb-4">Assim que for pago, sua reserva será efetivada.</p>
                    <p className="text-xl pb-4">Este QR Code PIX expira em 3 minutos.</p>
                  </div>
                </div>
              )}
            </>

          )}
        </>
      )}
    </>
  )
}