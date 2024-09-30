import axios from "axios";

export type APIError = string;

export type City = {
  id: string,
  name: string,
  imgUrl: string,
}

export type Cities = City[];

export type Product = {
  id: string,
  name: string,
  description: string,
  cityId: string,
  imgUrl: string,
  details: string,
  time: string,
  location: string
  priority: number,
  netPrice: number,
  partnerComm: number,
  companyComm: number,
  pricePerPerson: number,
  minTotalPrice: number,
  minPriceDescription: string,
  maxPaxDay: number,
  maxPerRound: number,
}

export type Availabilitiy = {
  active: boolean,
  date: string,
  productId: string,
  availability: number,
  booked: number,
  remaining: number,
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
  location: string,
}

export type CustomerData = {
  name: string,
  email: string,
  phone: string,
}

export type Purchase = {
  products: PurchaseItem[];
  cartPrice: number,
  customerData: CustomerData;
  paymentMethod: string,
  acceptedTerms: boolean,
}

export type Availabilities = Availabilitiy[];

export type Products = Product[];

type VerifyPayment = {
  id: string,
  transaction_amount: number
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

export const generatePixPayment = async (body: Purchase) => {
  const { data } = await axios.post(`${baseUrl}/pix-payment/`, body, axiosParams);
  return data;
}

export const verifyPayment = async (body: VerifyPayment) => {
  const { data } = await axios.post(`${baseUrl}/verify-payment/`, body, axiosParams)
  return data;
}