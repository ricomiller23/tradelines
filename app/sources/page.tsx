import React from 'react';
import SOURCES from '@/config/sources.json';
import { BookOpen, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 300;

export default function SourcesPage() {
  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Authoritative Sources & Regulatory Gazette Roster (15)
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Direct legislative gazettes, customs portals, and international flow databases.
          A measure enters this system strictly with an authoritative legal instrument citation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOURCES.map((s) => (
          <div key={s.id} className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="bg-[#0E63C4] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                Tier {s.tier}
              </span>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold">
                Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <strong className="text-sm text-[#0B1220] block">{s.name}</strong>
            <div className="text-[#5B6779]"><strong>Cadence:</strong> {s.cadence}</div>
            <div className="p-2 rounded bg-[#FFFBEB] text-[#8A6100] border border-[#FCE8A5] text-[11px] leading-relaxed">
              {s.bias_note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
