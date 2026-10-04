import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  throw new Error(
    "Set FIREBASE_SERVICE_ACCOUNT_PATH to a JSON service-account file generated from Firebase Project Settings > Service accounts."
  );
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function createCustomTokenForUser(uid) {
  // This replaces legacy database-secret token generation.
  // Firebase Admin SDK generates custom tokens securely on the backend.
  return admin.auth().createCustomToken(uid);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const uid = process.argv[2] || "demo-user";
  const token = await createCustomTokenForUser(uid);
  console.log(`Custom token for ${uid}: ${token}`);
}
