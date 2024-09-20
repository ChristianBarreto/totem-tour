// const {logger} = require("firebase-functions");
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const express = require('express');
const app = express();

import { Request, Response } from "express";


initializeApp();
const db = getFirestore()


app.get('/products', async (req: Request, res: Response) => {
  const snapshot = await db.collection('products').get();
  const data: any[] = [];
  snapshot.forEach((doc: any) => {
    data.push({id: doc.id, ...doc.data()})
  });
  console.log(data);
  res.json(data)
});


exports.totem = onRequest(app);


