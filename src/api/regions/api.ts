import axios from "axios";
import { axiosParams, baseUrl } from "../api";
import { Region, Regions } from "./types";
import qs from "qs";

export const getRegions = async (params?: any): Promise<Regions> => {
  const data = axios.get<Regions>(`${baseUrl}/regions/${params ? '?' + qs.stringify(params): ''}`, axiosParams)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("API ERROR", err)
      return [];
    })
  return data;
};

export const getRegionById = async (id: string): Promise<Region | void> => {
  const { data } = await axios.get(`${baseUrl}/regions/${id}`, axiosParams);
  return data;
};

export const addRegionById = async (body: Region): Promise<Region | void> => {
  const { data } = await axios.post(`${baseUrl}/regions/`, body, axiosParams);
  return data;
};

export const editRegionById = async (id: string, body: Region): Promise<Region | void> => {
  const { data } = await axios.put(`${baseUrl}/regions/${id}`, body, axiosParams);
  return data;
};

export const deleteRegionById = async (id: string): Promise<Region | void> => {
  const { data } = await axios.delete(`${baseUrl}/regions/${id}`, axiosParams);
  return data;
};

