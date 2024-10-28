import { PriceTypes } from "./api/api";
import { Availability } from "./api/availabilities/types";
import { Product } from "./api/products/types";

export const initProduct: Product = {
  cityId: '',
  description: '',
  details: '',
  id: '',
  imgUrl: '',
  maxPaxDay: 0,
  maxPerRound: 0,
  minPriceDescription: '',
  name: '',
  netPrice: 0,
  minTotalPrice: 0,
  partnerComm: 0,
  companyComm: 0,
  pricePerPerson: 0,
  time: '',
  duration: '',
  priority: 0,
  showDisplay: false,
  isAvailable: false,
  isFreePaxAllowed: false,
  freePaxRuleMsg: '',
  isHalfPaxAllowed: false,
  halfPaxRuleMsg: '',
  notAvailableMessage: '',
  isTest: false,
  address: '',
  todayUnavailable: true,
  priceType: undefined,
  netPrice1: 0,
  netPrice2: 0,
  netPrice3: 0,
  netPrice4: 0,
  partnerComm1: 0,
  partnerComm2: 0,
  partnerComm3: 0,
  partnerComm4: 0,
  companyComm1: 0,
  companyComm2: 0,
  companyComm3: 0,
  companyComm4: 0,
  isConsistent: false,
  location: '',
  alignMessage: '',
  operatorName: '',
  operatorPhone: '',
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const checkoutFieldValidation = (inputName: string, value: string) => {
  if (inputName === 'name'){
    return String(value)
    .toLowerCase()
    .match(
      /^[a-zA-Z]+( [a-zA-Z]+)+$/
    );
  } else 
  if (inputName === 'email') {
    return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  } else if (inputName === 'phone'){
    var regex = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/); 
    return regex.test(value);  
  }

  return true;
}

export const isValidName = (value: string) => {
  return String(value)
  .toLowerCase()
  .match(
    /^[a-zA-Z]+( [a-zA-Z]+)+$/
  );
}

export const isValidEmail = (value: string) => {
  return String(value)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export const isValidPhone = (value: string) => {
  var regex = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/); 
  return regex.test(value);
} 

export const PhoneMask = (value: string) => {
  let santizedValue = value
    .replace('(', '')
    .replace(')', '')
    .replace(" ", "")
    .replace("-", "")
  
  if ((santizedValue.length >= 2) && (santizedValue.length < 6)) {
    return `(${santizedValue.slice(0,2)}) ${santizedValue.slice(2,11)}`

  } else if (santizedValue.length >= 6 && (santizedValue.length < 11)) {
    return `(${santizedValue.slice(0,2)}) ${santizedValue.slice(2,6)}-${santizedValue.slice(6,11)}`

  } else if (santizedValue.length >= 11) {
    return `(${santizedValue.slice(0,2)}) ${santizedValue.slice(2,7)}-${santizedValue.slice(7,11)}`
  }
  return santizedValue;
}

export const objectChanged = (prod1: any, prod2: any) => {
  for (let i in prod1) {
    if (prod1[i as keyof any] !== prod2[i as keyof any]) {
      return true
    }
  }
  return false
}

export const pageCountDown = (location: string) => {
  if (location.includes('http://localhost:3000/totem')){
    if (location !== 'http://localhost:3000/totem'){
      return true
    }
  }
  if (location.includes('https://totem-tour.web.app/totem')){
    if (location !== 'https://totem-tour.web.app/totem'){
      return true
    }
  }
  return false
};

type PriceType = {
  type: PriceTypes,
  description: string,
};

export const priceTypes: PriceType[] = [
  {type: "single-value", description: "Valor único"},
  {type: "variable-value", description: "Valor variável"},
  {type: "defined-value", description: "Valor pré-definido"},
];

type Quantities = {
  qty: number,
  qtyAdult: number,
  qtyFree: number,
  qtyHalf: number,
}

