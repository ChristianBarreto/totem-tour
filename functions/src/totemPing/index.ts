import { Request, Response } from "express";
import { getDbItem, mergeDbItem } from "..";

export const getTotemPingById = async (req: Request, res: Response) => {
  const resp = await getDbItem("totemPings", req.params.id);
  res.json(resp);
};

export const setTotemPingById = async (req: Request, res: Response) => {
  const resp = await mergeDbItem("totemPings", req.params.id, req.body);
  res.json(resp);
};
