import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { Totem } from "./types";

export const getTotems = async (params: any) => {
  const { data } = await axios.get(`${baseUrl}/totens${params ? "?" + params : ''}`, axiosParams);
  return data;
}

export const getTotemById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/totens/${id}`, axiosParams);
  return data;
}

export const editTotemById = async (body: Totem) => {
  const { data } = await axios.put(`${baseUrl}/totens/`, body, axiosParams);
  return data;
}

export const addTotem = async (body: Totem): Promise<Totem | void> => {
  const data = axios.post<Totem>(`${baseUrl}/totens/`, body, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}