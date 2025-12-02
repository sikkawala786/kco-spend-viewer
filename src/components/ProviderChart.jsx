// src/components/ProviderChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../utils/format";

const COLORS = ['#2563eb','#059669','#f59e0b','#ef4444'];

function detectProviderField(sampleRow){
  if(!sampleRow) return null;
  const candidates = ['cloud_provider','cloud','provider','Provider','vendor','platform'];
  return candidates.find(k => Object.prototype.hasOwnProperty.call(sampleRow, k)) || null;
}

function groupAndSumBy(data, keyField){
  const map = {};
  (data||[]).forEach(r=>{
    const key = (r[keyField] ?? r[keyField?.toLowerCase?.()] ?? 'Unknown') || 'Unknown';
    map[key] = (map[key] || 0) + (Number(r.cost_usd) || 0);
  });
  return Object.keys(map).map(k => ({ key: k, total: map[k] }));
}

export default function ProviderChart({ data=[] }){
  if(!data || !data.length) return null;
  const sample = data[0];
  const providerField = detectProviderField(sample);

  if(!providerField){
    console.warn('ProviderChart: no provider-like field found in data sample keys', Object.keys(sample));
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-md font-semibold mb-3">Spend by Cloud Provider</h3>
        <div className="text-sm text-gray-500">No provider field found in data. (Checked fields: {Object.keys(sample).join(', ')})</div>
      </div>
    );
  }

  const chartData = groupAndSumBy(data, providerField);
  console.log('ProviderChart grouped by', providerField, chartData);

  if(!chartData.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-md font-semibold mb-3">Spend by Cloud Provider</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="key"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={(d) => `${d.key}: ${formatCurrency(d.total)}`}
            >
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={v => formatCurrency(v)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
