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

export const queryRef = (collectionRef: any, query: ParsedQs) => {
  // console.log("Query", query)
  for (const key in query) {
    if ((key === "orderBy")) {
      const obj = query[key];
      const orderBy = getValue(obj as QueryKey);
      const order = getKey(obj as ParsedQs);

      // console.log("QUERY ORDER", orderBy, order)
      collectionRef = collectionRef.orderBy(orderBy, order);

    } else if (key === "limit"){
      const limit = query[key];

      // console.log("QUERY LIMIT", limit);
      collectionRef = collectionRef.limit(Number(limit));

    } else if (key !== "orderBy") {
      // console.log("Query key", query[key])

      // console.log("QUERY WHERE", key, useOperator(query[key] as QueryKey), sanitizeQuery(query[key]))
      collectionRef = collectionRef.where(key, useOperator(query[key] as QueryKey), sanitizeQuery(query[key] as ParsedQs))

    }
  }
  return collectionRef;
}

export const sortGetData = (a: any, b: any, query: ParsedQs): number => {
  const order: string = query.orderBy ? getKey(query.orderBy as ParsedQs) : "desc";
  const dir: number = order === "desc" ? -1 : 1;
  const field: string = query.orderBy ? Object.values(query.orderBy)[0] as string : "timestamp";
  
  if (a[field] > b[field]) {
    return dir;
  } else if (a[field] < b[field]) {
    return (dir * -1);
  } else {
    return 0;
  };
}