import { CustomerData } from "../api"
import { PurchaseItem } from "../purchaseitems/types"

export type PurchaseDb = { // TODO: melhorar tipo do carrinho x tipo da compra que vai p/ DB
  id: string,
  customerId: string,
  acceptedTerms: boolean,
  cartPrice: number,
  payementCaptured: boolean,
  paymentId: number,
  paymentMethod: string,
  paymentValue: number,
  totemId: string,
  timestamp: number,
  lastUpdated: number,
  customerMsg: boolean,
  operatorMsg: boolean,
  partnerMsg: boolean,
}

export type Purchase = {
  cartPrice: number,
  products: PurchaseItem[],
  customerData: CustomerData,
  paymentId: string,
  payementCaptured: boolean,
  paymentValue: number,
  paymentMethod: string,
  acceptedTerms: boolean,
  installments?: number,
  totemId: string,
}