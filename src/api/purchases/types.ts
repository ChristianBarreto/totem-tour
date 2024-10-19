import { Customer } from "../customers/types"
import { CartItemType } from "../purchaseitems/types"

export type Purchase = { // TODO: melhorar tipo do carrinho x tipo da compra que vai p/ DB
  id: string,
  customerId: string,
  acceptedTerms: boolean,
  cartPrice: number,
  payementCaptured: boolean,
  paymentId: string,
  paymentMethod: string,
  paymentValue: number,
  totemId: string,
  timestamp: number,
  lastUpdated: number,
  customerMsg: boolean,
  operatorMsg: boolean,
  partnerMsg: boolean,
}

export type NewPurchase = {
  cartPrice: number,
  products: CartItemType[],
  customerData: Customer,
  paymentId: string,
  payementCaptured: boolean,
  paymentValue: number,
  paymentMethod: string,
  acceptedTerms: boolean,
  installments?: number,
  totemId: string,
}