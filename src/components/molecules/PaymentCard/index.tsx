import { useEffect, useState } from "react";
import { websiteUrl } from "../../../api/api";
import { Customer } from "../../../api/customers/types";
import { Totem } from "../../../api/totems/types";
import { PaymentIntent } from "../../../api/mercadopago/types";
import { NewPurchase } from "../../../api/purchases/types";
import { cancelLastPaymentIntent, getPaymentIntentStatus, paymentIntent } from "../../../api/mercadopago/api";
import { CartItemType } from "../../../api/purchaseitems/types";
import { setNewPurchase } from "../../../api/purchases/api";
import { verifyPayment } from "../../../api/mercadopago/api";
import MethodSelector from "../MethodSelector";
import PaymentLoading from "../PaymentLoading";
import PaymentError from "../PaymentError";
import PaymentCardInvoice from "../PaymentCardInvoice";
import PaymentExpired from "../PaymentExpired";
import PaymentPixSuccess from "../PaymentPixSuccess";
import PaymentCanceled from "../PaymentCanceled";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../firebase";

const initNewPurchase: NewPurchase = {
  cartPrice: 0,
  totalNetPrice: 0,
  totalPartnerComm: 0,
  totalCompanyComm: 0,
  products: [] as CartItemType[],
  customerData: {} as Customer,
  paymentId: '',
  payementCaptured: false,
  paymentValue: 0,
  paymentMethod: 'debit_card',
  acceptedTerms: false,
  totemId: ''
}

type CardProcessStatus = | 'select_method'
                        | 'creating_intent' 
                        | 'intent_error' 
                        | 'awaiting_payment'
                        | 'payment_rejected'
                        | 'payment_expired'
                        | 'awaiting_store_purchase'
                        | 'purchase_stored'
                        | 'purchase_store_failed'
                        

