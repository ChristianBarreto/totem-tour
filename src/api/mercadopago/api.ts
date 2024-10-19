import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { MpPurchase, MpVerifyPayment } from "./types";

export const generatePixPayment = async (body: MpPurchase) => {
  const { data } = await axios.post(`${baseUrl}/pix-payment/`, body, axiosParams);
  return data;
}

export const verifyPayment = async (body: MpVerifyPayment) => {
  const { data } = await axios.post(`${baseUrl}/verify-payment/`, body, axiosParams)
  return data;
}