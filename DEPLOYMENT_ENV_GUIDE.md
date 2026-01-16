# 🚀 Apthire Deployment Guide (Simple Version)

To make everything work on live (Vercel & Render), you need to set these environment variables exactly as shown below.

## 1. Render (Backend) Settings
Go to your Dashboard -> Select Backend Service -> Environment Variables -> Add Env Var

| Variable Name | Value to Add | Notes |
|--------------|--------------|-------|
| `FRONTEND_URL` | `https://apthire.vercel.app` | **CRITICAL!** Set this to your live Vercel link. NO trailing slash. |
| `GOOGLE_CALLBACK_URL` | `https://apthire-backend.onrender.com/api/auth/google/callback` | Change `apthire-backend` to your actual Render app name if different. |
| `EMAIL_USER` | `apthire.care@gmail.com` | Your gmail. |
| `EMAIL_PASS` | `ghxbhwbeujwknxvx` | The 16-char password we generated. NO SPACES. |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB connection string. |
| `JWT_SECRET` | `somereallylongsecretkey123` | Can be anything long and random. |
| `GOOGLE_CLIENT_ID` | `...` | From Google Cloud Console. |
| `GOOGLE_CLIENT_SECRET` | `...` | From Google Cloud Console. |

---

## 2. Vercel (Frontend) Settings
Go to your Project -> Settings -> Environment Variables

| Variable Name | Value to Add | Notes |
|--------------|--------------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://apthire-backend.onrender.com` | **CRITICAL!** Points to your live backend. NO trailing slash. |

---

## ⚠️ Common Mistakes (Check these if it breaks!)

1. **Google Login opens Render page instead of Vercel?**
   - This happens if `FRONTEND_URL` in Render is missing or pointing to localhost.
   - **Fix:** Set `FRONTEND_URL` to `https://apthire.vercel.app` in Render.

2. **Google Error 400: redirect_uri_mismatch?**
   - You need to add the Backend URL to Google Cloud Console.
   - Go to Google Cloud -> APIs & Services -> Credentials -> OAuth Client ID.
   - Add to "Authorized redirect URIs": `https://apthire-backend.onrender.com/api/auth/google/callback`

3. **Emails not working on live?**
   - Make sure `EMAIL_PASS` in Render has absolutely NO SPACES.

---

## 3. How to Update
After adding these variables, you MUST **Redeploy** for changes to take effect.
- **Render:** Manual Deploy -> Deploy latest commit.
- **Vercel:** Redeploy (usually automatic on push).
