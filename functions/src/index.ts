/* eslint-disable */
// const {logger} = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
// import { getAnalytics } from "firebase/analytics";
const { getFirestore } = require("firebase-admin/firestore");
const express = require("express");
const dayjs = require('dayjs');
// const qs = require('qs');
var utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
import { Request, Response } from "express";
import 'dotenv/config';
import { MercadoPagoConfig, Payment, Point } from 'mercadopago';
import { PointGetDevicesData } from "mercadopago/dist/clients/point/getDevices/types";
import { GetPaymentIntentListResponse } from "mercadopago/dist/clients/point/commonTypes";
import { editPurchaseById, getPurchaseById, getPurchases } from "./controllers/purchases";
import { addSlide, editSlide, getSlide, getSlides } from "./controllers/slides";
import { addProduct, editProduct, getProduct, getProducts } from "./controllers/products";
import { getTotemPingById, setTotemPingById } from "./controllers/totemPing";
import { getTotemById, getTotens, editTotemById, addTotemById } from "./controllers/totems";
import { queryRef } from "./helpers";
import { getPurchaseItems } from "./controllers/purchaseItems";
import { addAvailabilityById, deleteAvailabilities, deleteAvailabilityById, editAvailabilityById, getAvailabilities, getAvailabilityById } from "./controllers/availabilities";
import { addRegion, deleteRegionById, editRegionById, getRegionById, getRegions } from "./controllers/regions";
import { getCities, getCityById, addCity, editCityById, deleteCityById } from "./controllers/cities";

dayjs.extend(utc);
dayjs.extend(timezone);

export const app = express();

export const firebaseConfig = {
  apiKey: process.env.FIREBASEKEY,
  authDomain: "totem-tour.firebaseapp.com",
  projectId: "totem-tour",
  storageBucket: "totem-tour.appspot.com",
  messagingSenderId: "335364335110",
  appId: "1:335364335110:web:ba7dcfcad7b342a071c587",
  measurementId: "G-MDGS5J1TP0"
};

const envProduction = process.env.FUNCTIONS_EMULATOR !== 'true'

export const mpApiKey = envProduction
  ? process.env.MPKEYONLINE_PROD // !!! NEVER CHANGE IT !!!
  : process.env.MPKEYONLINE_PROD // change to test/prod to test in development environment

console.log("PRODUCTION", envProduction);

