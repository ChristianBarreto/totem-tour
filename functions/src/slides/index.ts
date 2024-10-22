import { addDbItem, editDbItem, getDbItem, getDbItems } from "..";
import { Request, Response } from 'express'

export const getSlides =  async (req: Request, res: Response) => {
  const resp = await getDbItems("slides")
  res.json(resp)
};

export const getSlide =  async (req: Request, res: Response) => {
  const resp = await getDbItem("slides", req.params.id)
  res.json(resp)
};

export const addSlide =  async (req: Request, res: Response) => {
  const resp = await addDbItem("slides", req.body)
  res.json(resp)
};

export const editSlide =  async (req: Request, res: Response) => {
  const resp = await editDbItem("slides", req.params.id, req.body)
  res.json(resp)
};


