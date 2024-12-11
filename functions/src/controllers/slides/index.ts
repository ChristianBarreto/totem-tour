import { addDbItem, editDbItem, getDbItem, getDbItems } from "../..";
import { Request, Response } from "express";
import { sortGetData } from "../../helpers";

export const getSlides = async (req: Request, res: Response) => {
  const resp = await getDbItems("slides");
  res.json(resp.sort((a, b) => sortGetData(a, b, req.query)));
};

export const getSlide = async (req: Request, res: Response) => {
  const resp = await getDbItem("slides", req.params.id);
  res.json(resp);
};

export const addSlide = async (req: Request, res: Response) => {
  const resp = await addDbItem("slides", req.body);
  res.json(resp);
};

export const editSlide = async (req: Request, res: Response) => {
  const resp = await editDbItem("slides", req.params.id, req.body);
  res.json(resp);
};


