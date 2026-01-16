# 🚨 Fix "Module Not Found" on Render

Your error `Error: Cannot find module 'nodemailer'` means Render's "node_modules" folder is outdated. It doesn't know you added a new package.

### ✅ Solution: Clear Build Cache

1. Go to your **Render Dashboard**.
2. Click on your **Backend Service**.
3. Click the **"Manual Deploy"** button (top right).
4. Select **"Clear Build Cache & Deploy"**.

**Why?**
Render saves a copy of old installed packages to save time. Sometimes it doesn't notice new packages. "Clear Build Cache" forces it to delete everything and install fresh from `package.json`.

---

### ⚠️ Check Settings (If above doesn't work)

Make sure your Render settings are correct:

- **Build Command:** `npm install`
- **Start Command:** `node src/backend/server.js` (or `npm run backend`)
- **Root Directory:** `.` (Leave empty or set to dot)
