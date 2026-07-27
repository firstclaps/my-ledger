import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// The component was originally built as a Claude Artifact, which provides a
// `window.storage` key-value API that persists per-user automatically.
// Outside that environment there's no backend, so this shim maps the same
// get/set/delete/list calls onto the browser's localStorage instead.
// Data will now persist per-browser (not per-account) — same idea, just
// stored locally on whichever device/browser you use the site from.
window.storage = {
  async get(key) {
    const v = window.localStorage.getItem(key);
    if (v === null) return null;
    return { key, value: v, shared: false };
  },
  async set(key, value) {
    window.localStorage.setItem(key, value);
    return { key, value, shared: false };
  },
  async delete(key) {
    const existed = window.localStorage.getItem(key) !== null;
    window.localStorage.removeItem(key);
    return { key, deleted: existed, shared: false };
  },
  async list(prefix) {
    const keys = Object.keys(window.localStorage).filter(
      (k) => !prefix || k.startsWith(prefix)
    );
    return { keys, prefix, shared: false };
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
