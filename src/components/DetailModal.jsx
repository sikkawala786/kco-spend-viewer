// src/components/DetailsModal.jsx
import React from "react";
import { formatCurrency } from "../utils/format";

export default function DetailsModal({ row, onClose }){
  if(!row) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-body">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Entry details</h3>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div><strong>Date:</strong> {row.date}</div>
          <div><strong>Cloud:</strong> {row.cloud_provider}</div>
          <div><strong>Service:</strong> {row.service}</div>
          <div><strong>Team:</strong> {row.team}</div>
          <div><strong>Env:</strong> {row.env}</div>
          <div><strong>Cost:</strong> {formatCurrency(row.cost_usd)}</div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
}
