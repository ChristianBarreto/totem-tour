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
}

export type Products = Product[];

const baseUrl = process.env.NODE_ENV === 'production'
   ? 'https://totem-2id4w5fuzq-uc.a.run.app'
   : 'http://127.0.0.1:5001/totem-tour/us-central1/totem'

export const getProducts = async (): Promise<Products | void> => {
  const data = axios.get<Products>(`${baseUrl}/products`)
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
  const data = axios.get<Products>(`${baseUrl}/cities`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}