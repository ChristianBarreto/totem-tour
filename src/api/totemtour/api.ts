import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { Company } from "./types";

export const getTotemTour = async () => {
  const { data } = await axios.get(`${baseUrl}/get-totem-tour`, axiosParams);
  return data;
}

export const setTotemTour = async (body: Company): Promise<Company | void> => {
  const data = axios.put<Company>(`${baseUrl}/set-totem-tour`, body, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
    })
  return data;
}