import { Totem } from "./controllers/totems/types";
import { Customer } from "./controllers/customers/types";

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

const sanitizeQuery = (query: any) => {
  const factor = Object.keys(query)[0];
  const type = String(Object.keys(query[factor])[0]);
  const value = Object.values(query[factor])[0];

  if (type === "boo") {
    return Boolean(value);
  } else if (type === "str") {
    return String(value);
  } else if (type === "num") {
    return Number(value);
  } else {
    return value;
  };
}

const useOperator = (query: any) => {
  const operator = Object.keys(query)[0];
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

export const queryRef = (collectionRef: any, query: any) => {
  // console.log(query)
  for (const key in query) {
    if (key === "orderBy") {
      const obj = query[key];
      const orderBy = Object.values(obj)[0];
      const order = Object.keys(obj)[0];

      console.log("QUERY ORDER", orderBy, order)
      collectionRef = collectionRef.orderBy(orderBy, order);

    } else if (key === "limit"){
      const limit = query[key];

      // console.log("QUERY LIMIT", limit);
      collectionRef = collectionRef.limit(Number(limit));

    } else if (key !== "orderBy") {
      // console.log("QUERY WHERE", key, useOperator(query[key]), sanitizeQuery(query[key]))
      collectionRef = collectionRef.where(key, useOperator(query[key]), sanitizeQuery(query[key]))

    }
  }
  return collectionRef;
}

export const sortGetData = (a: any, b: any, query: any): number => {
  const dir: number = Object.keys(query.orderBy)[0] === "desc" ? -1 : 1;
  const field: string = Object.values(query.orderBy)[0] as string;
  // console.log(dir, field, "a", a[field], "b", b[field]);
  if (a[field] > b[field]) {
    return 1 * dir;
  } else if (a[field] < b[field]) {
    return -1 * dir;
  } else {
    return 0;
  }
}