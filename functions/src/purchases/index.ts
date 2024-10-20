import { editDbItem, getDbItem, getDbItems } from "../index";
import { Request, Response } from 'express';

export const getPurchases = async (req: Request, res: Response) => {
  const purchases =  await getDbItems("purchases");
  const resp: any[] = [];

  purchases.forEach(async (purchase, index) => {
    const totem = await getDbItem("totens", purchase.totemId);

    resp.push({
      ...purchase,
      totemNickName: totem.nickName,
      totemLocationDescription: totem.locationDescription,
      totemResponsiblePerson: totem.responsiblePerson,
    })

    index === purchases.length -1 && res.status(200).json(resp) 
  });
};

export const getPurchaseById = async (req: Request, res: Response) => {
  const purchase = await getDbItem("purchases", req.params.id);
  const totem = await getDbItem("totens", purchase.totemId);
  res.json({
    ...purchase,
    totemNickName: totem.nickName,
    totemLocationDescription: totem.locationDescription,
    totemResponsiblePerson: totem.responsiblePerson,
  })
}

export const editPurchaseById = async (req: Request, res: Response) => {
  const resp = await editDbItem("purchases", req.params.id, req.body);
  return res.json(resp);
}
