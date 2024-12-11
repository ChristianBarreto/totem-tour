// const dayjs = require('dayjs');
import { getDbItem, getDbItems } from "../..";
import { Request, Response } from "express";
import { sortGetData } from "../../helpers";

export const getPurchaseItems = async (req: Request, res: Response) => {
  const purchaseItems = await getDbItems("purchaseItems", req.query);
  const resp: any[] = [];

  if (!purchaseItems.length) {
    res.status(200).json([]);
  }

  purchaseItems.forEach(async (purchaseItem) => {
    const city = await getDbItem("cities", purchaseItem.cityId);
    const product = await getDbItem("products", purchaseItem.productId);

    resp.push({
      ...purchaseItem,
      cityName: city.name,
      productName: product.name,
      productTime: product.time,
      productDuration: product.duration,
      productAlignMessage: product.alignMessage,
      productAddres: product.address,
      productLocation: product.location,
      productOperatorName: product.operatorName,
      productOperatorPhone: product.operatorPhone,
    });
    if (resp.length === purchaseItems.length) {
      res.status(200).json(
        resp.sort((a, b) => sortGetData(a, b, req.query))
      );
    }
  });
};
