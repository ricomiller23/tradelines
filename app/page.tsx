import { TradeCorridorMap } from "@/components/TradeCorridorMap";
import React from 'react';
import Link from 'next/link';
import { SEED_MEASURES, SEED_LEGAL_CHALLENGES } from '@/lib/fallback-data';
import { Scale, ExternalLink, ShieldCheck, AlertTriangle, ArrowRight, Gavel } from 'lucide-react';

export const revalidate = 60;

export default function MeasuresPage() {
  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-5 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold bg-[#0E63C4] text-white px-2 py-0.5 rounded">
                19 September 2026 Active Tariff Docket
              </span>
              <span className="text-xs text-[#5B6779]">
                SCOTUS Struck Down IEEPA (20 Feb) · 10–12.5% on 80+ Countries (23 Jul) · Canada Retaliation Active (8 Sep)
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B1220] tracking-tight font-display">
              Global Tariff Measures & Legal Instruments Register
            </h1>
            <p className="text-xs text-[#24303F] mt-1 max-w-3xl leading-relaxed">
              Tracking the statutory instruments that establish, raise, lower, or strike down global import duties.
              The legal instrument outranks any news tracker paraphrase.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/lookup"
              className="bg-[#0E63C4] hover:bg-[#0A4E9E] text-white text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1.5"
            >
              Point-in-Time Lookup →
            </Link>
          </div>
        </div>
      </div>

      <TradeCorridorMap />

      {/* Grid: Measures + What Changed Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Measures Table (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1220] uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#0E63C4]" /> Active & Litigated Measures ({SEED_MEASURES.length})
            </h2>
            <span className="text-xs text-[#5B6779]">Reverse-Chronological</span>
          </div>

          <div className="space-y-3">
            {SEED_MEASURES.map((m) => {
              const isInForce = m.status === 'in_force';
              const isStruck = m.status === 'struck_down';
              const isProposed = m.status === 'proposed';

              return (
                <div
                  key={m.id}
                  className="bg-[#FFFFFF] border border-[#E4E9F0] hover:border-[#CBD5E1] p-4 rounded-xl shadow-xs transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs bg-[#F6F8FB] border border-[#E4E9F0] px-1.5 py-0.5 rounded text-[#0B1220]">
                        {m.imposing_country} → {m.target_countries.join(', ')}
                      </span>
                      {isInForce && (
                        <span className="text-[10px] font-bold bg-[#EBF3FD] text-[#0A3F73] border border-[#CBD5E1] px-2 py-0.5 rounded">
                          IN FORCE
                        </span>
                      )}
                      {isStruck && (
                        <span className="text-[10px] font-bold bg-[#F8FAFC] text-[#5B6473] line-through border border-[#D8DEE7] px-2 py-0.5 rounded">
                          STRUCK DOWN
                        </span>
                      )}
                      {isProposed && (
                        <span className="text-[10px] font-bold bg-[#FFFBEB] text-[#8A6100] border border-[#FCE8A5] px-2 py-0.5 rounded">
                          PROPOSED / THREAT
                        </span>
                      )}
                      {m.is_tracker_only && (
                        <span className="text-[10px] font-bold bg-[#FEF2F2] text-[#B42318] border border-[#FBD5D5] px-2 py-0.5 rounded">
                          TRACKER ONLY (UNRATIFIED)
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-extrabold text-[#0B1220] bg-[#F6F8FB] px-2 py-0.5 rounded border border-[#E4E9F0]">
                      Rate: {m.rate_text}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#0B1220] mb-1">{m.title}</h3>
                  <p className="text-xs text-[#5B6779] mb-3">{m.product_summary}</p>

                  <div className="pt-2 border-t border-[#E4E9F0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5B6779]">
                    <div className="flex items-center gap-3">
                      <span><strong>Instrument:</strong> {m.legal_instrument}</span>
                      <span><strong>Effective:</strong> {m.effective_from}</span>
                    </div>
                    <a
                      href={m.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Legal Gazette <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: What Changed This Week & Litigation Rail (1 col) */}
        <div className="space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1220] mb-3 flex items-center gap-1.5">
              <Gavel className="w-4 h-4 text-[#0E63C4]" /> Judicial Precedent of Record
            </h3>
            {SEED_LEGAL_CHALLENGES.map((leg) => (
              <div key={leg.id} className="text-xs space-y-2">
                <span className="font-bold text-[#0B1220] block">{leg.case_name}</span>
                <span className="text-[10px] bg-[#FEF2F2] text-[#B42318] border border-[#FBD5D5] px-1.5 py-0.2 rounded font-bold inline-block">
                  {leg.outcome}
                </span>
                <p className="text-[#5B6779] text-[11px] leading-relaxed">{leg.summary}</p>
                <div className="pt-2 border-t border-[#E4E9F0]">
                  <a href={leg.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold">
                    SCOTUS Docket Review <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-[#0B1220] uppercase text-[11px]">Trade Policy Rulebook</h4>
            <p className="text-[#5B6779] leading-relaxed">
              When an emergency tariff is struck down by federal courts, it is not removed from this dashboard. It is flagged as <code>struck_down</code> with its effective lifespan documented for trade litigation and retroactive duty refunds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
