import React from 'react';
import { SEED_PORT_SIGNALS, SEED_DISRUPTIONS } from '@/lib/fallback-data';
import { Anchor, AlertTriangle, ExternalLink } from 'lucide-react';

export const revalidate = 120;

export default function PortsPage() {
  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Anchor className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Ports, Bottlenecks & Logistics Chokepoints
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Real-time terminal dwell times, vessel queues, canal rerouting, and maritime freight rate indices.
        </p>
      </div>

      {/* Port Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SEED_PORT_SIGNALS.map((p) => (
          <div key={p.id} className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs bg-[#F6F8FB] border border-[#E4E9F0] px-1.5 py-0.5 rounded text-[#0B1220]">
                {p.port_id} · {p.country_iso}
              </span>
              <span className="text-[#5B6779]">{p.period_label}</span>
            </div>
            <strong className="text-sm text-[#0B1220] block">{p.port_name}</strong>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-[#5B6779] uppercase">{p.metric.replace(/_/g, ' ')}</span>
              <span className="text-xl font-bold text-[#0B1220]">{p.value} {p.unit}</span>
            </div>
            <div className="pt-2 border-t border-[#E4E9F0] flex justify-between items-center text-[11px]">
              <span className={p.yoy_pct! < 0 ? 'text-[#067647]' : 'text-[#B42318]'}>
                YoY: {p.yoy_pct! > 0 ? `+${p.yoy_pct}%` : `${p.yoy_pct}%`}
              </span>
              <a href={p.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold">
                Port Authority <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disruptions Log */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs">
        <h2 className="text-sm font-bold text-[#0B1220] uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#B42318]" /> Active Supply Chain Disruptions
        </h2>
        <div className="space-y-3 text-xs">
          {SEED_DISRUPTIONS.map((d) => (
            <div key={d.id} className="p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FBD5D5] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#B42318] text-sm">{d.title}</span>
                <span className="text-[10px] uppercase font-bold bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#FBD5D5] text-[#B42318]">
                  {d.severity}
                </span>
              </div>
              <p className="text-[#24303F] text-xs leading-relaxed">{d.summary}</p>
              <div className="text-[10px] text-[#8494A8] pt-1">Started: {d.started_at} · Status: Active</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
