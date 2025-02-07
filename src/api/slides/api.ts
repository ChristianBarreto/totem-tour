import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { SlideResp } from "./types";
import qs from "qs";

export const getSlides = async (params?: any) => {
  const { data } = await axios.get(`${baseUrl}/slides${params ? "?" + qs.stringify(params) : ''}`, axiosParams);
  return data;
}

// export const getSlides = async () => {
//   const { data } = await axios.get(`${baseUrl}/slides/`, axiosParams);
//   return data;
// }

export const getSlide = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/slides/${id}`, axiosParams);
  return data;
}

export const addSlide = async (body: SlideResp) => {
  const { data } = await axios.post(`${baseUrl}/slides/`, body, axiosParams);
  return data;
}

export const editSlide = async (id: string, body: SlideResp) => {
  const { data } = await axios.put(`${baseUrl}/slides/${id}`, body, axiosParams);
  return data;
}
