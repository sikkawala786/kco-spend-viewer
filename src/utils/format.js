// src/utils/format.js
export function formatCurrency(v) {
  if (v == null) return "-";
  return v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function monthFromISO(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso.slice(0, 7);
  return d.toLocaleString("default", { month: "short", year: "numeric" });
}