export default function PaymentCard({
  cart,
  customerData,
  totem,
}: {
  cart: NewPurchase,
  customerData: Customer,
  totem: Totem,
}) {
  const [purchase, setPurchase] = useState<NewPurchase>(initNewPurchase);
  const [paymentError, setPaymentError] = useState({});
  const [payIntent, setPayIntent] = useState<any>({});

  const [cardProcessStatus, setCardProcessStatus] = useState<CardProcessStatus>('select_method')

  const expirationTime = 300000; // 300000 for 5 minutes
  const consultTime = 5000; // 5000 for 5 seconds
  const redirectToInitialTime = 30000 // 30000 for 30 seconds;

  const redirectToInitial = () => window.location.replace(`${websiteUrl}/totem`);

  useEffect(() => {
    logEvent(analytics, `checkout_payment_card`)
  }, [])

  const handlePay = () => {
    setCardProcessStatus('creating_intent')

    const payIntent: PaymentIntent = {
      device_id: totem.posId,
      amount: purchase.paymentValue,
      description: customerData.email,
      type: purchase.paymentMethod,
      print: false,
    }
    if (payIntent.type === 'credit_card') {
      payIntent['installments'] = purchase.installments
      payIntent['installments_cost'] = 'buyer'
    };

    paymentIntent(payIntent).then((res) => {
      setCardProcessStatus('awaiting_payment');
      setPayIntent(res);
    }).catch((err) => {
      setCardProcessStatus('intent_error');
      console.log(err);
    });
  }

  useEffect(() => {
    if (cardProcessStatus === 'select_method') {
      setPurchase({
        ...cart,
        paymentMethod: 'debit_card',
        installments: 1,
        customerData: customerData,
        paymentValue: cart.cartPrice
      })
      
    } else if (cardProcessStatus === 'creating_intent') {

    } else if (cardProcessStatus === 'intent_error') {

      setInterval(() => {
        redirectToInitial()
      }, redirectToInitialTime);

    } else if (cardProcessStatus === 'awaiting_payment') {

      if(payIntent.id) {
        const consultTimer = setInterval(() => {
          getPaymentIntentStatus({payment_intent_id:  payIntent.id}).then((res) => {
            console.log("INTENT STATUS", res)
            if (res.state === "FINISHED") {
                clearInterval(consultTimer)              
              verifyPayment({
                id: res.payment.id,
                transaction_amount: cart.cartPrice
              }).then((res) => {
                console.log("PAYMENT STATUS", res)
                if (res.captured) {
                  logEvent(analytics, `checkout_payment_card_confirmed`)
                  setPurchase({
                    ...purchase,
                    cartPrice: cart.cartPrice,
                    totalNetPrice: cart.totalNetPrice,
                    totalPartnerComm: cart.totalPartnerComm,
                    totalCompanyComm: cart.totalCompanyComm,    
                    products: cart.products,
                    customerData: customerData,
                    paymentId: res.id,
                    payementCaptured: res.captured,
                    paymentValue: res.transaction_amount,
                    paymentMethod: res.payment_method_id,
                    acceptedTerms: true,
                    totemId: totem.id
                  })

                  setNewPurchase({
                    cartPrice: cart.cartPrice,
                    totalNetPrice: cart.totalNetPrice,
                    totalPartnerComm: cart.totalPartnerComm,
                    totalCompanyComm: cart.totalCompanyComm,    
                    products: cart.products,
                    customerData: customerData,
                    paymentId: res.id,
                    payementCaptured: res.captured,
                    paymentValue: res.transaction_amount * 100, // Convert MP response from reais to cents
                    paymentMethod: res.payment_method_id,
                    acceptedTerms: true,
                    totemId: totem.id
                  }).then((res) => {
                    setCardProcessStatus('purchase_stored') // se store purchase success
                    console.log("SUCCESS", res)
                  }).catch((err) => {
                    setCardProcessStatus('purchase_store_failed') // se store purchase success
                    console.log("Purchase ERROR", err)
                  });
                }else {
                  setCardProcessStatus('payment_rejected')
                }
                
              }).catch((err) => {
                console.log("err", err)
                // setCardProcessStatus('payment_rejected') // aqui deve ser tradado para tentar verificar status novamente
              })
              setCardProcessStatus('awaiting_store_purchase') // implementar dentro do store purchase


  
            }else if (res.state === "CANCELED") {
              setCardProcessStatus('payment_rejected')
  
              clearInterval(consultTimer)
            }
          }).catch((err) => {
            console.log("Payment Status error", err)
            clearInterval(consultTimer)
          })
        }, consultTime)
  
        const expireTimer = setTimeout(() => {
          cancelLastPaymentIntent({
            device_id: totem.posId,
          }).then((res) => {
            clearTimeout(expireTimer);
          }).catch((err) => {
            clearTimeout(expireTimer);
            console.log(err)
          })
        }, expirationTime);
      }
  
    } else if (cardProcessStatus === 'payment_rejected') {
      setInterval(() => {
        redirectToInitial()
      }, redirectToInitialTime);

    } else if (cardProcessStatus === 'payment_expired') {
      setInterval(() => {
        redirectToInitial()
      }, redirectToInitialTime);

    } else if (cardProcessStatus === 'awaiting_store_purchase') {

    } else if (cardProcessStatus === 'purchase_stored') {
      setInterval(() => {
        redirectToInitial()
      }, redirectToInitialTime);
    }


  }, [cardProcessStatus])

    return (

    <div className="flex justify-center">

      <div className="flex flex-col gap-4">

        {cardProcessStatus === 'select_method' && <MethodSelector purchase={purchase} setPurchase={setPurchase} handlePay={handlePay} />}

        {cardProcessStatus === 'creating_intent' && <PaymentLoading />}

        {cardProcessStatus === 'intent_error' && <PaymentError errorData={paymentError}/>}

        {cardProcessStatus === 'awaiting_payment' && <p><PaymentCardInvoice /></p>}

        {cardProcessStatus === 'payment_rejected' && <PaymentCanceled />}

        {cardProcessStatus === 'payment_expired' && <PaymentExpired />}

        {cardProcessStatus === 'awaiting_store_purchase' && <PaymentLoading />}

        {cardProcessStatus === 'purchase_stored' && <PaymentPixSuccess />}

      </div>

    </div>
  )
}