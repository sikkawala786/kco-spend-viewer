// src/components/TrendCard.jsx
import React from "react";
import { monthlyTotals, monthlyWithChanges } from "../utils/metrics";
import { formatCurrency, monthFromISO } from "../utils/format";

export default function TrendCard({ data = [], thresholdPercent = 30 }) {
  const monthly = monthlyTotals(data);
  if (!monthly.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Trend (last month)</p>
        <p className="mt-2 text-sm text-gray-500">No data</p>
      </div>
    );
  }

  const { series } = monthlyWithChanges(monthly, thresholdPercent);
  const last = series[series.length - 1];
  const prev = series.length > 1 ? series[series.length - 2] : null;
  const pct = last?.pctChange;
  const up = pct !== null && pct > 0;
  const down = pct !== null && pct < 0;

  // color choice: red for increased spend (bad), green for decreased (good)
  const pctClass = up ? "text-red-600" : down ? "text-green-600" : "text-gray-600";

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Trend (last month)</p>
          <p className="text-xs text-gray-400">{monthFromISO(last.month + "-01")}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-2xl font-semibold">{formatCurrency(last.total)}</p>
        {prev ? (
          <div className="mt-1 flex items-center gap-3">
            <span className={`text-sm font-medium ${pctClass}`}>
              {up ? "▲" : down ? "▼" : "—"} {Math.abs(pct)}%
            </span>
            <span className="text-xs text-gray-500">({formatCurrency(prev.total)} prev)</span>
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-1">No previous month</div>
        )}
      </div>
    </div>
  );
}
