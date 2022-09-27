import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTTYM1_nPalWGaAuQDArzSYIXFCpD5wgs",
    authDomain: "congo-achat.firebaseapp.com",
    databaseURL: "https://congo-achat.firebaseio.com",
    projectId: "congo-achat",
    storageBucket: "congo-achat.appspot.com",
    messagingSenderId: "415982365502",
    appId: "1:415982365502:web:dd6bf773aad3dc6f1e5a6f",
    measurementId: "G-1HQ0V0PTR3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);

export default  app; 

