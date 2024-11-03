import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { TotemPing } from "./types";


export const getTotemPingById = async (body: TotemPing) => {
  const { data } = await axios.put(`${baseUrl}/totem-ping/${body.totemId}`, body, axiosParams);
  return data;
}

export const setTotemPingById = async (body: TotemPing) => {
  const { data } = await axios.put(`${baseUrl}/totem-ping/${body.totemId}`, body, axiosParams);
  return data;
}