app.use(function(request: Request, response: Response, next: any) {
  response.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// TODO: this is an example of CORS usage
// export const buildResponse = (request: Request, response: Response, data: any) => {

// 	const allowedOrigins = ['http://localhost:3000/', 'https://power-design.firebaseapp.com'];
//   const origin = request.headers.origin;
//   if(origin && allowedOrigins.indexOf(origin) > -1){
// 		response.setHeader('Access-Control-Allow-Origin', origin);
// 	}

// 	response.setHeader('Content-Type', 'application/json');
//   response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
// 	response.send(data);

// }

const OnlineClient = new MercadoPagoConfig({
  accessToken: mpApiKey as string,
});

const onlinePayment = new Payment(OnlineClient);
const point = new Point(OnlineClient);

initializeApp(firebaseConfig);
const db = getFirestore();

export async function getDbItems(dbName: string, query?: any): Promise<any[]> {
  let collectionRef = await db.collection(dbName); 
  collectionRef = queryRef(collectionRef, query);
  const itemsRef = await collectionRef.get();

  const data: any[] = [];
  itemsRef?.forEach((doc: any) => {
    data.push({id: doc.id, ...doc.data()})
  });

  return data;
};

export const getDbItem = async (dbName: string, id: string): Promise<any> => new Promise((resolve, reject) => {
  db.collection(dbName).doc(id).get().then((snapshot: any) => {
    if (snapshot.exists) {
      resolve({id: snapshot.id, ...snapshot.data()})
    }else {
      reject(`Id '${id}' not found in '${dbName}' DB`);
    }
  });
})

export async function editDbItem(dbName: string, id: string, data: any) {
  delete data['id']
  const snapshot = await db.collection(dbName).doc(id).set({
    ...data,
    lastUpdated: Date.now(),
  });
  return {id: snapshot.id}
}

export async function mergeDbItem(dbName: string, id: string, data: any) {
  delete data['id']
  const snapshot = await db.collection(dbName).doc(id).set({
    ...data,
    lastUpdated: Date.now(),
  }, { merge: true });
  return {id: snapshot.id}
}

export async function addDbItem(dbName: string, data: any) {
  delete data['id']
  const snapshot = await db.collection(dbName).add({
    ...data,
    lastUpdated: Date.now(),
    timestamp: Date.now(),
  });
  return {id: snapshot.id}
}

export async function deleteDbItem(dbName: string, id: string) {
  const snapshot = await db.collection(dbName).doc(id).delete();
  return {id: snapshot.id}
};

export const bulkDeleteDbItems = async (dbName: string, query?: any): Promise<void> => new Promise(async (resolve, reject) => {
  let collectionRef = await db.collection(dbName); 
  collectionRef = queryRef(collectionRef, query);
  const itemsRef = await collectionRef.get();
  let len = 0;
  if (itemsRef.size === 0) {
    resolve();
  };
  itemsRef?.forEach(async (doc: any) => {
    await db.collection(dbName).doc(doc.id).delete();
    
    len++;
    if (len+1 === itemsRef.size) {
      resolve();
    }
  });
});

app.get("/products", async (req: Request, res: Response) => getProducts(req, res));
app.get("/products/:id", async (req: Request, res: Response) => getProduct(req, res));
app.post("/products", async (req: Request, res: Response) => addProduct(req, res));
app.put("/products/:id", async (req: Request, res: Response) => editProduct(req, res));

app.get("/purchases", async (req: Request, res: Response) => getPurchases(req, res));
app.get("/purchases/:id", async (req: Request, res: Response) => getPurchaseById(req, res));
app.put("/purchases/:id", async (req: Request, res: Response) => editPurchaseById(req, res));

app.get("/purchase-items", async (req: Request, res: Response) => getPurchaseItems(req, res));

app.get("/slides", async (req: Request, res: Response) => getSlides(req, res));
app.get("/slides/:id", async (req: Request, res: Response) => getSlide(req, res));
app.post("/slides/", async (req: Request, res: Response) => addSlide(req, res));
app.put("/slides/:id", async (req: Request, res: Response) => editSlide(req, res));
// app.delete("/slides:id", async (req: Request, res: Response) => getSlides(req, res));

app.get("/availabilities", async (req: Request, res: Response) => getAvailabilities(req, res));
app.get("/availabilities/:id", async (req: Request, res: Response) => getAvailabilityById(req, res));
app.post("/availabilities", async (req: Request, res: Response) => addAvailabilityById(req, res));
app.put("/availabilities/:id", async (req: Request, res: Response) => editAvailabilityById(req, res));
app.delete("/availabilities/:id", async (req: Request, res: Response) => deleteAvailabilityById(req, res));
app.delete("/availabilities/", async (req: Request, res: Response) => deleteAvailabilities(req, res));

app.get("/regions", async (req: Request, res: Response) => getRegions(req, res));
app.get("/regions/:id", async (req: Request, res: Response) => getRegionById(req, res));
app.post("/regions", async (req: Request, res: Response) => addRegion(req, res));
app.put("/regions/:id", async (req: Request, res: Response) => editRegionById(req, res));
app.delete("/regions/:id", async (req: Request, res: Response) => deleteRegionById(req, res));

app.get("/cities", async (req: Request, res: Response) => getCities(req, res));
app.get("/cities/:id", async (req: Request, res: Response) => getCityById(req, res));
app.post("/cities", async (req: Request, res: Response) => addCity(req, res));
app.put("/cities/:id", async (req: Request, res: Response) => editCityById(req, res));
app.delete("/cities/:id", async (req: Request, res: Response) => deleteCityById(req, res));

const MPExpirationDate = () => dayjs().tz("America/Sao_Paulo").add(5, 'minutes').add(10, 'seconds').format("YYYY-MM-DDTHH:mm:ss.SSSZ")

const firstName = (fullName: string) => fullName.split(' ').slice(0, -1).join(' ')
const lastName = (fullName: string) => fullName.split(' ').slice(-1).join(' ');
const areaCode = (phone: string ) => phone.replace('(', '').replace(')', '').split(' ').slice(0, -1).join(' ')
const phoneNumber = (phone: string ) => phone.replace('(', '').replace(')', '').replace('-', '').split(' ').slice(-1).join(' ');

app.post("/pix-payment", async (req: Request, res: Response) => {
  const { cartPrice, customerData } = req.body; // TODO: talvez remover todos os dados de Purchase e só deixar cartPrice e customer data.

  await onlinePayment.create({
    body: {
      transaction_amount: cartPrice / 100, // Conversão de centavos para reais.
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

app.post("/set-purchase", async (req: Request, res: Response) => {
  const {
    acceptedTerms,
    cartPrice,
    totalNetPrice,
    totalPartnerComm,
    totalCompanyComm,    
    customerData,
    payementCaptured,
    paymentId,
    paymentMethod,
    paymentValue,
    products,
    totemId,
  } = req.body;

  const customerDb = await db
    .collection("customers")
    .add({
      ...customerData,
      timestamp: Date.now(),
    });

  const purchaseDb = await db
    .collection("purchases")
    .add({
      customerId: customerDb.id,
      acceptedTerms,
      cartPrice,
      totalNetPrice,
      totalPartnerComm,
      totalCompanyComm,
      payementCaptured,
      paymentId,
      paymentMethod,
      paymentValue,
      totemId,
      customerMsg: false,
      operatorsMsg: false,
      operatorsConfirmed: false,
      partnerMsg: false,
      timestamp: Date.now(),
    }); // TODO: quando login ficar pronto, informações do login e device ID

  const purchaseItensDb = await db
    .collection("purchaseItems")
  
  products.forEach((item: any) => { // TODO: replace all 'any's
    purchaseItensDb.add({
      ...item,
      purchaseId: purchaseDb.id, 
      customerId: customerDb.id,
      totemId,
      timestamp: Date.now(),
    }) // TODO: quando login ficar pronto, informações do login e device ID
  })

  res.send({ status: 'ok', purchaseId: purchaseDb.id })
});

app.get("/pos", async (req: Request, res: Response) => {
  const request = {
    options: {},
  };

  point
    .getDevices(request as unknown as PointGetDevicesData)
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    });
});

app.post("/pos/:id/change-mode", async (req: Request, res: Response) => {
  console.log("device_id", req.params.id, req.body)
  point.changeDeviceOperatingMode({
		device_id: req.params.id,
		request: {
			operating_mode: req.body.mode,
		},
	}).then((resp) => {
    console.log(resp)
    res.json(resp)
  }).catch((err) => {
    console.log(err)

    res.json(err)
  })
});

app.post("/payment-intent", async (req: Request, res: Response) => {
  point.createPaymentIntent({
		device_id: req.body.device_id,
		request: {
			amount: req.body.amount,
      description: req.body.description,
      payment: {
        type: req.body.type,
        installments: req.body.installments,
        installments_cost: req.body.installments_cost,
      },
      additional_info: {
        print_on_terminal: req.body.print
      }
		},
	}).then((resp) => {
    res.json(resp)
  }).catch((err) => {
    res.status(400)
    res.json(err)
  })
});

const getOpenPaymentIntentId = (intents: GetPaymentIntentListResponse | undefined) => {
  return intents?.events?.filter((event) => (event.status === "OPEN") || (event.status === "ON_TERMINA"))
}

app.post("/cancel-last-payment-intent", async (req: Request, res: Response) => {
  
  const data = {
    body: {
      options: {
        startDate: dayjs().tz("America/Sao_Paulo").add(-2, 'days').format("YYYY-MM-DD"),
        endDate: dayjs().tz("America/Sao_Paulo").format("YYYY-MM-DD"),
      },
    }
  }
  
  point.getPaymentIntentList(data).then((resp: GetPaymentIntentListResponse) => {
    const opentIntents = getOpenPaymentIntentId(resp);
    console.log("Open intents: ", opentIntents);
    
    !opentIntents?.length && res.json({cancelationStatus: 'No intent to be cancelled'});

    opentIntents?.forEach((intent) => {
      console.log("Cancel intent", intent.payment_intent_id)

      point.cancelPaymentIntent({
        device_id: req.body.device_id,
        payment_intent_id: intent.payment_intent_id,
      }).then((resp) => {
        res.json({cancelationStatus: resp})
      }).catch((err) => {
        res.status(503).json(err)
      })
    })
  }).catch((err) => {
    res.status(503).json(err)
  })
});

app.post("/get-payment-intent-status", async (req: Request, res: Response) => {
  if (mpApiKey) {
    point.getPaymentIntentStatus({
      payment_intent_id: req.body.payment_intent_id,
    }).then((resp) => {
      res.json(resp)
    }).catch((err) => {
      console.log("ERR", err)
      res.json(err)
    })
  }
});

app.get("/get-totem-tour", async (req: Request, res: Response) => {
  const totemTour = await getDbItem("totemTour", "s4r21ilBohl2w3PiFdZQ")
  res.json(totemTour)
});

app.put("/set-totem-tour", async (req: Request, res: Response) => {
  const resp = await editDbItem("totemTour", "s4r21ilBohl2w3PiFdZQ", req.body);
  res.json(resp);
});

app.post("/totens", async (req: Request, res: Response) => addTotemById(req, res));
app.get("/totens", async (req: Request, res: Response) => getTotens(req, res));
app.get("/totens/:id", async (req: Request, res: Response) => getTotemById(req, res));
app.put("/totens", async (req: Request, res: Response) => editTotemById(req, res));

app.put("/totem-ping/:id", async (req: Request, res: Response) => setTotemPingById(req, res));
app.get("/totem-ping/:id", async (req: Request, res: Response) => getTotemPingById(req, res));

exports.totem = onRequest(app);
