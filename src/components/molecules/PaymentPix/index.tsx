import { useEffect, useState } from "react";
import PaymentError from "../PaymentError";
import { websiteUrl } from "../../../api/api";
import { Customer } from "../../../api/customers/types";
import { Totem } from "../../../api/totems/types";
import { NewPurchase } from "../../../api/purchases/types";
import { setNewPurchase } from "../../../api/purchases/api";
import { generatePixPayment, verifyPayment } from "../../../api/mercadopago/api";
import PaymentLoading from "../PaymentLoading";
import PaymentExpired from "../PaymentExpired";
import PaymentPixQR from "../PaymentPixQR";
import PaymentPixSuccess from "../PaymentPixSuccess";
import { logEvents } from "../../../firebase";

export default function PaymentPix({
  cart,
  customerData,
  totem,
  setPayOption,
}: {
  cart: NewPurchase,
  customerData: Customer,
  totem: Totem,
  setPayOption: (value: number) => void
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
  const [purchase, setPurchase] = useState<NewPurchase>({
    cartPrice: 0,
    totalNetPrice: 0,
    totalPartnerComm: 0,
    totalCompanyComm: 0,
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
              logEvents(`checkout_payment_pix_confirmed`, {totemNickName: totem.nickName})
              const status = {
                status: res.status,
                statusDetail: res.status_detail,
                captured: res.captured, // set this to true to simulate payment success or to res.captured to run in prod
              }
              setPaymentStatus(status)
              setPurchase({
                cartPrice: cart.cartPrice,
                totalNetPrice: cart.totalNetPrice,
                totalPartnerComm: cart.totalPartnerComm,
                totalCompanyComm: cart.totalCompanyComm,
                products: cart.products,
                customerData: customerData,
                paymentId: pix.paymentId,
                payementCaptured: status.captured,
                paymentValue: pix.transaction_details.total_paid_amount * 100, // Convert received reais from MP to cents 
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
  }, [purchase]);

  useEffect(() => {
    if (totem?.nickName) {
      logEvents(`checkout_payment_pix`, {totemNickName: totem.nickName});
    }
  }, [totem]);

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
        <button
          className="btn btn-lg"
          onClick={() => setPayOption(0)}
          data-cy="payment-method-back"
        >
          Escolher outra forma de pagamento
        </button>
    </>
  )
}