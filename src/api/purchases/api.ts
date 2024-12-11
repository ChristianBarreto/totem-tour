import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { NewPurchase, Purchase, PurchasesParams } from "./types";
import qs from 'qs';

const sanitizePurchase = (pur: Purchase): Purchase => ({
  id: pur.id,
  customerId: pur.customerId,
  totemId: pur.totemId,
  acceptedTerms: pur.acceptedTerms,
  cartPrice: pur.cartPrice,
  totalNetPrice: pur.totalNetPrice,
  totalPartnerComm: pur.totalPartnerComm,
  totalCompanyComm: pur.totalCompanyComm,
  paymentValue: pur.paymentValue,
  payementCaptured: pur.payementCaptured,
  paymentId: pur.paymentId,
  paymentMethod: pur.paymentMethod,
  customerMsg: pur.customerMsg,
  operatorsMsg: pur.operatorsMsg,
  operatorsConfirmed: pur.operatorsConfirmed,
  partnerMsg: pur.partnerMsg,
  timestamp: pur.timestamp,
  lastUpdated: pur.lastUpdated,
})

export const setNewPurchase = async (body: NewPurchase) => {
  const { data } = await axios.post(`${baseUrl}/set-purchase/`, body, axiosParams);
  return data;
}

export const getAdminPurchases = async (params: any) => {
  const { data } = await axios.get(`${baseUrl}/purchases${params ? "?" + qs.stringify(params) : ''}`, axiosParams);
  return data;
}

export const getPurchaseById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/purchases/${id}`, axiosParams);
  return data;
}

export const editPurchaseById = async (id: string, body: Purchase) => {
  const { data } = await axios.put(`${baseUrl}/purchases/${id}`, sanitizePurchase(body), axiosParams);
  return data;
}