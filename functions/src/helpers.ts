import { Totem } from "./controllers/totems/types";
import { Customer } from "./controllers/customers/types";
import { ParsedQs } from "qs";

export const initTotem: Totem = {
  id: "",
  nickName: "",
  locationDescription: "",
  responsiblePerson: "",
  posId: "",
  cityOrder: "",
  showTestProduct: false,
  lastPing: null,
  lastUpdated: "",
  timestamp: "",
};

export const initCustomer: Customer = {
  name: "",
  email: "",
  phone: "",
};

export type QueryKey = {
  [key: string]: {
   [key: string]: string | number
 };
};

export const sanitizeQuery = (query: ParsedQs): boolean | string | number => {
  const factor = Object.keys(query)[0];
  const type = String(Object.keys(query[factor] as QueryKey)[0]);
  const value = Object.values(query[factor] as QueryKey).join('');

  // console.log("FACTOR", factor, "TYPE", type, "VALUE", value)

  if (type === "boo") {
    return value === "true" ? true : false;
  } else if (type === "str") {
    return String(value);
  } else if (type === "num") {
    return Number(value);
  } else {
    return value;
  };
}

export const getKey = (queryKey: ParsedQs): string => Object.keys(queryKey)[0];

export const getValue = (queryKey: QueryKey): { [key: string]: string | number; } => Object.values(queryKey)[0];

export const useOperator = (queryKey: QueryKey) => {
  const operator = Object.keys(queryKey)[0];
  const type = Object.keys(Object.values(queryKey)[0])[0];
  if ((type === 'boo') && ((operator !== "eq") && (operator !== 'ne'))){
    return '==';
  }
  if (operator == "eq") { // eq, ne, gt, lt, ge e le
    return "==";
  }
  else if (operator == "ne") {
    return "!=";
  }
  else if (operator == "gt") {
    return ">";
  }
  else if (operator == "lt") {
    return "<";
  }
  else if (operator == "ge") {
    return ">=";
  }
  else if (operator == "le") {
    return "<=";
  }
  return "==";
}

export const orderRef = (collectionRef: any, query: any) => { 
  if (query.orderBy) {
    for (const orderBy in query.orderBy) {
      const order = query.orderBy[orderBy];
      collectionRef = collectionRef.orderBy(orderBy, order);
    }
  }
  return collectionRef;
}

export const filterRef = (collectionRef: any, query: any) => {
  if (query.filterBy) {
    for (const key in query.filterBy as any) {
      collectionRef = collectionRef.where(key, useOperator(query.filterBy[key] as QueryKey), sanitizeQuery(query.filterBy[key] as ParsedQs))
    }
  }
  return collectionRef;
}

export const limitRef = (collectionRef: any, query: ParsedQs) => {
  for (const key in query) {
    if (key === "limit") {
      const limit = query[key];
      collectionRef = collectionRef.limit(Number(limit));
    } else if (key === "offset"){
      const offset = query[key];
      collectionRef = collectionRef.offset(Number(offset));
    }
  }
  return collectionRef;
}

export const sortGetData = (a: any, b: any, query: any): number => {
  // TODO: it only sort the first sort query, need to implement multiple queries
  const order: string = query.orderBy ? Object.values(query.orderBy)[0] as string : "desc";
  const dir: number = order === "desc" ? -1 : 1;
  const field: string = query.orderBy ? Object.keys(query.orderBy)[0] as string : "timestamp";
  
  if (a[field] > b[field]) {
    return dir;
  } else if (a[field] < b[field]) {
    return (dir * -1);
  } else {
    return 0;
  };
}