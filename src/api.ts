import axios from "axios";

export type APIError = string;

export type City = {
  id: string,
  name: string,
  imgUrl: string,
}

export type Cities = City[];

export type PriceTypes = undefined | "single-value" | "variable-value" | "defined-value"

export type Product = {
  id: string,
  name: string,
  description: string,
  cityId: string,
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
  notAvailableMessage: string,
  isTest: boolean,
  timestamp?: number,
  lastUpdated?: number,
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
}

export type Availabilitiy = {
  active: boolean,
  date: string,
  productId: string,
  availability: number,
  booked: number,
  remaining: number,
  id: string,
}

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
  cityId: string,
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
}

export type Availabilities = Availabilitiy[];

export type Products = Product[];

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

const axiosParams = {
  headers: {
    // 'Access-Control-Allow-Origin': 'https://totem-2id4w5fuzq-uc.a.run.app/'
  }
}

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://totem-2id4w5fuzq-uc.a.run.app'
  : 'http://127.0.0.1:5001/totem-tour/us-central1/totem'

export const websiteUrl = process.env.NODE_ENV === 'production'
  ? 'https://totem-tour.web.app'
  : 'http://localhost:3000'

console.log(process.env.NODE_ENV, baseUrl)

export const getProducts = async (): Promise<Products | void> => {
  const data = axios.get<Products>(`${baseUrl}/products`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}

export const getProductById = (productId: string | undefined): Promise<Product | void> => {
  if (productId === undefined) {
    console.log("productId is undefined")
  }
  const data = axios.get<Product>(`${baseUrl}/products/${productId}`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}

export const editProductById = async (productId: string | undefined, body: Product): Promise<Product | void> => {
  if (productId === undefined) {
    console.log("productId is undefined")
  }
  const data = axios.put<Product>(`${baseUrl}/products/${productId}`, body, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}

export const addProduct = async (body: Product): Promise<Product | void> => {
  const data = axios.post<Product>(`${baseUrl}/products/`, body, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}

export const getCities = async (): Promise<Cities | void> => {
  const data = axios.get<Cities>(`${baseUrl}/cities`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}

export const getAvailabilitiesByProduct = async (productId: string): Promise<Availabilities | void> => {
  const data = axios.get<Availabilities>(`${baseUrl}/availabilities/${productId}`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}

export const getNextAvailabilities = async (): Promise<Availabilities | void> => {
  const data = axios.get<Availabilities>(`${baseUrl}/next-availabilities/`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}

export const addAvailability = async (body: Availabilitiy): Promise<Availabilitiy | void> => {
  const { data } = await axios.post(`${baseUrl}/availabilities/`, body, axiosParams);
  return data;
}

export const getAvailabilityById = async (id: string): Promise<Availabilitiy | void> => {
  const { data } = await axios.get(`${baseUrl}/availability/${id}`, axiosParams);
  return data;
}

export const editAvailabilityById = async (id: string, body: Availabilitiy): Promise<Availabilitiy | void> => {
  const { data } = await axios.put(`${baseUrl}/availabilities/${id}`, body, axiosParams);
  return data;
}

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