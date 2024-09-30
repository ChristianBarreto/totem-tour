/* eslint-disable */
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const express = require("express");
const dayjs = require('dayjs');
var utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
import {Request, Response } from "express";
import 'dotenv/config';
import { MercadoPagoConfig, Payment } from 'mercadopago';

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();

export const mpApiKey = process.env.FUNCTIONS_EMULATOR === "false"
  ? process.env.MPKEYONLINE_PROD // !!! NEVER CHANGE IT !!!
  : process.env.MPKEYONLINE_TEST // change to test/prod to test in development environment

console.log(process.env.FUNCTIONS_EMULATOR, mpApiKey)

app.use(function(req: Request, res: Response, next: any) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  next();
});

const OnlineClient = new MercadoPagoConfig({
  accessToken: mpApiKey as string,
});

const onlinePayment = new Payment(OnlineClient);

initializeApp();
const db = getFirestore();

app.get("/products", async (req: Request, res: Response) => {
  const snapshot = await db.collection("products").get();
  const data: any[] = [];
  snapshot.forEach((doc: any) => {
    if (doc.data().isAvailable) {
      data.push({id: doc.id, ...doc.data()});
    }});
  res.json(data);
});

app.get("/cities", async (req: Request, res: Response) => {
  const snapshot = await db.collection("cities").get();
  const data: any[] = [];
  snapshot.forEach((doc: any) => {
    data.push({id: doc.id, ...doc.data()});
  });
  res.json(data);
});

app.get("/availabilities/:productId", async (req: Request, res: Response) => {
  const snapshot = await db.collection("availabilities")
    .where('productId', '==', req.params.productId)
    .where('active', '==', true)
    .where("availability", ">", 0)
    .where("remaining", ">", 0)
    .orderBy("date")
    .get();

  const data: any[] = [];

  snapshot.forEach((doc: any) => {
    data.push({id: doc.id, ...doc.data()});
  });
  res.json(data);
});

const MPExpirationDate = () => dayjs().tz("America/Sao_Paulo").add(5, 'minutes').add(10, 'seconds').format("YYYY-MM-DDTHH:mm:ss.SSSZ")

const firstName = (fullName: string) => fullName.split(' ').slice(0, -1).join(' ')
const lastName = (fullName: string) => fullName.split(' ').slice(-1).join(' ');
const areaCode = (phone: string ) => phone.replace('(', '').replace(')', '').split(' ').slice(0, -1).join(' ')
const phoneNumber = (phone: string ) => phone.replace('(', '').replace(')', '').replace('-', '').split(' ').slice(-1).join(' ');

app.post("/pix-payment", async (req: Request, res: Response) => {
  const { cartPrice, customerData } = req.body; // TODO: talvez remover todos os dados de Purchase e só deixar cartPrice e customer data.

  await onlinePayment.create({
    body: {
      transaction_amount: cartPrice,
      description: 'Passeios Totem Tour',
      payment_method_id: 'pix',
      date_of_expiration: MPExpirationDate(),
      payer: {
        first_name: firstName(customerData.name),
        last_name: lastName(customerData.name),
        email: customerData.email,
        phone:{
          area_code: areaCode(customerData.phone),
          number: phoneNumber(customerData.phone),
        }
      }
    }
  })
  .then((response) => {
    res.json(response);
  })
  .catch((error) => {
    console.log("Error generating pix", error)
    res.status(401)
    res.json(error)
  })
});

app.post("/verify-payment", async (req: Request, res: Response) => {
  onlinePayment.capture({
    id: req.body.id,
    transaction_amount: req.body.transaction_amount,
  }).then((resp) => {
    res.send(resp)
  }).catch((err) => {
    console.log("Error consulta ", req.body.id, ":", err)
    res.send(err)
  });
  
});

exports.totem = onRequest(app);