type ProductPricesQty = {
  qty: number,
  qtyAdult: number,
  qtyFree: number,
  qtyHalf: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  netPrice1: number,
  partnerComm1: number,
  companyComm1: number,
  netPrice2: number,
  partnerComm2: number,
  companyComm2: number,
  netPrice3: number,
  partnerComm3: number,
  companyComm3: number,
  netPrice4: number,
  partnerComm4: number,
  companyComm4: number,
}

type CalcPrices = {
  price: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
}

const getProductPricesQty = (quantities: Quantities, product: Product): ProductPricesQty => ({
  qty: quantities.qty,
  qtyAdult: quantities.qtyAdult,
  qtyFree: quantities.qtyFree,
  qtyHalf: quantities.qtyHalf,
  netPrice: product.netPrice,
  partnerComm: product.partnerComm,
  companyComm: product.companyComm,
  netPrice1: product.netPrice1,
  partnerComm1: product.partnerComm1,
  companyComm1: product.companyComm1,
  netPrice2: product.netPrice2,
  partnerComm2: product.partnerComm2,
  companyComm2: product.companyComm2,
  netPrice3: product.netPrice3,
  partnerComm3: product.partnerComm3,
  companyComm3: product.companyComm3,
  netPrice4: product.netPrice4,
  partnerComm4: product.partnerComm4,
  companyComm4: product.companyComm4,
})

const calcSingleValue = (qtyPrices: ProductPricesQty): CalcPrices => {
  const {netPrice, partnerComm, companyComm } = qtyPrices;
  return {
    price: netPrice + partnerComm + companyComm,
    netPrice: netPrice,
    partnerComm: partnerComm,
    companyComm: companyComm,
  }
}

const calcVariableValue = (qtyPrices: ProductPricesQty): CalcPrices => {
  const {qtyAdult, qtyHalf, netPrice, partnerComm, companyComm} = qtyPrices;
  const unitPrice = netPrice + partnerComm + companyComm;

  return {
    price: adjPrice((qtyAdult * unitPrice) + (qtyHalf * unitPrice * 0.5)),
    netPrice: adjPrice((qtyAdult * netPrice) + (qtyHalf * netPrice * 0.5)),
    partnerComm: adjPrice((qtyAdult * partnerComm) + (qtyHalf * partnerComm * 0.5)),
    companyComm: adjPrice((qtyAdult * companyComm) + (qtyHalf * companyComm * 0.5)),
  };
}

const calcDefinedValue = (qtyPrices: ProductPricesQty): CalcPrices => {
  const {
    qty,
    netPrice1,
    partnerComm1,
    companyComm1,
    netPrice2,
    partnerComm2,
    companyComm2,
    netPrice3,
    partnerComm3,
    companyComm3,
    netPrice4,
    partnerComm4,
    companyComm4,
  } = qtyPrices;

  if (qty === 1) {
    return {
      price: netPrice1 + partnerComm1 + companyComm1,
      netPrice: netPrice1,
      partnerComm: partnerComm1,
      companyComm: companyComm1,
    };
  }
  if (qty === 2) {
    return {
      price: netPrice2 + partnerComm2 + companyComm2,
      netPrice: netPrice2,
      partnerComm: partnerComm2,
      companyComm: companyComm2,
    };
  }
  if (qty === 3) {
    return {
      price: netPrice3 + partnerComm3 + companyComm3,
      netPrice: netPrice3,
      partnerComm: partnerComm3,
      companyComm: companyComm3,
    };
  }
  if (qty === 4) {
    return {
      price: netPrice4 + partnerComm4 + companyComm4,
      netPrice: netPrice4,
      partnerComm: partnerComm4,
      companyComm: companyComm4,
    };
  }
  return {
    price: 0,
    netPrice: 0,
    partnerComm: 0,
    companyComm: 0,
  };
}

export const calcPrice = (quantities: Quantities, product: Product): CalcPrices => {
  const productPricesQty: ProductPricesQty = getProductPricesQty(quantities, product)

  if (quantities.qty < 1) {
    return {
      price: 0,
      netPrice: 0,
      partnerComm: 0,
      companyComm: 0,
    };
  } 

  if (product.priceType === "single-value"){
    return calcSingleValue(productPricesQty)
  }

  if (product.priceType === "variable-value") {
    console.log(calcVariableValue(productPricesQty))
    return calcVariableValue(productPricesQty)
  }

  if (product.priceType === "defined-value") {
    return calcDefinedValue(productPricesQty);
  }

  return {
    price: 0,
    netPrice: 0,
    partnerComm: 0,
    companyComm: 0,
  };
};

