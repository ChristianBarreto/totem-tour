import { editDbItem, getDbItems } from "../../index";
import { Request, Response } from "express";

export const getAvailabilities = async (req: Request, res: Response) => {
  const availabilities = await getDbItems("availabilities", req.query);
  // const resp: any[] = [];

  if (!availabilities.length) {
    res.status(200).json([]);
  }

  res.status(200).json(availabilities);
};

export const editAvailabilityById = async (req: Request, res: Response) => {
  const resp = await editDbItem("purchases", req.params.id, req.body);
  return res.json(resp);
};
