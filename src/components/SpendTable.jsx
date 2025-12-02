// src/components/SpendTable.jsx
import React from "react";
import { formatCurrency } from "../utils/format";

export default function SpendTable({ data=[], onRowClick }){
  return (
    <div className="card overflow-x-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Cost Breakdown</h3>
        <div className="small-muted text-sm">Showing {data.length} rows</div>
      </div>

      <table className="w-full text-sm">
        <thead className="table-head">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Cloud</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3 text-left">Env</th>
            <th className="p-3 text-right">Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r,i)=>(
            <tr key={i} onClick={()=>onRowClick(r)} className="table-row cursor-pointer">
              <td className="p-3">{r.date}</td>
              <td className="p-3">{r.service}</td>
              <td className="p-3">{r.cloud_provider}</td>
              <td className="p-3">{r.team}</td>
              <td className="p-3">{r.env}</td>
              <td className="p-3 text-right font-medium">{formatCurrency(r.cost_usd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
