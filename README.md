# 💰 AI Expense Tracker Pro

AI Expense Tracker Pro is a high-performance **MERN** stack application designed to simplify financial management. Unlike traditional trackers, it utilizes **Large Language Models (LLMs)** to automate data entry and provide intelligent spending insights.

> **Status:** 🚧 In Progress (Phase 1: AI Core & Auth Integration)
> **Goal:** Build a recruiter-ready portfolio piece demonstrating AI integration and secure system design.

---

## ✨ Key Features

- **AI-Powered Entry:** Convert natural language (e.g., "Lunch at Five Guys for $15") into structured database records using OpenAI/Gemini.
- **Secure Auth:** Multi-method authentication (JWT + HttpOnly Cookies & Google OAuth 2.0).
- **Dynamic Dashboards:** Real-time data visualization using **Recharts** for spending trends and category distribution.
- **Smart Categorization:** Automated merchant-to-category mapping via AI to reduce manual user effort.
- **Financial Exports:** Downloadable CSV reports for external accounting.

---

## 🏗 Tech Stack (Standard Industry Patterns)

**Frontend**
- **React (Vite):** Modern, fast build tool.
- **Tailwind CSS & Headless UI:** For a clean, accessible "SaaS-style" dashboard.
- **Zustand / Context API:** State management for auth and transaction flows.
- **TanStack Query (React Query):** For efficient server-state fetching and caching.

**Backend**
- **Node.js & Express:** Clean MVC/Controller-Service architecture.
- **MongoDB + Mongoose:** Optimized schemas with indexing for fast search.
- **Zod:** Schema validation for both API requests and AI responses.
- **Passport.js:** Social and Local authentication strategies.

**AI Core**
- **OpenAI / Google Gemini SDK:** Utilizing **Structured Outputs** (JSON mode) to ensure 99.9% parsing accuracy.

---

## 🔐 Security Architecture

- **Auth Strategy:** JWTs issued via `httpOnly` and `Secure` cookies to prevent XSS/CSRF attacks.
- **Validation:** Strict Zod schema validation on every route.
- **Data Privacy:** Role-Based Access Control (RBAC) ensuring users only interact with their own data.

---

## 🗺 Roadmap (The 20-Hour Sprint)

### ✅ Phase 1: Foundation (Completed)
- [x] Day 1: Express & MongoDB Atlas setup.
- [x] Day 2: User Model with JWT method.
- [x] Day 3-5: Email/Password Auth with HttpOnly cookies.

### ⏳ Phase 2: The AI Core (Current Focus)
- [ ] **Day 6-7: AI Integration Service:** Implement the AI "Parser" using OpenAI Structured Outputs.
- [ ] **Day 8-10: Google OAuth:** Passport.js integration for seamless onboarding.
- [ ] **Day 11-13: Transaction CRUD:** Protected routes for managing finances.

### 🔜 Phase 3: Analytics & UI
- [ ] **Day 14-16: Modern Dashboard:** Interactive charts (Recharts) and mobile-responsive layout.
- [ ] **Day 17-19: CSV Export & Logic Refinement:** Handling recurring expenses and PDF summaries.
- [ ] **Day 20: DevOps & Deployment:** Vercel (Frontend) + Render/DigitalOcean (Backend) + GitHub Actions.

---

## 🚀 Getting Started

1. Clone the repo.
2. `npm install` in both `client` and `server` folders.
3. Setup your `.env` (MONGO_URI, JWT_SECRET, OPENAI_API_KEY).
4. Run `npm run dev`.