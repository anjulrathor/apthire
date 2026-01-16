# 🚀 Quick Start - OTP Verification

## 1️⃣ Setup (One-Time - 5 Minutes)

### Get Gmail App Password:
1. Login to `apthire.care@gmail.com` (Password: `Anjul@9027@95575`)
2. Go to: **Google Account → Security → 2-Step Verification**
3. Enable if not already enabled
4. Click **App passwords** → Select **Mail** → **Other (Custom)** → Type "Apthire"
5. **Copy the 16-digit password** (format: xxxx xxxx xxxx xxxx)

### Update Environment:
```bash
# Edit: src/backend/.env
EMAIL_USER=apthire.care@gmail.com
EMAIL_PASS=<paste-16-digit-password-here>  # NO SPACES!
```

### Restart Backend:
```bash
# Stop current backend (Ctrl+C)
npm run backend
```

---

## 2️⃣ Test Flow (2 Minutes)

### Test Signup:
1. Open: `http://localhost:3000/signup`
2. Fill form → Submit
3. **Check email** for 4-digit OTP
4. Enter OTP → Verify
5. Should redirect to `/login`

### Test Login Protection:
1. Try login **before** verifying → Should block
2. Complete verification → Login should work

### Test Resend:
1. On OTP screen → Wait 60s
2. Click "Resend OTP"
3. New OTP arrives in email

---

## 3️⃣ Production Deploy (5 Minutes)

### Render Environment Variables:
```
EMAIL_USER=apthire.care@gmail.com
EMAIL_PASS=<your-16-digit-app-password>
```

Add these in: **Render Dashboard → Service → Environment**

---

## 🔍 Quick Debug

### Email not sending?
```bash
# Check .env file
cat src/backend/.env | grep EMAIL

# Should show:
# EMAIL_USER=apthire.care@gmail.com
# EMAIL_PASS=<16-digit-password>
```

### Backend error?
```bash
# Restart backend
npm run backend

# Check for errors in terminal
```

### OTP not working?
- Check it's exactly 4 digits
- Verify it hasn't expired (5 min)
- Try resending

---

## 📋 API Quick Reference

```javascript
// Register
POST /api/users/register
{ name, email, password, role }
→ OTP sent to email

// Verify
POST /api/users/verify-otp
{ email, otp }
→ Returns token

// Resend
POST /api/users/resend-otp
{ email }
→ New OTP sent

// Login (blocked if not verified)
POST /api/users/login
{ email, password }
→ Returns token or error
```

---

## ✅ Checklist

- [ ] Gmail App Password generated
- [ ] `.env` updated with EMAIL_PASS
- [ ] Backend restarted
- [ ] Signup tested
- [ ] OTP email received
- [ ] Verification works
- [ ] Login protection works
- [ ] Ready for production

---

**Time to Complete:** 15 minutes  
**Difficulty:** Easy  
**Status:** Production Ready ✅
