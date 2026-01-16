# 🔐 OTP Email Verification Setup Guide

## ✅ What Has Been Implemented

### Backend Changes:
1. **User Model** (`src/backend/models/User.js`)
   - Added `otp` (hashed), `otpExpiresAt`, and `isVerified` fields
   
2. **Email Service** (`src/backend/utils/sendEmail.js`)
   - Nodemailer configured for Gmail SMTP
   
3. **User Controller** (`src/backend/controllers/userController.js`)
   - `registerUser`: Generates 4-digit OTP, hashes it, sends email
   - `verifyOTP`: Validates OTP and marks user as verified
   - `resendOTP`: Regenerates and resends OTP
   - `loginUser`: Blocks login if `isVerified === false`
   
4. **Routes** (`src/backend/routes/userRoutes.js`)
   - `POST /api/users/verify-otp`
   - `POST /api/users/resend-otp`

### Frontend Changes:
1. **Signup Page** (`src/app/signup/page.jsx`)
   - Two-step flow: Registration → OTP Verification
   - 5-minute countdown timer
   - Resend OTP functionality
   - Auto-redirect from login if unverified
   
2. **Login Page** (`src/app/login/page.jsx`)
   - Detects unverified email error
   - Redirects to verification step

---

## 🚨 REQUIRED MANUAL SETUP

### Step 1: Generate Gmail App Password

1. Go to your Gmail account: `apthire.care@gmail.com`
2. Enable **2-Step Verification**:
   - Google Account → Security → 2-Step Verification → Turn On
3. Generate **App Password**:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → Enter "Apthire Node"
   - Click **Generate**
   - Copy the **16-digit password** (format: `xxxx xxxx xxxx xxxx`)

### Step 2: Update Environment Variables

#### Local Development:
Edit `src/backend/.env`:
```bash
EMAIL_USER=apthire.care@gmail.com
EMAIL_PASS=<paste-your-16-digit-app-password-here>
```

#### Production (Render):
1. Go to your Render dashboard
2. Select your backend service
3. Navigate to **Environment** tab
4. Add these variables:
   ```
   EMAIL_USER=apthire.care@gmail.com
   EMAIL_PASS=<your-16-digit-app-password>
   ```
5. Click **Save Changes**
6. Service will auto-redeploy

---

## 🔒 Security Features

✅ OTP is **hashed** before storage (bcrypt)  
✅ OTP expires after **5 minutes**  
✅ Login **blocked** until email verified  
✅ No plaintext secrets in code  
✅ Environment-based configuration  
✅ Rate limiting via resend button (60s cooldown)  

---

## 🧪 Testing the Flow

### Test Signup Flow:
1. Navigate to `/signup`
2. Fill in details and submit
3. Check email for 4-digit OTP
4. Enter OTP on verification screen
5. Should redirect to `/login` on success

### Test Login Protection:
1. Try logging in without verifying email
2. Should show error and redirect to verification

### Test Resend OTP:
1. On verification screen, wait 60 seconds
2. Click "Resend OTP"
3. New OTP should arrive in email

---

## 📧 Email Template

**Subject:** Verify your Apthire account

**Body:**
```
Verify your Apthire account

Thanks for signing up! Please use the following OTP to verify your email address:

[4-DIGIT OTP]

This OTP is valid for 5 minutes.

If you didn't request this, please ignore this email. Do not share your OTP with anyone.
```

---

## 🐛 Troubleshooting

### Email not sending?
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASS` are in `.env`
- Restart backend server after env changes

### OTP expired?
- User can click "Resend OTP"
- New OTP will be generated and sent

### Login still blocked?
- Ensure user completed OTP verification
- Check `isVerified` field in database

---

## 🚀 Deployment Checklist

- [ ] Generate Gmail App Password
- [ ] Add `EMAIL_USER` to local `.env`
- [ ] Add `EMAIL_PASS` to local `.env`
- [ ] Test signup flow locally
- [ ] Add `EMAIL_USER` to Render environment
- [ ] Add `EMAIL_PASS` to Render environment
- [ ] Deploy and test in production

---

## 📝 API Endpoints

### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "candidate"
}
```

**Response:** OTP sent to email

### Verify OTP
```http
POST /api/users/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "1234"
}
```

**Response:** JWT token + user data

### Resend OTP
```http
POST /api/users/resend-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:** New OTP sent

---

## ✨ Implementation Complete!

The OTP verification system is now fully integrated and ready for use. Follow the manual setup steps above to activate email sending.
