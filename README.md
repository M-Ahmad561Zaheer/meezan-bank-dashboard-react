![Dashboard Preview](DashBoard.png)

🕌 Meezan Bank - Modern Islamic Banking Dashboard
A premium, fully responsive Islamic Digital Banking Portal built with React.js and Tailwind CSS. This project blends Shariah-compliant banking principles with a modern, high-performance UI/UX.

🚀 Project Overview
This dashboard is a comprehensive recreation of the Meezan Bank digital experience. It focuses on clean aesthetics, user-friendly navigation, and specialized Islamic banking tools such as Zakat calculators and Ijarah financing trackers.

✨ Key Features
1. Dynamic Prayer Insights (Smart Logic)
Real-time Synchronization: Automatically identifies and highlights the current prayer time based on the system clock.

Contextual Reminders: Displays unique Islamic quotes and reminders that change according to the specific prayer time (e.g., specific messages for Fajr vs. Maghrib).

Modern UI: Features a custom-styled, horizontal-scroll prayer bar with hidden scrollbars for a sleek, mobile-app feel.

2. Comprehensive Financial Dashboard
Live Summary: Visual overview of total balance, monthly profit, and account status.

Smart Transactions: Interactive history with real-time search and category filtering (All, Money In, Money Out).

Fund Transfers: Dedicated modules for Internal (Meezan-to-Meezan) and External (IBFT) bank transfers.

3. Shariah-Compliant Modules
Zakat Portal: Integrated calculator based on current Nisab values.

Ijarah (Financing): A tracking system for Car and House financing applications with status indicators.

4. Card Management System
Multi-Card Toggle: Switch between Visa Platinum, Gold, and Business cards effortlessly.

Security Controls: Functional simulation for toggling E-commerce, International transactions, and Contactless payments.

5. Advanced Technical Implementation
Adaptive Theme: Full support for Light and Dark modes.

Mobile-First Design: Features a responsive sidebar that transitions into a touch-friendly drawer for mobile users.

Performance: Optimized using Vite for lightning-fast Hot Module Replacement (HMR).

🛠️ Tech Stack
Frontend: React.js (Functional Components, Hooks: useState, useEffect, useMemo)

Styling: Tailwind CSS (Utility-first CSS, Custom Animations)

Icons: Lucide-react & Modern Icon Sets

Build Tool: Vite (Optimized for performance)

📂 Project Structure
Plaintext

src/
├── components/       # Reusable UI elements (Navbar, Sidebar, Widgets)
├── pages/            # Main views (Dashboard, Zakat, Financing)
├── utils/            # Logic for Prayer times and Date formatting
├── App.jsx           # Main Routing logic
└── index.css         # Tailwind directives & Custom Scrollbar logic


⚙️ How to Run
Clone the repo:

Bash

git clone [your-repository-url]

Install dependencies:

Bash

npm install

Start the development server:

Bash

npm run dev

📝 Future Road Map
Live API Integration: Integrating real-time Gold/Silver rates for Zakat accuracy.

Biometric Simulation: Adding a mock Fingerprint/FaceID login flow.

PDF Statements: Functionality to generate and download e-statements.

Developed with ❤️ by [AZ Developer's]
Meezan Bank - The Premier Islamic Bank