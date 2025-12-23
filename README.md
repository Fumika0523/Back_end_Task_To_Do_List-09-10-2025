# 💰 AI Expense Tracker Pro

AI Expense Tracker Pro is a modern **MERN** full-stack application that helps users understand, track, and optimise their spending.  
It combines a clean dashboard UI with **AI-powered expense categorisation**, smart reports, and role-based access.

> Status: 🚧 In Progress (20-hour build plan, 1 hour/day)  

---

## ✨ What This App Does

- Lets users **securely sign up and log in**
- Adds **income and expense** records with:
  - amount, category, date, payment method, notes
- Groups expenses by:
  - month, category, custom date range
- Shows **visual dashboards**:
  - category breakdown (pie/donut chart)
  - monthly trend (line/bar chart)
- Allows users to:
  - filter & search transactions  
  - edit & delete entries  
  - mark recurring expenses (e.g. rent, subscriptions)
- Exports data as **CSV** (and optionally PDF later)
- Generates **monthly summary** insights
- Uses **AI** to suggest categories (e.g. “Groceries”, “Transport”, “Utilities”) based on the transaction description

---

## 🧠 AI Features

- When a user adds an expense with a description (e.g. “Tesco Weekly Shopping” or “Uber to work”):
  - The backend sends the text to an **AI API** (e.g. OpenAI)
  - AI returns a suggested category (e.g. `Groceries`, `Transport`, `Eating Out`)
  - The suggestion is shown to the user and can be:
    - accepted (auto-fill the category)
    - or overridden manually

This makes data entry faster and more consistent, and helps build better analytics over time.

---

## 🏗 Tech Stack

**Frontend**
- React (Vite)
- React Router
- Context API or Redux Toolkit (for auth & global state)
- Tailwind CSS (for modern, responsive UI)
- Chart library (e.g. Recharts or Chart.js)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment variables
- CORS for client–server communication

**AI Integration**
- OpenAI (or similar API) for intelligent categorisation

---

## 👥 User Roles

- **User**
  - Register & log in
  - Manage personal expenses and income
  - View charts, summaries and reports

- **Admin** (optional future enhancement)
  - View all users
  - Manage flagged expenses (fraud/mistake)
  - View high-level analytics across users

---

## 🔐 Authentication & Security

- Passwords are **hashed with bcrypt** before saving to MongoDB  
- Users receive a **JWT token** on login
- Protected routes require a valid `Authorization: Bearer <token>` header
- Role-based middleware can restrict access (e.g. admin-only features)

---

## 📊 Core Features (MVP)

1. **User Authentication**
   - Sign up, log in, log out
   - Persistent auth using JWT stored in localStorage

2. **Expense & Income Management**
   - Add, edit, delete transactions
   - Set type: `income` or `expense`
   - Fields: amount, category, date, note, payment method, recurring flag

3. **Dashboard & Analytics**
   - Monthly total income vs expense
   - Category breakdown chart
   - Recent transactions list

4. **AI Category Suggestion**
   - Send description to AI API
   - Get suggested category and show as a recommendation

5. **Export**
   - Export transactions as CSV (for Excel/Sheets)
   - (Future) PDF report generation

---

## 🧱 Project Structure

```bash
AI-ExpenseTracker-Pro/
├─ client/           # React + Vite frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ context/
│  │  ├─ hooks/
│  │  └─ utils/
│  └─ ...
└─ server/           # Node + Express backend
   ├─ config/        # db connection
   ├─ controllers/   # route handlers
   ├─ models/        # Mongoose models (User, Transaction)
   ├─ routes/        # Express routers
   ├─ middleware/    # auth, error handling
   ├─ utils/         # helpers (AI, emails, etc.)
   └─ server.js

> Status: 🚧 In Progress (20-hour build plan, 1 hour/day)  
> Current Progress: ✅ Email/Password Auth complete, 🔜 Google OAuth next

## 🗺 Roadmap (20-Hour Plan)

> I’m building this in ~1 hour per day (total ~20 hours).  
> ✅ = completed, ⏳ = in progress, 🔜 = planned

- ✅ **Day 1 – Backend & Database Foundation**
  - Initialise backend project (Express server on port 8001)
  - Set up `.env` and environment variables
  - Connect to **MongoDB Atlas** (`ai_expense_tracker_pro` database)
  - Add basic health-check route: `GET /` → `"AI Expense Tracker server is running"`

- ✅ **Day 2 – User Model & JWT Design**
  - Create `User` model (username, email, password, role, timestamps)
  - Add `userSchema.methods.generateAuthToken()` using **JWT**
  - Decide on **cookie-based auth** strategy (JWT stored in `httpOnly` cookie)
  - Document sign-up/login flow (controller → model → JWT → cookie)

- ✅ **Day 3–5 – Auth APIs (Email/Password) + Protection**
  - Implement `/api/auth/signup` (register + hash password with bcrypt)
  - Implement `/api/auth/login` (validate password, generate JWT)
  - Set JWT in `httpOnly` cookie for both signup & login
  - Add `auth` middleware to read cookie, verify token, and attach `req.user`
  - Protect initial test route (e.g. `/api/me`) to confirm middleware works

- 🔜 **Day 6–7 – Google OAuth Integration**
  - Set up **Passport.js Google OAuth 2.0** strategy
  - Create Google auth routes:
    - `/auth/google` and `/auth/google/callback`
  - Find or create user in MongoDB using Google profile
  - Reuse `user.generateAuthToken()` to issue JWT
  - Set JWT in cookie and redirect to frontend (e.g. `/homepage`)
  - Ensure both Email/Password and Google OAuth share the same auth flow

- 🔜 **Day 8–10 – Expense Model & CRUD (Protected)**
  - Create `Transaction` model (amount, type, category, date, note, payment method, recurring, owner userId)
  - Implement CRUD routes: add, list (with filters), update, delete
  - Ensure all transaction routes are **protected** via auth middleware
  - Add basic validation and error responses

- 🔜 **Day 11–13 – Dashboard UI & Charts**
  - Build frontend pages for:
    - Sign in / Sign up (email + Google button)
    - Main dashboard (summary cards + recent transactions)
  - Integrate charts (Recharts or Chart.js) for:
    - Monthly income vs expenses
    - Category breakdown
  - Add filters (date range, category, type)

- 🔜 **Day 14–15 – AI Category Suggestion**
  - Connect backend to **OpenAI API** (or similar)
  - Create endpoint for AI-powered category suggestion based on description
  - Wire frontend: when typing an expense description, fetch AI suggestion
  - Allow user to accept/override AI-suggested category

- 🔜 **Day 16–17 – Export, Recurring, Monthly Summary**
  - Implement CSV export for transactions
  - Add recurring expense support (flag + auto-display in UI)
  - Generate monthly summary data (totals, top categories, insights)
  - Show summary section on dashboard

- 🔜 **Day 18–19 – Polish, Validation & UX**
  - Improve form validation and error messages (frontend + backend)
  - Handle loading states, empty states, and error states in UI
  - Refine responsive design with Tailwind
  - Clean up code structure (routes, controllers, utils)

- 🔜 **Day 20 – Final Testing & Deployment Prep**
  - End-to-end testing of auth (JWT cookie + Google OAuth)
  - Test protected routes and role-based behaviour
  - Update README with final screenshots and instructions
  - Prepare for deployment (env variables, build scripts, hosting plan)
