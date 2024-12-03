import { addDbItem, deleteDbItem, editDbItem, getDbItem, getDbItems } from "../../index";
import { Request, Response } from "express";

export const getAvailabilities = async (req: Request, res: Response) => {
  const availabilities = await getDbItems("availabilities", req.query);
  // const resp: any[] = [];

  if (!availabilities.length) {
    res.status(200).json([]);
  }

  res.status(200).json(availabilities);
};

export const getAvailabilityById = async (req: Request, res: Response) => {
  const resp = await getDbItem("availabilities", req.params.id);
  return res.json(resp);
};

export const addAvailabilityById = async (req: Request, res: Response) => {
  const resp = await addDbItem("availabilities", req.body);
  return res.json(resp);
};

export const editAvailabilityById = async (req: Request, res: Response) => {
  const resp = await editDbItem("availabilities", req.params.id, req.body);
  return res.json(resp);
};

export const deleteAvailabilityById = async (req: Request, res: Response) => {
  const resp = await deleteDbItem("availabilities", req.params.id);
  return res.json(resp);
};
