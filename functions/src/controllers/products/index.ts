import { sortGetData } from "../../helpers";
import { addDbItem, editDbItem, getDbItem, getDbItems } from "../../index";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  const resp = await getDbItems("products", req.query);
  res.json(resp.sort((a, b) => sortGetData(a, b, req.query)));
};

export const getProduct = async (req: Request, res: Response) => {
  const resp = await getDbItem("products", req.params.id);
  res.json(resp);
};

export const addProduct = async (req: Request, res: Response) => {
  const resp = await addDbItem("products", req.body);
  res.json(resp);
};

export const editProduct = async (req: Request, res: Response) => {
  const resp = await editDbItem("products", req.params.id, req.body);
  res.json(resp);
};
