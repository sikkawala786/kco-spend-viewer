// src/components/TeamChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency } from "../utils/format";

/**
 * Try common variants of the 'team' field that may exist in CSVs.
 */
function detectTeamField(sampleRow) {
  if(!sampleRow) return null;
  const candidates = ['team','Team','cost_center','owner','owner_name','resource.labels.team','project'];
  return candidates.find(k => Object.prototype.hasOwnProperty.call(sampleRow, k)) || null;
}

function groupAndSumBy(data, keyField) {
  const map = {};
  (data||[]).forEach(r => {
    const key = (r[keyField] ?? r[keyField?.toLowerCase?.()] ?? 'Unknown') || 'Unknown';
    map[key] = (map[key] || 0) + (Number(r.cost_usd) || 0);
  });
  return Object.keys(map).map(k => ({ key: k, total: map[k] })).sort((a,b)=>b.total - a.total);
}

export default function TeamChart({ data=[] }){
  if(!data || !data.length) return null;
  const sample = data[0];
  const teamField = detectTeamField(sample);

  if(!teamField){
    console.warn('TeamChart: no team-like field found in data sample keys', Object.keys(sample));
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-md font-semibold mb-3">Total Spend by Team</h3>
        <div className="text-sm text-gray-500">No team field found in data. (Checked fields: {Object.keys(sample).join(', ')})</div>
      </div>
    );
  }

  const chartData = groupAndSumBy(data, teamField);
  console.log('TeamChart grouped by', teamField, chartData.slice(0,10));

  if(!chartData.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-md font-semibold mb-3">Total Spend by Team</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis tickFormatter={v => formatCurrency(v)} />
            <Tooltip formatter={v => formatCurrency(v)} />
            <Bar dataKey="total" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
