const functions = require('firebase-functions');
const {getFirestore} = require("firebase-admin/firestore");

const db = getFirestore();

exports.products = functions.https.onRequest(async (req: Request, res: Response) => {
  const snapshot = await db.collection("products").get();
  const data: any[] = [];
  snapshot.forEach((doc: any) => {
    if (doc.data().isAvailable) {
      data.push({id: doc.id, ...doc.data()});
    }});
  res.json(data);
})

exports.cities = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100)
  res.send(number.toString())
})





// /* eslint-disable */
// // const {logger} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/v2/https");
// const {initializeApp} = require("firebase-admin/app");
// const {getFirestore} = require("firebase-admin/firestore");
// const express = require("express");
// const app = express();

// import {Request, Response} from "express";


// initializeApp();
// const db = getFirestore();

// app.get("/products", async (req: Request, res: Response) => {
//   const snapshot = await db.collection("products").get();
//   const data: any[] = [];
//   snapshot.forEach((doc: any) => {
//     if (doc.data().isAvailable) {
//       data.push({id: doc.id, ...doc.data()});
//     }});
//   res.json(data);
// });

// app.get("/cities", async (req: Request, res: Response) => {
//   const snapshot = await db.collection("cities").get();
//   const data: any[] = [];
//   snapshot.forEach((doc: any) => {
//     data.push({id: doc.id, ...doc.data()});
//   });
//   res.json(data);
// });


// exports.totem = onRequest(app);


