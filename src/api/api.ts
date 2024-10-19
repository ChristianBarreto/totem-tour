import axios from "axios";
import { Product, Products } from "./products/types";

export type APIError = string;

export type PriceTypes = undefined | "single-value" | "variable-value" | "defined-value"

export type PurchaseItem = {
  productId: string,
  qty: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  pricePerPerson: number,
  minTotalPrice: number,
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

export type PurchaseItemDb = { // TODO: melhorar tipo do carrinho x tipo da compra que vai p/ DB
  id: string,
  productId: string,
  qty: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  pricePerPerson: number,
  minTotalPrice: number,
  totalPrice: number,
  date: string,
  cityId: string,
  totemId: string,
  lastUpdate: number,
  timestamp: number,
}

export type CustomerData = {
  name: string,
  email: string,
  phone: string,
}

export type Purchase = {
  cartPrice: number,
  products: PurchaseItem[],
  customerData: CustomerData,
  paymentId: string,
  payementCaptured: boolean,
  paymentValue: number,
  paymentMethod: string,
  acceptedTerms: boolean,
  installments?: number,
  totemId: string,
}

export type PurchaseDb = { // TODO: melhorar tipo do carrinho x tipo da compra que vai p/ DB
  id: string,
  customerId: string,
  acceptedTerms: boolean,
  cartPrice: number,
  payementCaptured: boolean,
  paymentId: number,
  paymentMethod: string,
  paymentValue: number,
  totemId: string,
  timestamp: number,
  lastUpdated: number,
  customerMsg: boolean,
  operatorMsg: boolean,
  partnerMsg: boolean,
}

type VerifyPayment = {
  id: string,
  transaction_amount: number
}

export type PosMode = {
  mode: string
}

export type PaymentIntent = {
  device_id: string,
  amount: number,
  description: string,
  installments?: number,
  installments_cost?: string
  type: string,
  print: boolean,
}

export type CancelPaymentIntent = {
  device_id: string,
}

export type PaymentInterStatus = {
  payment_intent_id: string,
}

export type CarouselItems = Array<{
  img: string,
  id: string,
  description: string,
}>

export type Company = {
  privacyTerms: string,
  serviceAndCancelationTerms: string,
  cnpj: string,
  companyName: string,
  phone: string,
  email: string,
  address: string,
  lastUpdated: string,
  timestamp: string,
}

export type Totem = {
  id: string,
  number: number,
  locationDescription: string,
  responsiblePerson: string,
  posId: string,
  cityOrder: string,
  showTestProduct: boolean,
  lastUpdated: string,
  timestamp: string,
}

export const axiosParams = {
  headers: {
    // 'Access-Control-Allow-Origin': 'https://totem-2id4w5fuzq-uc.a.run.app/'
  }
}

export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://totem-2id4w5fuzq-uc.a.run.app'
  : 'http://127.0.0.1:5001/totem-tour/us-central1/totem'

export const websiteUrl = process.env.NODE_ENV === 'production'
  ? 'https://totem-tour.web.app'
  : 'http://localhost:3000'

console.log(process.env.NODE_ENV, baseUrl)


export const generatePixPayment = async (body: Purchase) => {
  const { data } = await axios.post(`${baseUrl}/pix-payment/`, body, axiosParams);
  return data;
}

export const verifyPayment = async (body: VerifyPayment) => {
  const { data } = await axios.post(`${baseUrl}/verify-payment/`, body, axiosParams)
  return data;
}

export const setNewPurchase = async (body: Purchase) => {
  const { data } = await axios.post(`${baseUrl}/set-purchase/`, body, axiosParams);
  return data;
}

export const getAdminPurchases = async () => {
  const { data } = await axios.get(`${baseUrl}/purchases/`, axiosParams);
  return data;
}

export const getPurchaseById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/purchases/${id}`, axiosParams);
  return data;
}

export const getPurchaseItensByPurchaseId = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/purchasePurchaseItens/${id}`, axiosParams);
  return data;
}

export const getAdminPurchaseItens = async () => {
  const { data } = await axios.get(`${baseUrl}/sales/`, axiosParams);
  return data;
}

export const getPoss = async () => {
  const { data } = await axios.get(`${baseUrl}/pos/`, axiosParams);
  return data;
}

export const switchPosMode = async (id: string, body: PosMode) => {
  const { data } = await axios.post(`${baseUrl}/pos/${id}/change-mode/`, body, axiosParams);
  return data;
}

export const paymentIntent = async (body: PaymentIntent) => {
  const { data } = await axios.post(`${baseUrl}/payment-intent/`, body, axiosParams);
  return data;
}

export const cancelLastPaymentIntent = async (body: CancelPaymentIntent) => {
  const { data } = await axios.post(`${baseUrl}/cancel-last-payment-intent/`, body, axiosParams);
  return data;
}

export const getPaymentIntentStatus = async (body: PaymentInterStatus) => {
  const { data } = await axios.post(`${baseUrl}/get-payment-intent-status/`, body, axiosParams);
  return data;
}

export const getSlides = async () => {
  const { data } = await axios.get(`${baseUrl}/get-slides/`, axiosParams);
  return data;
}

export const getTotemTour = async () => {
  const { data } = await axios.get(`${baseUrl}/get-totem-tour`, axiosParams);
  return data;
}

export const setTotemTour = async (body: Company): Promise<Company | void> => {
  const data = axios.put<Company>(`${baseUrl}/set-totem-tour`, body, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}

export const getTotems = async () => {
  const { data } = await axios.get(`${baseUrl}/get-totems`, axiosParams);
  return data;
}

export const getTotemById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/get-totem/${id}`, axiosParams);
  return data;
}

export const editTotemById = async (body: Totem) => {
  const { data } = await axios.put(`${baseUrl}/edit-totem/`, body, axiosParams);
  return data;
}

export const addTotem = async (body: Totem): Promise<Totem | void> => {
  const data = axios.post<Totem>(`${baseUrl}/totem/`, body, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}