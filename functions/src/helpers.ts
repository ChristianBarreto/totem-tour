import { Totem } from "./controllers/totems/types";
import { Customer } from "./controllers/customers/types";
import qs = require("qs");

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
    return "lt";
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
  for (const key in query) {
    if (key === "orderBy") {
      collectionRef = collectionRef.orderBy(query.orderBy, query.order ? query.order : "asc");
    } else if ((key !== "orderBy") && (key !== "order")) {
      console.log("Res: ",key, useOperator(query[key]), sanitizeQuery(query[key]));
      collectionRef = collectionRef.where(key, useOperator(query[key]), sanitizeQuery(query[key]))
    }
  }
  return collectionRef;
}