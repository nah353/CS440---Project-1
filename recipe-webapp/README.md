## 1) What this project is

This app has **2 parts** that run at the same time:

- **Client** (the website you see) — runs on `http://localhost:5173`
- **Server** (the backend/API) — runs on `http://localhost:4000`

The project also uses a Google Gemini API key for AI recipe features.
(This feature is currently in BETA, and is not funcitoning)

---

## 2) Before you begin (one-time installs)

### A) Install Node.js (required)

1. Go to: https://nodejs.org
2. Download and install the **LTS** version.
3. Close and reopen PowerShell after installation.

### B) Verify Node.js installed correctly

Open PowerShell and run:

```powershell
node -v
npm -v
```

You should see version numbers (for example `v20.x.x`).

If you see "node is not recognized", Node is not installed correctly yet.

### C) (If needed) Fix PowerShell script permission errors

If commands fail with execution policy errors, run this once in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then type `Y` and press Enter.

---

## 3) Open the project folder

In PowerShell, navigate to the project:

```powershell
cd ".......\CS440---Project-1\recipe-webapp"
```

You should now be inside the folder that contains:

- `package.json`
- `client/`
- `server/`
- `setup-env.js`

---

## 4) Install dependencies and create `.env` files

Run:

```powershell
npm run setup
```

Wait until it finishes without errors.

---

## 5) Add your Gemini API key (required for AI features)

Project credits: **Daniel Travian** and **Nyle**.

1. Get a key from: https://aistudio.google.com
2. Open file `server/.env`
3. Find this line:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Replace `your_gemini_api_key_here` with your real key.
5. Save the file.

### Reference: expected `.env` values

`server/.env` should look like:

```env
PORT=4000
GEMINI_API_KEY=PASTE_REAL_KEY_HERE
CORS_ORIGIN=http://localhost:5173
```

`client/.env` should look like:

```env
VITE_API_BASE=http://localhost:4000/api
```

---

## 6) Start the app

From the `recipe-webapp` folder, run:

```powershell
npm run dev
```

This starts both server and client together.

When successful, you should see messages similar to:

- `Server listening on http://localhost:4000`
- Vite/client running on `http://localhost:5173`

---

## 7) Open and use the app

1. Open your browser.
2. Go to: **http://localhost:5173**
3. You should see the Recipe Webapp interface.

---

## 8) Common problems and fixes

### Problem: `node` or `npm` not recognized

- Reinstall Node.js LTS from https://nodejs.org
- Restart PowerShell after install

### Problem: permission / script execution error in PowerShell

Run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then rerun your command.

### Problem: Port already in use (`4000` or `5173`)

- Close other apps/terminals that might already be running this project
- Try `Ctrl + C` in old terminals
- Run `npm run dev` again

### Problem: AI features fail or return key/auth errors

- Reopen `server/.env`
- Confirm `GEMINI_API_KEY` has a real key (no quotes, no extra spaces)
- Restart the app after editing `.env`

### Problem: Browser opens but recipes/requests fail

- Confirm server is running on `http://localhost:4000`
- Confirm `client/.env` contains:

```env
VITE_API_BASE=http://localhost:4000/api
```

- Stop and restart `npm run dev`

---

## 10) Daily quick start (after first setup)

After everything is installed once, usually you only need:

```powershell
cd "......\CS440---Project-1\recipe-webapp"
npm run dev
```

Open: `http://localhost:5173`

---
