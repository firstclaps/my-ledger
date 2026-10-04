import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Loader2 } from "lucide-react";

function createLocalStorageAdapter() {
  return {
    async get(key) {
      const value = localStorage.getItem(key);
      return value === null ? null : { key, value, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      const existed = localStorage.getItem(key) !== null;
      localStorage.removeItem(key);
      return { key, deleted: existed, shared: false };
    },
    async list(prefix) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (key && (!prefix || key.startsWith(prefix))) keys.push(key);
      }
      return { keys, prefix, shared: false };
    },
  };
}

function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.storage = createLocalStorageAdapter();
    setReady(true);
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

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
