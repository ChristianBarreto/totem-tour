import { useEffect, useState } from "react";
import { CustomerData, PaymentIntent, paymentIntent, Products, Purchase, PurchaseItem, websiteUrl } from "../../../api";
import MethodSelector from "../MethodSelector";
import InstalmentsSelector from "../InstalmentsSelector";

const initPurchase = {
  cartPrice: 0,
  products: [] as PurchaseItem[],
  customerData: {} as CustomerData,
  paymentId: '',
  payementCaptured: false,
  paymentValue: 0,
  paymentMethod: 'debit_card',
  acceptedTerms: false,
}



export default function PaymentCard({
  cart,
  customerData,
}: {
  cart: Purchase,
  customerData: CustomerData,
}) {
  const [purchase, setPurchase] = useState<Purchase>(initPurchase)
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [isPayError, setIsPayError] = useState(false);
  const [paymentError, setPaymentError] = useState({});
  const [isPayExpired, setIsPayExpired] = useState(false);
  
  const [paymentStatus, setPaymentStatus] = useState({
    status: '',
    statusDetail: '',
    captured: false,
  });


  const expirationTime = 300000; // 300000 for 5 minutes
  const consultTime = 5000; // 5000 for 5 seconds
  const redirectToInitialTime = 30000 // 30000 for 30 seconds;

  const redirectToInitial = () => window.location.replace(`${websiteUrl}/totem`);


  useEffect(() => {
    setPurchase({
      ...cart,
      paymentMethod: 'debit_card',
      installments: 1,
      customerData: customerData,
      paymentValue: cart.cartPrice
    })
  }, [])

  const handlePay = () => {
    const payIntent: PaymentIntent = {
      device_id: "GERTEC_MP35P__8701372447462731",
      amount: purchase.paymentValue * 100,
      description: customerData.email,
      type: purchase.paymentMethod,
      print: true,
    }
    if (payIntent.type === 'credit_card') {
      payIntent['installments'] = purchase.installments
      payIntent['installments_cost'] = 'buyer'
    };
    console.log("Intent", payIntent)
    paymentIntent(payIntent);
  }


  return (

    <div className="flex justify-center">

      <div className="flex flex-col gap-4">

        <MethodSelector purchase={purchase} setPurchase={setPurchase} />
        <button
          className="btn btn-lg btn-primary mt-8"
          onClick={handlePay}
        >
          Pagar
        </button>

      </div>
    </div>
  )
}