// src/components/Top5ServicesChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "../utils/format";

/**
 * Build top N services by cost
 */
function topNServices(data, n = 5) {
  const map = {};
  (data || []).forEach((r) => {
    const key = (r.service || r.Service || r["sku_description"] || "Unknown");
    const cost = Number((r.cost_usd ?? r.cost ?? 0)) || 0;
    map[key] = (map[key] || 0) + cost;
  });
  const arr = Object.entries(map).map(([k, v]) => ({ service: k, total: v }));
  return arr.sort((a, b) => b.total - a.total).slice(0, n);
}

export default function Top5ServicesChart({ data = [] }) {
  const chartData = topNServices(data, 5);
  if (!chartData.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-md font-semibold mb-2">Top 5 Services</h3>
        <div className="text-sm text-gray-500">No service data available</div>
      </div>
    );
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-md font-semibold mb-3">Top 5 Services</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart layout="vertical" data={chartData} margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
            <YAxis dataKey="service" type="category" width={160} />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Bar dataKey="total" fill="#f97316" barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
