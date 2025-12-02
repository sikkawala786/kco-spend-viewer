// src/components/Header.jsx
import React from "react";

export default function Header({ draftSaved, onToggleDraft }) {
  const savedAt = draftSaved?.savedAt ? new Date(draftSaved.savedAt).toLocaleString() : null;
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="app-container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-white font-semibold shadow-sm">
            K&Co
          </div>
          <div>
            <div className="text-lg font-semibold">K&amp;Co — Cloud Spend Viewer</div>
            <div className="text-xs text-gray-500">Frontend take-home — Tasnim Sikkawala</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">Tasnim Sikkawala</div>
            <div className="small-muted">Frontend-focused submission</div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-warning shadow-sm" onClick={onToggleDraft}>
              {draftSaved ? "Draft ✓" : "Save Draft"}
            </button>
            {savedAt && <div className="text-xs small-muted hidden md:block">Saved: {savedAt}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
