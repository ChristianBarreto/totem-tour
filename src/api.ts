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

export type Availabilities = Availabilitiy[];

export type Products = Product[];

const axiosParams = {
  headers: {
    // 'Access-Control-Allow-Origin': 'https://totem-2id4w5fuzq-uc.a.run.app/'
  }
}

const baseUrl = process.env.NODE_ENV === 'production'
   ? 'https://totem-2id4w5fuzq-uc.a.run.app'
   : 'http://127.0.0.1:5001/totem-tour/us-central1/totem'

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