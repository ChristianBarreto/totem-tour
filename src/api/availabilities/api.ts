import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { Availability, Availabilities } from "./types";
import qs from "qs";

export const getAvailabilitiesByProduct = async (productId: string): Promise<Availabilities | void> => {
  const data = axios.get<Availabilities>(`${baseUrl}/availabilities/${productId}`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}

export const getNextAvailabilities = async (params?: any): Promise<Availabilities | void> => {
  const data = axios.get<Availabilities>(`${baseUrl}/availabilities/?${qs.stringify(params)}`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
}

export const addAvailability = async (body: Availability): Promise<Availability | void> => {
  const { data } = await axios.post(`${baseUrl}/availabilities/`, body, axiosParams);
  return data;
}

export const getAvailabilityById = async (id: string): Promise<Availability | void> => {
  const { data } = await axios.get(`${baseUrl}/availability/${id}`, axiosParams);
  return data;
}

export const editAvailabilityById = async (id: string, body: Availability): Promise<Availability | void> => {
  const { data } = await axios.put(`${baseUrl}/availabilities/${id}`, body, axiosParams);
  return data;
}
