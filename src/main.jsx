import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { createFirestoreStorage } from "./firestoreStorage.js";
import Login from "./Login.jsx";
import App from "./App.jsx";
import { Loader2 } from "lucide-react";

function Root() {
  const [status, setStatus] = useState("checking"); // checking | signedOut | signedIn
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Point the app's storage calls at this user's private Firestore
        // documents before we ever mount it, so its first load reads the
        // right data.
        window.storage = createFirestoreStorage(user.uid);
        setStatus("signedIn");
      } else {
        setStatus("signedOut");
      }
      setReady(true);
    });
    return unsub;
  }, []);

  if (!ready) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#EAF1E4", color: "#4C6656", fontFamily: "IBM Plex Sans, sans-serif",
      }}>
        <Loader2 className="animate-spin" size={20} style={{ marginRight: 8 }} /> Loading…
      </div>
    );
  }

  if (status === "signedOut") return <Login />;

  return <App onSignOut={() => signOut(auth)} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
