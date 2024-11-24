import { addDbItem, editDbItem, getDbItem, getDbItems } from "../..";
import { Request, Response } from "express";

export const getCities = async (req: Request, res: Response) => {
  const resp = await getDbItems("cities");
  res.json(resp);
};

export const getCityById = async (req: Request, res: Response) => {
  const resp = await getDbItem("cities", req.params.id);
  res.json(resp);
};

export const addCity = async (req: Request, res: Response) => {
  const resp = await addDbItem("cities", req.body);
  res.json(resp);
};

export const editCityById = async (req: Request, res: Response) => {
  const resp = await editDbItem("cities", req.params.id, req.body);
  res.json(resp);
};

