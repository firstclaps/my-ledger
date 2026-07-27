import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

// Mirrors the same get/set/delete/list interface the app already expects
// from window.storage, but backed by Firestore instead of localStorage —
// so data now syncs across every device you sign in from, instead of
// being stuck on one browser.
//
// Everything is stored under users/{uid}/store/{key}, and Firestore
// Security Rules (see firestore.rules) make sure only that signed-in
// user can ever read or write their own documents.
export function createFirestoreStorage(uid) {
  const storeRef = (key) => doc(db, "users", uid, "store", key);

  return {
    async get(key) {
      const snap = await getDoc(storeRef(key));
      if (!snap.exists()) return null;
      return { key, value: snap.data().value, shared: false };
    },
    async set(key, value) {
      await setDoc(storeRef(key), { value });
      return { key, value, shared: false };
    },
    async delete(key) {
      const snap = await getDoc(storeRef(key));
      const existed = snap.exists();
      await deleteDoc(storeRef(key));
      return { key, deleted: existed, shared: false };
    },
    async list(prefix) {
      const snaps = await getDocs(collection(db, "users", uid, "store"));
      const keys = snaps.docs.map((d) => d.id).filter((k) => !prefix || k.startsWith(prefix));
      return { keys, prefix, shared: false };
    },
  };
}
