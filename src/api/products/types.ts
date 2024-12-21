export type PriceTypes = undefined | "single-value" | "variable-value" | "defined-value"

export type Product = {
  id: string,
  cityId: string,
  regionId: string,
  name: string,
  description: string,
  address: string,
  imgUrl: string,
  details: string,
  time: string,
  duration: string,
  priority: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  pricePerPerson: number,
  minTotalPrice: number,
  minPriceDescription: string,
  maxPaxDay: number,
  maxPerRound: number,
  showDisplay: boolean,
  isAvailable: boolean,
  freePaxRuleMsg: string,
  isFreePaxAllowed: boolean,
  halfPaxRuleMsg: string,
  isHalfPaxAllowed: boolean,
  notAvailableMessage: string,
  isTest: boolean,
  todayUnavailable: boolean,
  priceType: PriceTypes,
  netPrice1: number,
  netPrice2: number,
  netPrice3: number,
  netPrice4: number,
  partnerComm1: number,
  partnerComm2: number,
  partnerComm3: number,
  partnerComm4: number,
  companyComm1: number,
  companyComm2: number,
  companyComm3: number,
  companyComm4: number,
  isConsistent: boolean
  location: string,
  alignMessage: string,
  operatorName: string,
  operatorPhone: string,
  timestamp?: number,
  lastUpdated?: number,
}

export type Products = Product[];
