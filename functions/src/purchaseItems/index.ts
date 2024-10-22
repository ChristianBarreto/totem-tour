// const dayjs = require('dayjs');
import { getDbItem, getDbItems, getDbItemsByParentId } from "..";
import { Request, Response } from "express";

export const getNextPurchaseItems = async (req: Request, res: Response) => {
  // const today = dayjs().format('YYYY-MM-DD');
  const purchaseItems = await getDbItems("purchaseItems");
  res.status(200).json(purchaseItems);
};

export const getPurchaseItemByPurchaseId = async (req: Request, res: Response) => {
  const purchaseItems = await getDbItemsByParentId("purhcaseItems", req.params.id);
  const resp: any[] = [];

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
    resp.length === purchaseItems.length
      && res.status(200).json(
        resp.sort((a, b) => a.time - b.time)
      );
  });
};
