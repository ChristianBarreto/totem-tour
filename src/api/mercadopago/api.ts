import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { CancelPaymentIntent, MpPurchase, MpVerifyPayment, PaymentIntent, PaymentInterStatus, PosMode } from "./types";

export const generatePixPayment = async (body: MpPurchase) => {
  const { data } = await axios.post(`${baseUrl}/pix-payment/`, body, axiosParams);
  return data;
}

export const verifyPayment = async (body: MpVerifyPayment) => {
  const { data } = await axios.post(`${baseUrl}/verify-payment/`, body, axiosParams)
  return data;
}

export const getPoss = async () => {
  const { data } = await axios.get(`${baseUrl}/pos/`, axiosParams);
  return data;
}

export const switchPosMode = async (id: string, body: PosMode) => {
  const { data } = await axios.post(`${baseUrl}/pos/${id}/change-mode/`, body, axiosParams);
  return data;
}

export const paymentIntent = async (body: PaymentIntent) => {
  const { data } = await axios.post(`${baseUrl}/payment-intent/`, body, axiosParams);
  return data;
}

export const cancelLastPaymentIntent = async (body: CancelPaymentIntent) => {
  const { data } = await axios.post(`${baseUrl}/cancel-last-payment-intent/`, body, axiosParams);
  return data;
}

export const getPaymentIntentStatus = async (body: PaymentInterStatus) => {
  const { data } = await axios.post(`${baseUrl}/get-payment-intent-status/`, body, axiosParams);
  return data;
}