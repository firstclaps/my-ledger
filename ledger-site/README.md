# My Ledger

A personal expense / salary / mutual-fund tracker, packaged as a standalone
website ready to deploy to GitHub Pages.

## 1. One-time setup

1. Create a new **public** repo on GitHub, e.g. `my-ledger`.
2. In `vite.config.js`, set `base` to match your repo name exactly:
   ```js
   base: "/my-ledger/",
   ```
   (If your repo is named something else, use that name instead — keep the
   leading and trailing slashes.)
3. Push this whole folder to that repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-ledger.git
   git push -u origin main
   ```

## 2. Turn on GitHub Pages

1. On GitHub, go to your repo → **Settings** → **Pages**.
2. Under "Build and deployment" → **Source**, choose **GitHub Actions**.
3. That's it — the included workflow (`.github/workflows/deploy.yml`) will
   build and deploy the site automatically every time you push to `main`.
4. After the first push, check the **Actions** tab to watch it build. Once
   green, your site will be live at:
   ```
   https://<your-username>.github.io/my-ledger/
   ```

## 3. Using it day to day

- Just open the URL above — no login needed, it's just a static site.
- Your data is saved in your **browser's local storage** on whichever
  device you use. It is *not* synced across devices or browsers, and
  clearing your browser data will clear it too. (This is the trade-off of
  a no-backend static site — see note below if you want it to sync
  across devices.)

## 4. Local development (optional)

```bash
npm install
npm run dev
```
Opens the app locally at `http://localhost:5173`.

## Notes

- This was originally built as a Claude Artifact, which has its own
  built-in per-account storage. That's swapped out here (see
  `src/main.jsx`) for a `localStorage`-based shim, since a static GitHub
  Pages site has no backend of its own.
- If you'd like the data to sync across devices/browsers (not just persist
  on one), you'd need a small backend or a service like Firebase/Supabase
  to store the JSON instead of `localStorage` — happy to help wire that up
  if you want it later.
