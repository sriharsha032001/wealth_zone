# wealth_zone

# 💰 Wealth Zone Bank - Expense Tracker (React + Spring Boot)

A modern, full-stack Expense Tracker that allows users to:

- Add, view, and search financial transactions
- Visualize daily reports via Pie Charts
- Export reports as PDFs or print directly
- Enjoy a sleek dark "Uber-style" themed UI

---

## 🔥 Features

- 🔐 **Add Transaction Form**
  - Input: userId, description, type (Credit/Debit), amount, date, category, source
  - Form resets after submission
  - Automatically updates the graph and today's report upon transaction

- 🔎 **Search by User ID**
  - Minimal UI footprint
  - Search button only shows results on demand

- 📊 **Daily Report**
  - Lists today's transactions using backend date-wise API
  - Calculates and visualizes Debit vs Credit totals via **Recharts Pie Chart**
  - Supports **Print** and **PDF generation** of reports using `jsPDF`

- 🎨 **Theming**
  - Inspired by **Uber**: full dark-mode with consistent typography, spacing, and color palette using **Tailwind CSS**

---

## 🛠 Tech Stack

- ⚛️ ReactJS (Frontend)
- 🎨 Tailwind CSS (Styling)
- 📦 Recharts (Charts)
- 🧾 jsPDF + jspdf-autotable (PDF Export)
- 🧪 React Hot Toast (Feedback/Alerts)
- 🚀 Spring Boot Backend (API) – separate repo

---

## 📁 Project Structure

/src
┣ components/
┃ ┣ AddTransactionForm.jsx
┃ ┗ DailyReport.jsx
┣ App.jsx
┗ index.js


---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Backend running at `http://localhost:8080`

### Installation

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
npm install
npm run dev

Environment Setup
Backend API Endpoint:
Make sure your Spring Boot API serves:

pgsql
Copy
Edit
GET    /api/expenses/date/{today}
POST   /api/expenses/add
GET    /api/expenses/all

# Step 1: Pull remote changes and merge them
git pull origin main --rebase

# Step 2: Push your local changes after sync
git push origin main
