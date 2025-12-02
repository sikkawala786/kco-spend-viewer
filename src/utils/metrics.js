// src/utils/metrics.js
// Helpers to compute monthly totals, percent changes and anomalies

// parse cost safely (strip $ and commas if necessary)
function parseCost(v){
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  const s = String(v).replace(/[$,]/g, '').trim();
  const n = Number(s);
  return isNaN(n) ? 0 : n;
}

// returns [{ month: 'YYYY-MM', total: 123.45 }, ...] sorted ascending by month
export function monthlyTotals(data){
  const map = {};
  (data || []).forEach(r => {
    const rawDate = r.date || r.usage_start_date || r.usage_date || '';
    const month = String(rawDate).slice(0,7) || 'unknown';
    const cost = parseCost(r.cost_usd ?? r.cost ?? r.amount ?? 0);
    map[month] = (map[month] || 0) + cost;
  });
  return Object.keys(map)
    .sort()
    .map(m => ({ month: m, total: Number(map[m].toFixed(2)) }));
}

// given monthly array from monthlyTotals, compute percent change and detect anomalies
// thresholdPercent e.g. 30 means flag months where abs(pctChange) >= 30
export function monthlyWithChanges(monthlyArray, thresholdPercent = 30){
  const series = monthlyArray.map((row, idx) => {
    if (idx === 0) return { ...row, pctChange: null };
    const prev = monthlyArray[idx - 1].total;
    const cur = row.total;
    const pct = prev === 0 ? (cur === 0 ? 0 : 100) : ((cur - prev) / prev) * 100;
    return { ...row, pctChange: Number(pct.toFixed(2)) };
  });
  const anomalies = series.filter(s => s.pctChange !== null && Math.abs(s.pctChange) >= thresholdPercent);
  return { series, anomalies };
}
