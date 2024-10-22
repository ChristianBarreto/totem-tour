import { Customer } from "../customers/types" 

export type MpPurchaseItem = {
  productId: string,
  qty: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  totalPrice: number,
  date: string,
  time: string,
  cityId: string,
  local: string,
  location: string,
  operatorName: string,
  operatorPhone: string,
  totemId: string,
}

export type MpPurchase = {
  cartPrice: number,
  products: MpPurchaseItem[],
  customerData: Customer,
  paymentId: string,
  payementCaptured: boolean,
  paymentValue: number,
  paymentMethod: string,
  acceptedTerms: boolean,
  installments?: number,
  totemId: string,
}

export type MpVerifyPayment = {
  id: string,
  transaction_amount: number
}

export type PosMode = {
  mode: string
}

export type PaymentIntent = {
  device_id: string,
  amount: number,
  description: string,
  installments?: number,
  installments_cost?: string
  type: string,
  print: boolean,
}

export type CancelPaymentIntent = {
  device_id: string,
}

export type PaymentInterStatus = {
  payment_intent_id: string,
}
