# K&Co. — Cloud Spend Viewer (Frontend solution)

# photos os web app K&Co. — Cloud Spend Viewer (Frontend solution)
<img width="749" height="398" alt="image" src="https://github.com/user-attachments/assets/045b3966-8905-458f-829c-af514efc5d0a" />
<img width="610" height="402" alt="image" src="https://github.com/user-attachments/assets/44ffbb6b-e974-4d89-b3ac-07d72aca9296" />
<img width="610" height="400" alt="image" src="https://github.com/user-attachments/assets/33fddaa3-7232-4620-978e-55952262464a" />
<img width="609" height="405" alt="image" src="https://github.com/user-attachments/assets/b39fe6e2-451f-4954-997a-52d6992aa7b4" />





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



