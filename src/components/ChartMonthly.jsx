// src/components/MonthlyChart.jsx
import React from "react";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { monthlyTotals, monthlyWithChanges } from "../utils/metrics";
import { monthFromISO } from "../utils/format";

export default function MonthlyChart({ data = [], thresholdPercent = 30 }) {
  const monthly = monthlyTotals(data);
  const { series, anomalies } = monthlyWithChanges(monthly, thresholdPercent);
  if (!series.length) return null;

  const chartData = series.map(s => ({ monthLabel: monthFromISO(s.month + "-01"), ...s }));
  const anomalySet = new Set(anomalies.map(a => a.month));

  const customDot = (props) => {
    const { cx, cy, payload } = props;
    const isAnom = anomalySet.has(payload.month);
    return (
      <circle cx={cx} cy={cy} r={isAnom ? 5 : 3} fill={isAnom ? '#ef4444' : '#6366F1'} stroke={isAnom ? '#fff' : 'none'} strokeWidth={isAnom ? 1 : 0} />
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Monthly Spend</h2>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthLabel" />
            <Tooltip formatter={(v) => v.toLocaleString("en-US", { style: "currency", currency: "USD" })} />
            <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={2} dot={customDot} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
