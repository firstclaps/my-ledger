# My Ledger

A personal expense / salary / mutual-fund tracker. Hosted as a static site
on GitHub Pages, with Firebase handling login and data sync across devices.

## Part A — Set up Firebase (one-time, ~10 minutes)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
   and create a new project (free "Spark" plan is enough).
2. **Enable Authentication**: left sidebar → Build → Authentication →
   "Get started" → under "Sign-in method", enable **Email/Password**.
3. **Create your one account**: still in Authentication → "Users" tab →
   "Add user" → enter the email + password you'll sign in with. This app
   has no public sign-up form, so in normal use this is the only account
   anyone would ever sign in as.
4. **Copy your UID**: in that same "Users" table, copy the value shown in
   the "User UID" column for the account you just created — you'll need
   it in the next step.
5. **Create the database**: left sidebar → Build → Firestore Database →
   "Create database" → start in **production mode** → pick any region.
6. **Lock down the security rules**: open `firestore.rules` (included in
   this project), replace `PASTE_YOUR_FIREBASE_UID_HERE` with the UID you
   copied in step 4, then paste the whole file into Firestore → "Rules"
   tab on the console and click Publish. This hardcodes data access to
   that one exact account — even if someone else creates their own
   separate Firebase account, every read/write they attempt is denied
   outright, so their account can't do anything at all.
7. **Get your web config**: Project settings (gear icon, top left) →
   scroll to "Your apps" → click the web icon `</>` → register an app
   (nickname doesn't matter, skip hosting) → copy the `firebaseConfig`
   object shown.
8. Paste those values into `src/firebase.js` in this project, replacing
   the placeholders.
9. **Authorize your GitHub Pages domain**: Authentication → Settings →
   "Authorized domains" → Add domain → enter
   `<your-username>.github.io` (once you know it from Part B).

## Part B — Deploy to GitHub Pages

1. Create a new **public** repo on GitHub, e.g. `my-ledger`.
2. In `vite.config.js`, set `base` to match your repo name exactly:
   ```js
   base: "/my-ledger/",
   ```
3. From inside this project folder (the one with `package.json` directly
   in it — not a folder wrapping it):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-ledger.git
   git push -u origin main
   ```
4. On GitHub: repo → **Settings** → **Pages** → Source → **GitHub
   Actions**. The included workflow (`.github/workflows/deploy.yml`)
   builds and deploys automatically on every push to `main`.
5. Check the **Actions** tab — once the run is green, your site is live
   at:
   ```
   https://<your-username>.github.io/my-ledger/
   ```
6. Go back and finish step 8 in Part A now that you have this URL.

## Using it day to day

- Open your site URL, sign in with the one email/password you created in
  Firebase, and use it as normal.
- Data now lives in Firestore, so signing in from your phone or another
  computer shows the same data, kept in sync automatically.
- Use the sign-out icon (top right) when you're done on a shared device.

## Local development (optional)

```bash
npm install
npm run dev
```
Opens the app locally at `http://localhost:5173`. Firebase auth works
the same way locally once `src/firebase.js` has your real config — you
may also need to add `localhost` to Firebase's Authorized domains list.

## Notes on security

- `src/firebase.js`'s config values are safe to keep in the repo/public
  code — Firebase config isn't a secret. Real access control is enforced
  server-side by `firestore.rules`, which only Firebase itself can change
  (via the console, or an authenticated deploy).
- There's no password-reset flow wired into the UI. If you forget your
  password, reset it manually from Firebase Console → Authentication →
  Users → your account → "Reset password".
- Since the security rules are hardcoded to your exact UID, anyone who
  creates their own separate Firebase account on this project gets denied
  on every single read/write — their account simply can't function. If
  you ever want to fully prevent even those empty accounts from being
  created (cosmetic only — they can't access anything either way), that
  needs a Cloud Function on Firebase's paid Blaze plan; ask if you'd like
  that added.
