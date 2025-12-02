// src/components/SummaryCards.jsx
import React from "react";
import { formatCurrency } from "../utils/format";

export default function SummaryCards({ data = [] }){
  const total = data.reduce((s,r)=> s + (Number(r.cost_usd) || 0), 0);
  const aws = data.filter(d=> (d.cloud_provider||'').toLowerCase()==='aws').reduce((s,r)=> s+(Number(r.cost_usd)||0),0);
  const gcp = data.filter(d=> (d.cloud_provider||'').toLowerCase()==='gcp').reduce((s,r)=> s+(Number(r.cost_usd)||0),0);
  const avgMonthly = total ? total / 12 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <div className="kpi-title">Total Cloud Spend (12mo)</div>
            <div className="kpi-value mt-2">{formatCurrency(total)}</div>
            <div className="small-muted mt-2">Avg / month {formatCurrency(avgMonthly)}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div>
          <div className="kpi-title">AWS Spend</div>
          <div className="text-xl font-semibold mt-2 text-blue-600">{formatCurrency(aws)}</div>
        </div>
      </div>

      <div className="card">
        <div>
          <div className="kpi-title">GCP Spend</div>
          <div className="text-xl font-semibold mt-2 text-green-600">{formatCurrency(gcp)}</div>
        </div>
      </div>
    </div>
  );
}
