import { Request, Response } from "express";
import { addDbItem, editDbItem, getDbItem, getDbItems } from "..";

export const addTotemById = async (req: Request, res: Response) => {
  const resp = await addDbItem("totens", req.body);
  res.json(resp);
};

export const getTotens = async (req: Request, res: Response) => {
  const totens = await getDbItems("totens");
  const resp: any[] = [];

  totens.forEach(async (totem) => {
    await getDbItem("totemPings", totem.id)
      .then((ping) => {
        resp.push({
          ...totem,
          lastPing: ping.lastPing,
        });
      }).catch(() => {
        resp.push({
          ...totem,
          lastPing: null,
        });
      });

    resp.length === totens.length &&
      res.status(200).json(resp.sort((a, b) => a.nickName - b.nickName));
  });
};

export const getTotemById = async (req: Request, res: Response) => {
  getDbItem("totens", req.params.id).then((totem) => {
    getDbItem("totemPings", req.params.id).then((ping) => {
      res.json({
        ...totem,
        lastPing: ping.lastPing,
      });
    }).catch(() => {
      res.json({
        ...totem,
        lastPing: null,
      });
    });
  });
};

export const editTotemById = async (req: Request, res: Response) => {
  const resp = await editDbItem("totens", req.body.id, req.body);
  res.json(resp);
};
