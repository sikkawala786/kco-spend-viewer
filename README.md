# K&Co. — Cloud Spend Viewer (Frontend solution)

## What
A small frontend app showcasing cloud spend data with filters, sorting, summary, and monthly chart.

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
