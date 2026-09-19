import React from 'react';
import { SEED_MEASURES } from '@/lib/fallback-data';
import { ShieldAlert, ExternalLink, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default function RetaliationPage() {
  const retaliationPairs = SEED_MEASURES.filter((m) => m.trigger_measure_id !== null).map((counter) => {
    const trigger = SEED_MEASURES.find((t) => t.id === counter.trigger_measure_id);
    return { counter, trigger };
  });

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-[#B42318]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Retaliation Graph & Counter-Measure Chains
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Direct mapping between primary unilateral tariff actions and sovereign counter-measures.
          Retaliation links are established strictly when cited in the responding legal instrument.
        </p>
      </div>

      <div className="space-y-4">
        {retaliationPairs.map(({ counter, trigger }, idx) => (
          <div key={idx} className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-2">
              <span className="font-bold text-xs bg-[#FEF2F2] text-[#B42318] border border-[#FBD5D5] px-2 py-0.5 rounded">
                ESCALATION CHAIN: {trigger?.imposing_country} ⇄ {counter.imposing_country}
              </span>
              <span className="text-xs text-[#5B6779]">Effective: {counter.effective_from}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Trigger */}
              <div className="p-3.5 rounded-lg bg-[#F6F8FB] border border-[#E4E9F0] text-xs space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#5B6779] block">1. PROVOKING MEASURE</span>
                <strong className="text-sm text-[#0B1220] block">{trigger?.title}</strong>
                <div className="text-[#5B6779]">Authority: {trigger?.legal_instrument}</div>
                <div className="text-[#0B1220] font-bold">Duty: {trigger?.rate_text}</div>
                <div className="text-[#8494A8] text-[10px]">Effective: {trigger?.effective_from}</div>
              </div>

              {/* Counter */}
              <div className="p-3.5 rounded-lg bg-[#FFFBEB] border border-[#FCE8A5] text-xs space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#8A6100] block">2. RETALIATORY COUNTER-TARIFF</span>
                <strong className="text-sm text-[#0B1220] block">{counter.title}</strong>
                <div className="text-[#5B6779]">Authority: {counter.legal_instrument}</div>
                <div className="text-[#B42318] font-bold">Duty: {counter.rate_text}</div>
                <div className="text-[#8494A8] text-[10px]">Effective: {counter.effective_from} (Active)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E9F0] flex justify-between items-center text-xs">
              <span className="text-[#5B6779]">Affected Products: {counter.product_summary}</span>
              <a href={counter.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold">
                Official Order in Council <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
