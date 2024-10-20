import axios from "axios";
import { axiosParams, baseUrl } from "../api";

export const getPurchaseItensByPurchaseId = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/purchasePurchaseItens/${id}`, axiosParams);
  return data;
}

export const getAdminPurchaseItens = async () => {
  const { data } = await axios.get(`${baseUrl}/next-items/`, axiosParams);
  return data;
}