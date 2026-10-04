import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createFirestoreStorage } from "./firestoreStorage.js";

const FIXED_UID = "UbAuzaQWSLcNq6Rpq1oMxgvLssj1";

function Root() {
  window.storage = createFirestoreStorage(FIXED_UID);
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
