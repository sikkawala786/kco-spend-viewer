// src/components/AnomalyList.jsx
import React from "react";
import { monthlyTotals, monthlyWithChanges } from "../utils/metrics";
import { formatCurrency, monthFromISO } from "../utils/format";

export default function AnomalyList({ data = [], thresholdPercent = 30 }) {
  const monthly = monthlyTotals(data);
  const { anomalies } = monthlyWithChanges(monthly, thresholdPercent);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-semibold">Anomalies (±{thresholdPercent}%)</h3>

      {!anomalies.length ? (
        <div className="text-sm text-gray-500 mt-3">No large changes detected.</div>
      ) : (
        <ul className="mt-3 space-y-3">
          {anomalies.map(a => (
            <li key={a.month} className="flex justify-between items-start">
              <div>
                <div className="font-medium">{monthFromISO(a.month + "-01")}</div>
                <div className="text-xs text-gray-500">{formatCurrency(a.total)}</div>
              </div>
              <div className={`text-sm font-semibold ${a.pctChange > 0 ? "text-red-600" : "text-green-600"}`}>
                {a.pctChange > 0 ? "▲" : "▼"} {Math.abs(a.pctChange)}%
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

