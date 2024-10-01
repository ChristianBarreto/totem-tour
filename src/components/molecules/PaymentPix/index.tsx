import { useEffect, useRef, useState } from "react";
import PaymentError from "../PaymentError";
import { CustomerData, generatePixPayment, Purchase, verifyPayment, websiteUrl } from "../../../api";
import PaymentLoading from "../PaymentLoading";
import PaymentExpired from "../PaymentExpired";
import PaymentPixQR from "../PaymentPixQR";
import PaymentPixSuccess from "../PaymentPixSuccess";

export default function PaymentPix({
  cart,
  customerData,
  setPayOption,
}: {
  cart: Purchase,
  customerData: CustomerData,
  setPayOption: (value: number) => void,
}) {
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [isPayError, setIsPayError] = useState(false);
  const [paymentError, setPaymentError] = useState({});
  const [isPayExpired, setIsPayExpired] = useState(false);
  const [pix, setPix] = useState({
    paymentId: '',
    transaction_data: {
      qr_code_base64: '',
    },
    transaction_details: {
      total_paid_amount: 0,
    }
  });
  const [paymentStatus, setPaymentStatus] = useState({
    status: '',
    statusDetail: '',
    captured: false,
  });
  
  const redirectToInitial = () => window.location.replace(`${websiteUrl}/totem`);

  useEffect(() => {
    let ignore = false;
    setPaymentLoading(true)

    const purchase = {
      ...cart,
      customerData: customerData,
      paymentMethod: 'pix',
    }
    
    generatePixPayment(purchase).then((res) => {
      if (!ignore) {
        setPaymentLoading(false);
        setIsPayError(false);
        setPaymentError({});
        setPix({
          paymentId: res.id,
          transaction_data: res.point_of_interaction.transaction_data,
          transaction_details: res.transaction_details
        });
      }
    }).catch((err) => {
      if (!ignore) {
        console.log("API ERROR:", err);
        setIsPayError(true);
        setPaymentError(err.response?.data);
        setPaymentLoading(false);
      }
    })
    
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const payment = {
      id: pix.paymentId,
      transaction_amount: pix.transaction_details.total_paid_amount
    }
    
    const consultTimer = setInterval(() => {

      if (!isPayError && !isPayExpired) {
        verifyPayment(payment).then((res) => {
          if (!ignore) {
            console.log("THEN", res)
  
            if(true){ // set this to true to simulate payment success or to res.captured to run in prod
              clearInterval(consultTimer);
              const status = {
                status: res.status,
                statusDetail: res.status_detail,
                captured: true, // set this to true to simulate payment success or to res.captured to run in prod
              }
              setPaymentStatus(status)
            }
          }
  
        }).catch((err) => {
          if (!ignore) {
            clearInterval(consultTimer);
            console.log("CATCH", err)
          }
        });
      }

    }, 5000);

    const secondsTimer = setInterval(() => {
      setIsPayExpired(true);
    }, 300000);

    return () => {
      ignore = true;
      clearInterval(consultTimer);
      clearInterval(secondsTimer);
    };
  }, [pix, isPayError, isPayExpired]);


  if (paymentStatus.captured || isPayError || isPayExpired) {
    setTimeout(() => {
      redirectToInitial()
    }, 30000);
  }
  
  return (

    <>
      {paymentLoading ? (
        <PaymentLoading />
      ): (
        <>
          {isPayError && <PaymentError errorData={paymentError}/>}

          {(!isPayError && isPayExpired) && <PaymentExpired />}

          {(!isPayError && !isPayExpired && !paymentStatus.captured) && (
            <PaymentPixQR total={pix.transaction_details.total_paid_amount} qrCode={pix.transaction_data.qr_code_base64} />
          )}

          {(!isPayError && !isPayExpired && paymentStatus.captured) && (
            <PaymentPixSuccess />
          )}

          {paymentStatus.captured && ( // change to paymentStatus.captured to prod
            <button className="btn" onClick={redirectToInitial}>Encerrar o uso do totem</button>
          )}

       </>
      )}
    </>
  )
}