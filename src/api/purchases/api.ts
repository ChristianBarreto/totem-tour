import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { NewPurchase } from "./types";

export const setNewPurchase = async (body: NewPurchase) => {
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