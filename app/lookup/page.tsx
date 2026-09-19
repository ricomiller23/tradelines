'use client';

import React, { useState } from 'react';
import { SEED_MEASURES } from '@/lib/fallback-data';
import { lookupAsOfRate } from '@/lib/rates';
import { Search, ExternalLink, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LookupPage() {
  const [origin, setOrigin] = useState<string>('CHN');
  const [hsCode, setHsCode] = useState<string>('85');
  const [asOfDate, setAsOfDate] = useState<string>('2026-09-19');

  const matches = lookupAsOfRate(SEED_MEASURES, origin, hsCode, asOfDate);

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Point-in-Time Applicable Tariff Rate Lookup
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Audit the exact legal tariff rate in force on any past date for an origin country and HS chapter.
          Historical dispute verification requires point-in-time fidelity.
        </p>
      </div>

      {/* Query Form */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-bold text-[#0B1220] block mb-1">Origin Country (ISO-3)</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            placeholder="e.g. CHN, CAN, VNM"
            className="w-full px-3 py-2 rounded bg-[#F6F8FB] border border-[#E4E9F0] font-bold text-[#0B1220] focus:ring-1 focus:ring-[#0E63C4]"
          />
        </div>
        <div>
          <label className="font-bold text-[#0B1220] block mb-1">HS Chapter / Code</label>
          <input
            type="text"
            value={hsCode}
            onChange={(e) => setHsCode(e.target.value)}
            placeholder="e.g. 85, 87, 72"
            className="w-full px-3 py-2 rounded bg-[#F6F8FB] border border-[#E4E9F0] font-bold text-[#0B1220] focus:ring-1 focus:ring-[#0E63C4]"
          />
        </div>
        <div>
          <label className="font-bold text-[#0B1220] block mb-1">As-Of Date (YYYY-MM-DD)</label>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#F6F8FB] border border-[#E4E9F0] font-bold text-[#0B1220] focus:ring-1 focus:ring-[#0E63C4]"
          />
        </div>
      </div>

      {/* Results Box */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E9F0] mb-4">
          <h2 className="text-sm font-bold text-[#0B1220] uppercase tracking-wider">
            Applicable Rates as of {asOfDate} ({matches.length} matching)
          </h2>
          <span className="text-xs text-[#5B6779] bg-[#F6F8FB] px-2 py-0.5 rounded border border-[#E4E9F0]">
            Destination: USA
          </span>
        </div>

        {matches.length === 0 ? (
          <div className="p-8 text-center text-[#5B6779] text-xs">
            No specific executive tariff measure found for Origin: {origin}, HS: {hsCode} as of {asOfDate}.
            Baseline statutory MFN rate applies.
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((m) => (
              <div key={m.id} className="p-4 rounded-lg bg-[#F6F8FB] border border-[#E4E9F0] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B1220] text-sm">{m.title}</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-[#0E63C4] text-white">
                    Rate: {m.rate_text}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[#5B6779] pt-1">
                  <div><strong>Legal Instrument:</strong> {m.legal_instrument}</div>
                  <div><strong>Effective Window:</strong> {m.effective_from} → {m.effective_to || 'Present'}</div>
                  <div><strong>Legal Status:</strong> <span className="uppercase font-bold text-[#0B1220]">{m.status}</span></div>
                </div>
                <div className="pt-2 border-t border-[#CBD5E1] flex justify-between items-center text-[11px]">
                  <span className="text-[#8494A8]">Our classification — verify against statutory instrument</span>
                  <a href={m.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold">
                    View Instrument <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