export const productCanBeDisplayed = (product: Product) => {
  if (
    (product.imgUrl?.length > 10) &&
    (product.notAvailableMessage?.length) &&
    (product.name?.length) &&
    (product.description?.length) &&
    (product.cityId?.length)
  ) {
    return true
  }
  return false;
}

const logPriceConsistent = (product: Product) => console.log({
  aAName: product.name,
  aBpriceType: product.priceType,

  bAnetPrice1: product.netPrice1,
  bBpartnerComm1: product.partnerComm1,
  bCcompanyComm1: product.companyComm1,

  cAnetPrice2: product.netPrice2,
  cBpartnerComm2: product.partnerComm2,
  cCcompanyComm2: product.companyComm2,

  dAnetPrice3: product.netPrice3,
  dBpartnerComm4: product.partnerComm3,
  dCcompanyComm4: product.companyComm3,

  eAnetPrice4: product.netPrice4,
  eBpartnerComm4: product.partnerComm4,
  eCcompanyComm4: product.companyComm4,
  fAresult: (product.netPrice1 > 0)
  && (product.partnerComm1 > 0)
  && (product.companyComm1 > 0)
  && (product.netPrice2 > 0)
  && (product.partnerComm2 > 0)
  && (product.companyComm2 > 0)
  && (product.netPrice3 > 0)
  && (product.partnerComm3 > 0)
  && (product.companyComm3 > 0)
  && (product.netPrice4 > 0)
  && (product.partnerComm4 > 0)
  && (product.companyComm4 > 0)
})

export const priceIsConsistentCheck = (product: Product) => {
  // TODO: Add all necessary info to put a product on live, show a flag on admin/products
  // logPriceConsistent(product)
  if (product.priceType === "single-value") {
    if (
      (product.netPrice > 0)
      && (product.partnerComm > 0)
      && (product.companyComm > 0)
    ) {
      return true;
    }
  }
  if (product.priceType === "variable-value") {
    if (
      (product.netPrice > 0)
      && (product.partnerComm > 0)
      && (product.companyComm > 0)
    ) {
      return true;
    }
  }
  if (product.priceType === "defined-value") {
    if (
      (product.netPrice1 > 0)
      && (product.partnerComm1 > 0)
      && (product.companyComm1 > 0)
      && (product.netPrice2 > 0)
      && (product.partnerComm2 > 0)
      && (product.companyComm2 > 0)
      && (product.netPrice3 > 0)
      && (product.partnerComm3 > 0)
      && (product.companyComm3 > 0)
      && (product.netPrice4 > 0)
      && (product.partnerComm4 > 0)
      && (product.companyComm4 > 0)
    ) {
      return true;
    }
  }
  return false;
}

export const infoConsistentCheck = (product: Product) => {
  if (
    (product.details?.length)
    && (product.address?.length)
    && (product.location?.length)
    && (product.time?.length) 
    && (product.duration?.length) 
    && (product.alignMessage?.length) 
    && (product.maxPaxDay > 0) 
    && (product.maxPerRound > 0) 
    && (product.priceType === "single-value" || "variable-value" || "defined-price")
    && (product.operatorName?.length) 
    && (product.operatorPhone?.length) 
  ) {
    return true;
  }
  return false
}

export const productCanBeAvailable = (product: Product) => {
  const priceIsConsistent = priceIsConsistentCheck(product);
  const infoIsConsistent = infoConsistentCheck(product);
  

  return priceIsConsistent && infoIsConsistent
}


export const qtySelectorDisabler = (availability: Availability | null) => {
  if (availability !== null) {
    return false
  }
  return true
}

export const adjPrice = (value: number): number => Number(Math.round(value));

export const displayPrice = (value: number) => new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value/100);
