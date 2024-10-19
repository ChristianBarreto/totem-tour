import { useEffect, useState } from "react";
import PaymentError from "../PaymentError";
import { CustomerData, Purchase, setNewPurchase, Totem, websiteUrl } from "../../../api/api";
import { generatePixPayment, verifyPayment } from "../../../api/mercadopago/api";
import PaymentLoading from "../PaymentLoading";
import PaymentExpired from "../PaymentExpired";
import PaymentPixQR from "../PaymentPixQR";
import PaymentPixSuccess from "../PaymentPixSuccess";

export default function PaymentPix({
  cart,
  customerData,
  totem,
}: {
  cart: Purchase,
  customerData: CustomerData,
  totem: Totem,
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
  const [purchase, setPurchase] = useState<Purchase>({
    cartPrice: 0,
    products: [],
    customerData: {
      name: '',
      email: '',
      phone: '',
    },
    paymentId: '',
    payementCaptured: false,
    paymentValue: 0,
    paymentMethod: '',
    acceptedTerms: false,
    totemId: ''
  })
  const expirationTime = 300000; // 300000 for 5 minutes
  const consultTime = 5000; // 5000 for 5 seconds
  const redirectToInitialTime = 30000 // 30000 for 30 seconds;

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
  
            if(res.captured){ // set this to true to simulate payment success or to res.captured to run in prod
              clearInterval(consultTimer);
              const status = {
                status: res.status,
                statusDetail: res.status_detail,
                captured: res.captured, // set this to true to simulate payment success or to res.captured to run in prod
              }
              setPaymentStatus(status)
              setPurchase({
                cartPrice: cart.cartPrice,
                products: cart.products,
                customerData: customerData,
                paymentId: pix.paymentId,
                payementCaptured: status.captured,
                paymentValue: pix.transaction_details.total_paid_amount,
                paymentMethod: 'pix',
                acceptedTerms: true,
                totemId: totem.id
              })
            }
          }
  
        }).catch((err) => {
          if (!ignore) {
            clearInterval(consultTimer);
            console.log("CATCH", err)
          }
        });
      }

    }, consultTime);

    const expireTimer = setInterval(() => {
      setIsPayExpired(true);
    }, expirationTime);

    return () => {
      ignore = true;
      clearInterval(consultTimer);
      clearInterval(expireTimer);
    };
  }, [pix, isPayError, isPayExpired]);


  if (paymentStatus.captured || isPayError || isPayExpired) {
    setInterval(() => {
      redirectToInitial()
    }, redirectToInitialTime);
  }

  useEffect(() => {
    console.log(purchase)
    if (purchase.payementCaptured) {
      console.log("SEND")
      setNewPurchase(purchase).then((res) => {
        console.log("SUCCESS", res)
      }).catch((err) => {
        console.log("Purchase ERROR", err)
      });
    }
  }, [purchase])

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