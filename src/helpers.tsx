import { PriceTypes } from "./api/api";
import { Availability } from "./api/availabilities/types";
import { Product } from "./api/products/types";

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

const calcSingleValue = (netPrice: number, partnerComm: number, companyComm: number) => {
  return (netPrice + partnerComm + companyComm)
}

const calcVariableValue = (qty: number, netPrice: number, partnerComm: number, companyComm: number) => {
  const unitPrice = netPrice + partnerComm + companyComm;
  return (qty * unitPrice);
}

const calcDefinedValue = (
  qty: number,
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
) => {
  if (qty === 1) {
    return netPrice1 + partnerComm1 + companyComm1;
  }
  if (qty === 2) {
    return netPrice2 + partnerComm2 + companyComm2;
  }
  if (qty === 3) {
    return netPrice3 + partnerComm3 + companyComm3;
  }
  if (qty === 4) {
    return netPrice4 + partnerComm4 + companyComm4;
  }
  return 0;
}
export const calcPrice = (qty: number, product: Product): number => {
  if (qty < 1) {
    return 0;
  } 

  if (product.priceType === "single-value"){
    return calcSingleValue(product.netPrice, product.partnerComm, product.companyComm)
  }

  if (product.priceType === "variable-value") {
    return calcVariableValue(qty, product.netPrice, product.partnerComm, product.companyComm)
  }

  if (product.priceType === "defined-value") {
    return calcDefinedValue(
      qty,
      product.netPrice1,
      product.partnerComm1,
      product.companyComm1,
      product.netPrice2,
      product.partnerComm2,
      product.companyComm2,
      product.netPrice3,
      product.partnerComm3,
      product.companyComm3,
      product.netPrice4,
      product.partnerComm4,
      product.companyComm4,

    )
  }

  return 0;
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