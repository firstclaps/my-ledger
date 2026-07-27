import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ---------------------------------------------------------------------
// PASTE YOUR OWN FIREBASE CONFIG HERE.
// Get this from: Firebase Console -> Project settings (gear icon) ->
// "Your apps" -> Web app (</>) -> the firebaseConfig object shown there.
//
// This is safe to commit / keep public — Firebase config values are not
// secrets. Real security comes from Firestore Security Rules (see
// firestore.rules in this project) plus Authentication, not from hiding
// these values.
// ---------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAt7qdDkUmcYb_hgaAfosmPlMLCAWGYE6Y",
  authDomain: "my-ledger-c8e43.firebaseapp.com",
  projectId: "my-ledger-c8e43",
  storageBucket: "my-ledger-c8e43.firebasestorage.app",
  messagingSenderId: "237343343159",
  appId: "1:237343343159:web:8c43d3a7add5430e0575b2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
