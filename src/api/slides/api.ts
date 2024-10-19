import axios from "axios";
import { axiosParams, baseUrl } from "../api";

export const getSlides = async () => {
  const { data } = await axios.get(`${baseUrl}/get-slides/`, axiosParams);
  return data;
}
