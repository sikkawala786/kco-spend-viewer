# K&Co. — Cloud Spend Viewer (Frontend solution)

# photos os web app K&Co. — Cloud Spend Viewer (Frontend solution)
<img width="761" height="254" alt="image" src="https://github.com/user-attachments/assets/6adc636f-b12a-42b7-91f0-c34b75ae264b" />


## What
A small frontend app showcasing cloud spend data with filters, sorting, summary, and monthly chart.
A lightweight cloud spend visualization dashboard built for the K&Co. Full-Stack Engineer assignment.  
This project processes AWS/GCP billing data and displays:

- Monthly Spend Trends
- Spend by Team
- Spend by Cloud Provider
- Top 5 Costly Services
- Cost Anomaly Detection
- Trend Indicators (Up/Down)
- Filtering + Export + Draft Features

## Tech
React + Vite, Tailwind CSS, Recharts.

## Run
1. npm install  
2. npm run dev  
3. Open the dev URL (usually http://localhost:5173)

## Data
`public/data.json` was generated from the provided CSV files (normalized fields: date, cloud_provider, service, team, env, cost_usd).

## Implemented
- Table with filters (cloud/team/env) and sorting
- Summary card and monthly spend chart
- Row detail modal

## 🚀 Live Demo (Vercel)

🔗 **Live App:** https://kco-cloud-spend-tasnim-li8zch9xd-tasnims-projects-6f5e8257.vercel.app/


## 🛠️ Tech Stack

- React + Vite  
- TailwindCSS  
- Recharts  
- Node.js (for CSV → JSON script)  
- Deployed on Vercel  


## ▶️ How to Run Locally

```bash
npm install
npm run dev



