import axios from "axios";

export type APIError = string;

export type Product = {
  id: string,
  name: string,
}

export type Products = Product[];

export const getProducts = async (): Promise<Products> => {
  const data = axios.get<Products>('http://127.0.0.1:5001/totem-tour/us-central1/totem/products')
    .then((res) => {
      return res.data;
    })
  return data;
}