import { CustomerData } from "../api";

export type MpPurchaseItem = {
  productId: string,
  qty: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  pricePerPerson: number,
  minTotalPrice: number,
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
  customerData: CustomerData,
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