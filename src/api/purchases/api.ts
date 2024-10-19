import axios from "axios";
import { axiosParams, baseUrl, Purchase } from "../api";

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