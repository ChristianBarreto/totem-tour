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

const urlPrefix = 'http://127.0.0.1:5001/totem-tour/us-central1/totem';

export const getProducts = async (): Promise<Products> => {
  const data = axios.get<Products>(`${urlPrefix}/products`)
    .then((res) => {
      return res.data;
    })
  return data;
}

export const getCities = async (): Promise<Cities> => {
  const data = axios.get<Products>(`${urlPrefix}/cities`)
    .then((res) => {
      return res.data;
    })
  return data;
}