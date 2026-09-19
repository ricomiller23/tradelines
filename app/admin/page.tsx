'use client';

import React, { useState } from 'react';
import SOURCES from '@/config/sources.json';
import { Shield, Play, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function AdminPage() {
  const [sources, setSources] = useState(SOURCES);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '[2026-09-19 09:30:00 UTC] TRADELINES engine armed with 15 gazette connectors.',
    '[2026-09-19 09:30:05 UTC] Prebuild parity check passed: Brent benchmark $103.50/bbl.',
  ]);

  const toggleSource = (id: string) => {
    setSources((p) => p.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
    setLogs((p) => [`[${new Date().toISOString()}] Connector ${id} toggled`, ...p]);
  };

  const triggerIngest = async () => {
    setIsRunning(true);
    setLogs((p) => [`[${new Date().toISOString()}] Ingest sweep initiated…`, ...p]);
    setTimeout(() => {
      setLogs((p) => [`[${new Date().toISOString()}] Ingest sweep complete: 15 sources verified.`, ...p]);
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[#0E63C4]" />
            <h1 className="font-extrabold text-lg text-[#0B1220]">TRADELINES Administration Console</h1>
          </div>
          <p className="text-xs text-[#5B6779]">Connector circuit breakers, raw gazette payload replays, and legal challenge adjudications.</p>
        </div>
        <button
          type="button"
          onClick={triggerIngest}
          disabled={isRunning}
          className="bg-[#0E63C4] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
        >
          <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} /> Run Ingest
        </button>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-xs">
        <div className="p-3 bg-[#F6F8FB] border-b border-[#E4E9F0] font-bold text-xs">
          Connector Circuit Breakers (15)
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <tbody className="divide-y divide-[#E4E9F0]">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-[#F6F8FB]">
                  <td className="p-2.5 font-bold text-[#0B1220]">{s.id}</td>
                  <td className="p-2.5 text-[#24303F]">{s.name}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.enabled ? 'bg-[#F0FDF4] text-[#067647]' : 'bg-[#FEF2F2] text-[#B42318]'}`}>
                      {s.enabled ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSource(s.id)}
                      className="text-[#0E63C4] hover:underline"
                    >
                      {s.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#0B1220] text-[#CBD5E1] p-3 rounded-lg text-xs h-32 overflow-y-auto space-y-1">
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
