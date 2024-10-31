// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const isProductionMode = process.env.NODE_ENV === 'production'

const firebaseConfig = {
  apiKey: "AIzaSyABCz5FMFYj5HHfxsb0QArGtSMTsYUEorQ",
  authDomain: "totem-tour.firebaseapp.com",
  projectId: "totem-tour",
  storageBucket: "totem-tour.appspot.com",
  messagingSenderId: "335364335110",
  appId: "1:335364335110:web:ba7dcfcad7b342a071c587",
  measurementId: "G-MDGS5J1TP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const logEvents = (eventName: string) => {
  isProductionMode && logEvent(analytics, eventName)
}