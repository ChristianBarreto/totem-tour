import { sortGetData } from "../../helpers";
import { addDbItem, deleteDbItem, editDbItem, getDbItem, getDbItems } from "../../index";
import { Request, Response } from "express";

export const getRegions = async (req: Request, res: Response) => {
  const regions = await getDbItems("regions", req.query);
  if (!regions.length) {
    res.status(200).json([]);
  } else {
    res.status(200).json(regions.sort((a, b) => sortGetData(a, b, req.query)));
  }
};

export const getRegionById = async (req: Request, res: Response) => {
  const resp = await getDbItem("regions", req.params.id);
  return res.json(resp);
};

export const addRegion = async (req: Request, res: Response) => {
  const resp = await addDbItem("regions", req.body);
  return res.json(resp);
};

export const editRegionById = async (req: Request, res: Response) => {
  const resp = await editDbItem("regions", req.params.id, req.body);
  return res.json(resp);
};

export const deleteRegionById = async (req: Request, res: Response) => {
  const resp = await deleteDbItem("regions", req.params.id);
  return res.json(resp);
};
