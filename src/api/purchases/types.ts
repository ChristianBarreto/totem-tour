import { Customer } from "../customers/types"
import { CartItemType } from "../purchaseitems/types"

export type Purchase = {
  id: string,
  customerId: string,
  totemId: string,
  acceptedTerms: boolean,
  cartPrice: number,
  paymentValue: number,
  payementCaptured: boolean,
  paymentId: string,
  paymentMethod: string,
  installments?: number,
  customerMsg: boolean,
  operatorsMsg: boolean,
  operatorsConfirmed: boolean,
  partnerMsg: boolean,
  timestamp: number,
  lastUpdated: number,
}

export type NewPurchase = {
  acceptedTerms: boolean,
  totemId: string,
  cartPrice: number,
  paymentValue: number,
  payementCaptured: boolean,
  paymentId: string,
  paymentMethod: string,
  installments?: number,
  customerData: Customer,
  products: CartItemType[],
}