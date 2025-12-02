// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/FiltersPanel";
import SummaryCards from "./components/SummaryCards";
import MonthlyChart from "./components/ChartMonthly";
import TeamChart from "./components/TeamChart";
import ProviderChart from "./components/ProviderChart";
import Top5ServicesChart from "./components/Top5ServicesChart";
import SpendTable from "./components/SpendTable";
import DetailsModal from "./components/DetailModal";
import TrendCard from "./components/TrendCard";
import AnomalyList from "./components/AnomalyList";




function jsonToCsv(rows, fields) {
  if (!rows || !rows.length) return "";
  const cols = fields || Object.keys(rows[0]);
  const escape = (val) => {
    if (val == null) return "";
    const s = String(val);
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const hdr = cols.join(",");
  const lines = rows.map(r => cols.map(c => escape(r[c])).join(","));
  return [hdr, ...lines].join("\n");
}

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ cloud: "all", team: "all", env: "all" });
  const [selectedRow, setSelectedRow] = useState(null);

  // toast for small notifications
  const [toast, setToast] = useState(null);

  // draft saved state (persisted)
  const [draftSaved, setDraftSaved] = useState(() => {
    try {
      const v = localStorage.getItem("kco_draft_saved");
      return v ? JSON.parse(v) : null;
    } catch { return null; }
  });

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then(r => r.json())
      .then(json => { setData(json || []); setLoading(false); })
      .catch(() => { setData([]); setLoading(false); });
  }, []);

  // filtered data
  const filtered = useMemo(() => {
    return (data || []).filter(d =>
      (filters.cloud === "all" || d.cloud_provider === filters.cloud) &&
      (filters.team === "all" || d.team === filters.team) &&
      (filters.env === "all" || d.env === filters.env)
    );
  }, [data, filters]);

  // export filtered data as CSV (or JSON if needed)
  function exportData({ format = "csv", filename = "kco-spend-export" } = {}) {
    if (!filtered || filtered.length === 0) {
      showToast("No rows to export");
      return;
    }

    if (format === "json") {
      const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("Exported JSON");
      return;
    }

    // CSV: pick canonical columns order (adjust if you want)
    const fields = ["date", "cloud_provider", "service", "team", "env", "cost_usd"];
    const csv = jsonToCsv(filtered, fields);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Exported CSV");
  }

  // toggle draft: save timestamp to localStorage and show toast
  function toggleDraft() {
    const now = new Date().toISOString();
    const payload = { savedAt: now };
    try {
      localStorage.setItem("kco_draft_saved", JSON.stringify(payload));
      setDraftSaved(payload);
      showToast("Draft saved");
    } catch (e) {
      console.error("Failed to save draft", e);
      showToast("Failed to save draft");
    }
  }

  // small toast helper
  function showToast(msg, ms = 2000) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <div className="animate-pulse text-2xl font-semibold mb-2">Loading dashboard…</div>
          <div className="small-muted">Preparing your cloud spend data.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <Header draftSaved={draftSaved} onToggleDraft={toggleDraft} />

      <main className="app-container py-8">
        <Filters filters={filters} setFilters={setFilters} data={data} onExport={() => exportData({ format: "csv" })} />

        {/* Summary + Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="lg:col-span-3">
            <SummaryCards data={filtered} />
          </div>
 </div>
          <div>
            <br></br>
           <p>Monthly Spend Trend
Shows how your cloud spending changed compared to the previous month.
A red upward arrow means spend increased, while a green downward arrow means costs decreased.
This helps you quickly understand the direction of spend and detect early patterns.</p>
<br></br>

            <TrendCard data={filtered} />
          </div>
       

        {/* Monthly chart */}
        <MonthlyChart data={filtered} />

        {/* Charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <TeamChart data={filtered} />
          <ProviderChart data={filtered} />
          <Top5ServicesChart data={filtered} />
        </div>

        {/* Anomalies */}
        <div className="mt-6">
           <p>Cost Anomaly Detector
Flags unusual spikes or drops in monthly cloud spending.
An anomaly indicates a significant change (more than ±30%), helping you quickly identify unexpected behavior that may require attention.</p>
<br></br>
         
          <AnomalyList data={filtered} thresholdPercent={30} />
        </div>

        {/* Table or No data */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <div className="card text-center">
              <h3 className="text-lg font-semibold">No results found</h3>
              <p className="small-muted mt-2">No rows match the selected filters. Try resetting filters.</p>
            </div>
          ) : (
            <SpendTable data={filtered} onRowClick={setSelectedRow} />
          )}
        </div>

        {selectedRow && <DetailsModal row={selectedRow} onClose={() => setSelectedRow(null)} />}
      </main>

      {/* toast */}
      {toast && (
        <div style={{ position: "fixed", right: 20, bottom: 24, zIndex: 60 }}>
          <div className="bg-white border border-gray-200 px-4 py-2 rounded shadow-sm text-sm">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

