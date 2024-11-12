import { Totem } from "./totems/types";
import { Customer } from "./customers/types";

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
