import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { CitiesResp, CityResp } from "./types";
import qs from "qs";

export const getCities = async (params?: any): Promise<CitiesResp> => {
  const data = axios.get<CitiesResp>(`${baseUrl}/cities/${params ? '?' + qs.stringify(params): ''}`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
};

export const getCityById = async (id: string): Promise<CityResp> => {
  const { data } = await axios.get(`${baseUrl}/cities/${id}`, axiosParams);
  return data;
};

export const addCity = async (body: CityResp): Promise<CityResp | void> => {
  const { data } = await axios.post(`${baseUrl}/cities/`, body, axiosParams);
  return data;
};

export const editCityById = async (id: string, body: CityResp): Promise<CityResp | void> => {
  const { data } = await axios.put(`${baseUrl}/cities/${id}`, body, axiosParams);
  return data;
};

export const deleteCityById = async (id: string): Promise<CityResp | void> => {
  const { data } = await axios.delete(`${baseUrl}/cities/${id}`, axiosParams);
  return data;
};