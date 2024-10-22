import { editDbItem, getDbItem, getDbItems } from "../index";
import { Request, Response } from "express";

export const getPurchases = async (req: Request, res: Response) => {
  const purchases = await getDbItems("purchases");
  const resp: any[] = [];

  purchases.forEach(async (purchase) => {
    const totem = await getDbItem("totens", purchase.totemId);

    await resp.push({
      ...purchase,
      totemNickName: totem.nickName,
      totemLocationDescription: totem.locationDescription,
      totemResponsiblePerson: totem.responsiblePerson,
    });

    resp.length === purchases.length
      && res.status(200).json(resp.sort((a, b) => b.timestamp - a.timestamp));
  });
};

export const getPurchaseById = async (req: Request, res: Response) => {
  const purchase = await getDbItem("purchases", req.params.id);
  const totem = await getDbItem("totens", purchase.totemId);
  const customer = await getDbItem("customers", purchase.customerId);

  res.json({
    ...purchase,
    totemNickName: totem.nickName,
    totemLocationDescription: totem.locationDescription,
    totemResponsiblePerson: totem.responsiblePerson,
    customerName: customer.name,
    customerPhone: customer.phone,
    customerEmail: customer.email,
  });
};

export const editPurchaseById = async (req: Request, res: Response) => {
  const resp = await editDbItem("purchases", req.params.id, req.body);
  return res.json(resp);
};
