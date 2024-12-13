import axios from "axios";
import { baseUrl, axiosParams } from "../api";
import { Product, Products } from "./types";
import qs from "qs";

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

export const getProducts = (params?: any): Promise<Products> => new Promise((resolve, reject) => {
  axios.get<Products>(`${baseUrl}/products${params ? "?" + qs.stringify(params) : ''}`, axiosParams)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      console.log("API ERROR", err)
      reject();
    })
})

export const getProductById = (productId: string | undefined) =>  new Promise((resolve, reject) => {
  if (productId?.length) {
    axios.get<Product>(`${baseUrl}/products/${productId}`, axiosParams)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("API ERROR", err);
        reject(`error to get product by id: ${productId}`);
      })
  }
});

// export const getProductById = (productId: string | undefined): Promise<Product | string> => {
//   if (productId) {
//     const data = axios.get<Product>(`${baseUrl}/products/${productId}`, axiosParams)
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => {
//         console.log("API ERROR", err)
//         return "error get product by id"
//       })
//     return data;
//   }

// }

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