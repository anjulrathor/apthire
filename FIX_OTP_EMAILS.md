# ⚡ URGENT: Enable OTP Emails - 3 Steps

## Current Issue:
Your `.env` file has: `EMAIL_PASS=YOUR_16_DIGIT_APP_PASSWORD_HERE`

This is a placeholder. You need to replace it with a real Gmail App Password.

---

## 🔧 Fix in 3 Steps (5 Minutes)

### Step 1: Generate Gmail App Password

1. **Open this link:** https://myaccount.google.com/apppasswords
2. **Login with:**
   - Email: `apthire.care@gmail.com`
   - Password: `Anjul@9027@95575`

3. **If you see "App passwords" option:**
   - Click "Select app" → Choose "Mail"
   - Click "Select device" → Choose "Other (Custom name)"
   - Type: `Apthire Backend`
   - Click "Generate"
   - **Copy the 16-digit password** (looks like: `abcd efgh ijkl mnop`)

4. **If you DON'T see "App passwords":**
   - First enable 2-Step Verification:
     - Go to: https://myaccount.google.com/security
     - Click "2-Step Verification" → Turn it ON
     - Follow the prompts (use your phone number)
   - Then go back to: https://myaccount.google.com/apppasswords
   - Now you should see the option

---

### Step 2: Update .env File

1. **Open:** `src/backend/.env`

2. **Find this line:**
   ```
   EMAIL_PASS=YOUR_16_DIGIT_APP_PASSWORD_HERE
   ```

3. **Replace with** (remove spaces from the password):
   ```
   EMAIL_PASS=abcdefghijklmnop
   ```
   *(Use your actual 16-character password, no spaces)*

4. **Save the file**

---

### Step 3: Restart Backend

1. **In your terminal running backend:**
   - Press `Ctrl + C` to stop
   
2. **Restart:**
   ```bash
   npm run backend
   ```

3. **Wait for:** "Server running on port 5001"

---

## ✅ Test It Works

1. Go to: `http://localhost:3000/signup`
2. Fill the form and submit
3. **Check email:** `apthire.care@gmail.com` inbox
4. You should receive a 4-digit OTP
5. Enter OTP and verify

---

## 🚨 Troubleshooting

### "App passwords" option not showing?
- **Solution:** Enable 2-Step Verification first
- Link: https://myaccount.google.com/security

### Email still not sending?
```bash
# Check your .env file
Get-Content src\backend\.env | Select-String "EMAIL"

# Should show:
# EMAIL_USER=apthire.care@gmail.com
# EMAIL_PASS=<16-character-password-no-spaces>
```

### Backend errors?
- Make sure you removed ALL spaces from the password
- Password should be exactly 16 characters
- No quotes around the password

---

## 📝 Quick Copy-Paste Template

After generating your app password, update `.env` like this:

```env
# Email Configuration (Gmail SMTP)
EMAIL_USER=apthire.care@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

Replace `abcdefghijklmnop` with your actual 16-character app password.

---

## ⏱️ Time Required:
- Generate App Password: 2 minutes
- Update .env: 30 seconds
- Restart Backend: 10 seconds
- **Total: ~3 minutes**

---

**Need Help?** The password you're looking for is a 16-character code from Google, NOT your regular Gmail password.
