import { initCustomer, initTotem, sortGetData } from "../../helpers";
import { editDbItem, getDbItem, getDbItems } from "../../index";
import { Request, Response } from "express";

export const getPurchases = async (req: Request, res: Response) => {
  const purchases = await getDbItems("purchases", req.query);
  const resp: any[] = [];

  // TODO: the data is received in purchased, but modified on resp.

  purchases.data.forEach(async (purchase) => {
    const totem = purchase.totemId.length ? await getDbItem("totens", purchase.totemId) : initTotem;
    await resp.push({
      ...purchase,
      totemNickName: totem.nickName,
      totemLocationDescription: totem.locationDescription,
      totemResponsiblePerson: totem.responsiblePerson,
    });

    if (resp.length === purchases.length) {
      res.status(200).json(resp); // TODO: instead of send resp, send purchases modified with FK
    }
  });
};

export const getPurchaseById = async (req: Request, res: Response) => {
  const purchase = await getDbItem("purchases", req.params.id);
  const totem = purchase.totemId.length ? await getDbItem("totens", purchase.totemId) : initTotem;
  const customer = purchase.customerId.length ? await getDbItem("customers", purchase.customerId): initCustomer;

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
