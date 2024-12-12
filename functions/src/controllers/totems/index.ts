import { Request, Response } from "express";
import { addDbItem, editDbItem, getDbItem, getDbItems } from "../..";
import { sortGetData } from "../../helpers";

export const addTotemById = async (req: Request, res: Response) => {
  const resp = await addDbItem("totens", req.body);
  res.json(resp);
};

export const getTotens = async (req: Request, res: Response) => {
  const totens = await getDbItems("totens");
  const resp: any[] = [];

  totens.forEach(async (totem) => {
    const ping = await getDbItem("totemPings", totem.id)
      .catch((err) => {
        console.log("Err", err)
      });
    const region = await getDbItem("regions", totem.regionId)
      .catch((err) => {
        console.log("Err", err)
      });
    const city = await getDbItem("cities", totem.cityId)
      .catch((err) => {
        console.log("Err", err)
      });

      resp.push({
        ...totem,
        lastPing: ping?.lastPing,
        regionName: region?.name,
        cityName: city?.name,

      });

    if (resp.length === totens.length) {
      res.status(200).json(resp.sort((a, b) => sortGetData(a, b, req.query)));
    }
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
  }).catch((err) => {
    console.log(err);
    res.status(404).json(err);
  });
};

export const editTotemById = async (req: Request, res: Response) => {
  const resp = await editDbItem("totens", req.body.id, req.body);
  res.json(resp);
};
