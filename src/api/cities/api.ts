import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { Cities } from "./types";

export const getCities = async (): Promise<Cities | void> => {
  const data = axios.get<Cities>(`${baseUrl}/cities`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}


// TODO: CRUD