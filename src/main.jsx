import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

function createLocalStorage() {
  const prefix = "my-ledger:";

  return {
    async get(key) {
      try {
        const value = localStorage.getItem(prefix + key);
        return value == null ? null : { key, value, shared: false };
      } catch {
        return null;
      }
    },
    async set(key, value) {
      try {
        localStorage.setItem(prefix + key, value);
        return { key, value, shared: false };
      } catch {
        return { key, value, shared: false };
      }
    },
    async delete(key) {
      try {
        const existed = localStorage.getItem(prefix + key) !== null;
        localStorage.removeItem(prefix + key);
        return { key, deleted: existed, shared: false };
      } catch {
        return { key, deleted: false, shared: false };
      }
    },
    async list(prefixFilter) {
      try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i += 1) {
          const storageKey = localStorage.key(i);
          if (!storageKey || !storageKey.startsWith(prefix)) continue;
          const key = storageKey.slice(prefix.length);
          if (!prefixFilter || key.startsWith(prefixFilter)) keys.push(key);
        }
        return { keys, prefix: prefixFilter || "", shared: false };
      } catch {
        return { keys: [], prefix: prefixFilter || "", shared: false };
      }
    },
  };
}

window.storage = createLocalStorage();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
