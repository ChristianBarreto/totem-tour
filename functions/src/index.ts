/* eslint-disable */
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const express = require("express");
import {Request, Response } from "express";

const app = express();

app.use(function(req: Request, res: Response, next: any) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



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


exports.totem = onRequest(app);


