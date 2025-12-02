// src/components/Filters.jsx
import React from "react";

export default function Filters({ filters, setFilters, data = [], onExport }) {
  const uniqueTeams = [...new Set(data.map(d => d.team).filter(Boolean))];
  function change(key, value) { setFilters(prev => ({ ...prev, [key]: value })); }
  return (
    <div className="card flex flex-wrap gap-4 items-end">
      <div>
        <label className="block small-muted">Cloud</label>
        <select value={filters.cloud} onChange={e => change('cloud', e.target.value)} className="mt-1 rounded-lg border px-3 py-2">
          <option value="all">All</option>
          <option value="AWS">AWS</option>
          <option value="GCP">GCP</option>
        </select>
      </div>

      <div>
        <label className="block small-muted">Team</label>
        <select value={filters.team} onChange={e => change('team', e.target.value)} className="mt-1 rounded-lg border px-3 py-2">
          <option value="all">All</option>
          {uniqueTeams.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block small-muted">Environment</label>
        <select value={filters.env} onChange={e => change('env', e.target.value)} className="mt-1 rounded-lg border px-3 py-2">
          <option value="all">All</option>
          <option>prod</option>
          <option>staging</option>
          <option>dev</option>
        </select>
      </div>

      <div className="ml-auto flex gap-2">
        <button onClick={() => setFilters({ cloud: 'all', team: 'all', env: 'all' })} className="btn btn-ghost">Reset</button>

        <button onClick={() => onExport && onExport()} className="btn btn-primary">
          Export CSV
        </button>
      </div>
    </div>
  );
}
