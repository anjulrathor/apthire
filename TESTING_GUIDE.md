# 🧪 Apthire Manual Testing Guide

## Quick Test Checklist

### 1. Homepage (/)
- [ ] Hero section loads with animated stats
- [ ] Search bar accepts input
- [ ] Experience dropdown works
- [ ] Location input works
- [ ] Clicking "Search" redirects to `/jobs?q=...&loc=...`
- [ ] Skill chips are clickable and rotate
- [ ] Navbar is visible with Login/Signup buttons

### 2. Jobs Page (/jobs)
- [ ] Jobs load from backend API
- [ ] Search filter works
- [ ] Skill filter works
- [ ] Location filter works
- [ ] "Load more" button appears if >6 jobs
- [ ] Fast Apply button visible for logged-in candidates
- [ ] Delete button visible for admins only

### 3. Signup (/signup)
- [ ] Role toggle between Candidate/Recruiter works
- [ ] Form validation shows errors
- [ ] Successful signup redirects to /login
- [ ] Admin role auto-assigned for whitelisted emails

### 4. Login (/login)
- [ ] Email/password validation works
- [ ] Successful login redirects based on role:
  - Admin → `/admin`
  - Recruiter → `/recruiter`
  - Candidate → `/jobs`
- [ ] Toast notification shows on success/error

### 5. Candidate Flow
- [ ] Profile page (/profile) loads
- [ ] Can edit name, headline, location, skills, experience level
- [ ] Resume URL field works
- [ ] Profile completeness percentage updates
- [ ] Save button updates profile
- [ ] Fast Apply modal opens from job card
- [ ] Application submits successfully
- [ ] Duplicate application prevented

### 6. Recruiter Flow
- [ ] Dashboard (/recruiter) shows live stats
- [ ] "Post New Job" button navigates to `/recruiter/jobs/new`
- [ ] Job posting form works
- [ ] My Jobs page shows only own jobs
- [ ] Applications page shows applications for own jobs
- [ ] Status dropdown updates application status
- [ ] Stats update after actions

### 7. Admin Flow
- [ ] Dashboard (/admin) loads with charts
- [ ] Sidebar navigation works
- [ ] Users page shows all users
- [ ] Delete user button works
- [ ] Jobs page shows all jobs
- [ ] Applications page shows all applications
- [ ] Stats reflect real database data

### 8. Navigation
- [ ] Navbar search redirects to jobs page
- [ ] Post Job button shows for admin/recruiter only
- [ ] User dropdown menu works
- [ ] Logout clears session
- [ ] Mobile menu works on small screens

### 9. Security
- [ ] Cannot access /admin without admin role
- [ ] Cannot access /recruiter without recruiter role
- [ ] Protected routes redirect to /login
- [ ] JWT token persists in localStorage
- [ ] Token included in API requests

### 10. UX/UI
- [ ] Loading states show during API calls
- [ ] Empty states show when no data
- [ ] Toast notifications appear for actions
- [ ] Forms have proper validation
- [ ] Buttons have hover effects
- [ ] Dark theme is consistent
- [ ] Mobile responsive design works

---

## Test User Accounts

### Create These Accounts:

**Admin:**
- Email: `admin@apthire.com` (whitelisted)
- Password: `Admin123!`
- Role: Auto-assigned as admin

**Recruiter:**
- Email: `recruiter@test.com`
- Password: `Test123!`
- Role: Select "Recruiter" during signup

**Candidate:**
- Email: `candidate@test.com`
- Password: `Test123!`
- Role: Select "Candidate" during signup

---

## Common Issues & Solutions

### Issue: Jobs not loading
**Solution:** Check backend is running on port 5001, MongoDB is connected

### Issue: Login redirects to wrong page
**Solution:** Check user role in database, verify AuthContext logic

### Issue: Fast Apply not working
**Solution:** Ensure user is logged in, check resume URL in profile

### Issue: Stats showing 0
**Solution:** Create some jobs and applications first

### Issue: Duplicate page warnings
**Solution:** Already fixed - removed .js duplicates

---

## API Endpoints to Test

### Auth
- `POST /api/users/register` - Create account
- `POST /api/users/login` - Login
- `GET /api/users/me` - Get current user
- `PUT /api/users/profile` - Update profile

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create job (auth required)
- `DELETE /api/jobs/:id` - Delete job (owner/admin only)

### Applications
- `POST /api/applications` - Apply to job
- `GET /api/applications/admin` - Get applications (admin/recruiter)
- `PATCH /api/applications/:id/status` - Update status

### Dashboard
- `GET /api/admin/stats` - Get dashboard statistics

---

## Browser DevTools Checks

### Console
- No errors should appear
- API calls should return 200/201 status codes
- JWT token should be in localStorage

### Network Tab
- API calls should include Authorization header
- Responses should be JSON format
- No 401/403 errors for authorized users

### Application Tab
- localStorage should have `token` and `user` keys
- Token should be valid JWT format

---

**Happy Testing! 🚀**
