export type CartItemType = {
  productId: string,
  qty: number,
  qtyAdult: number,
  qtyFree: number,
  qtyHalf: number,
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

export type PurchaseItem = { // TODO: melhorar tipo do carrinho x tipo da compra que vai p/ DB
  id: string,
  purchaseId: string,
  productId: string,
  qty: number,
  qtyAdult: number,
  qtyFree: number,
  qtyHalf: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  totalPrice: number,
  date: string,
  cityId: string,
  totemId: string,
  lastUpdate: number,
  timestamp: number,
}

type PurcahseItemSideData = {
  cityName: string,
  productName: string,
  productTime: string,
  productDuration: string
  productAlignMessage: string,
  productAddres: string,
  productLocation: string,
  productOperatorName: string,
  productOperatorPhone: string,
}

export type PurchaseItemResp = PurchaseItem & PurcahseItemSideData;

