import axios from "axios";
import { baseUrl, axiosParams } from "../api";
import { Product, Products } from "./types";

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

// TODO: delete