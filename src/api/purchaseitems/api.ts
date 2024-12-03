import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import qs from "qs";

export const getPurchaseItenById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/purchase-items/${id}`, axiosParams);
  return data;
}

export const getPurchaseItems = async (params?: any) => {
  console.log(qs.stringify(params))
  const { data } = await axios.get(`${baseUrl}/purchase-items?${qs.stringify(params)}`, axiosParams);
  return data;
}
