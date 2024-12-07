import { addDbItem, deleteDbItem, editDbItem, getDbItem, getDbItems } from "../../index";
import { Request, Response } from "express";

export const getCities = async (req: Request, res: Response) => {
  const cities = await getDbItems("cities", req.query);
  if (!cities.length) {
    res.status(200).json([]);
  } else {
    const resp: any[] = [];

    cities.forEach(async (city) => {
      const region = await getDbItem("regions", city.regionId);
  
      resp.push({
        ...city,
        regionName: region.name,
      });
      if (resp.length === cities.length) {
        res.status(200).json(resp);
      }
    });
  }
};

export const getCityById = async (req: Request, res: Response) => {
  const resp = await getDbItem("cities", req.params.id);
  return res.json(resp);
};

export const addCity = async (req: Request, res: Response) => {
  const resp = await addDbItem("cities", req.body);
  return res.json(resp);
};

export const editCityById = async (req: Request, res: Response) => {
  const resp = await editDbItem("cities", req.params.id, req.body);
  return res.json(resp);
};

export const deleteCityById = async (req: Request, res: Response) => {
  const resp = await deleteDbItem("cities", req.params.id);
  return res.json(resp);
};
