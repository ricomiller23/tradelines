import React from 'react';
import { SEED_FLOWS, SEED_MEASURES } from '@/lib/fallback-data';
import { calculateEffectiveTariffLoad } from '@/lib/load';
import { ArrowLeftRight, ExternalLink, Calculator } from 'lucide-react';

export const revalidate = 120;

export default function FlowsPage() {
  const loadChnUsa = calculateEffectiveTariffLoad('CHN', 'USA', '2026-09-19', SEED_FLOWS, SEED_MEASURES);
  const loadCanUsa = calculateEffectiveTariffLoad('CAN', 'USA', '2026-09-19', SEED_FLOWS, SEED_MEASURES);

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Merchandise Trade Flows & Effective Tariff Load
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Bilateral import/export telemetry cross-referenced with applied duty schedules to determine the true trade-weighted tariff load.
        </p>
      </div>

      {/* Flagship Metric: Effective Tariff Load Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadChnUsa && (
          <div className="bg-[#FFFFFF] border-2 border-[#0E63C4] p-5 rounded-xl shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                EFFECTIVE TARIFF LOAD (DERIVED)
              </span>
              <span className="text-[10px] text-[#5B6779]">UN Comtrade Weights</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <strong className="text-xl text-[#0B1220] block">China → United States</strong>
                <span className="text-[#5B6779]">Merchandise Import Weighted Duty</span>
              </div>
              <span className="text-2xl font-extrabold text-[#B42318]">{loadChnUsa.effectiveRatePct}%</span>
            </div>
            <div className="p-2.5 rounded bg-[#F6F8FB] border border-[#E4E9F0] text-[11px] text-[#5B6779] leading-relaxed">
              <strong>Method:</strong> {loadChnUsa.methodBlock.description}
            </div>
          </div>
        )}

        {loadCanUsa && (
          <div className="bg-[#FFFFFF] border-2 border-[#0E63C4] p-5 rounded-xl shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                EFFECTIVE TARIFF LOAD (DERIVED)
              </span>
              <span className="text-[10px] text-[#5B6779]">UN Comtrade Weights</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <strong className="text-xl text-[#0B1220] block">Canada → United States</strong>
                <span className="text-[#5B6779]">Targeted Products Weighted Duty</span>
              </div>
              <span className="text-2xl font-extrabold text-[#067647]">{loadCanUsa.effectiveRatePct}%</span>
            </div>
            <div className="p-2.5 rounded bg-[#F6F8FB] border border-[#E4E9F0] text-[11px] text-[#5B6779] leading-relaxed">
              <strong>Method:</strong> {loadCanUsa.methodBlock.description}
            </div>
          </div>
        )}
      </div>

      {/* Bilateral Trade Flow Table */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E4E9F0] bg-[#F6F8FB]">
          <h2 className="text-sm font-bold text-[#0B1220] uppercase tracking-wider">
            Verified Physical Trade Flow Observations ({SEED_FLOWS.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#CBD5E1] bg-[#F6F8FB] text-[#0B1220]">
                <th className="py-2.5 px-3 font-bold">Partner Pair</th>
                <th className="py-2.5 px-3 font-bold">HS Code</th>
                <th className="py-2.5 px-3 font-bold">Product Sector</th>
                <th className="py-2.5 px-3 font-bold">Period</th>
                <th className="py-2.5 px-3 font-bold text-right">Trade Value (USD)</th>
                <th className="py-2.5 px-3 font-bold text-right">YoY Shift</th>
                <th className="py-2.5 px-3 font-bold text-right">Customs Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9F0]">
              {SEED_FLOWS.map((f) => (
                <tr key={f.id} className="hover:bg-[#F6F8FB]">
                  <td className="py-2.5 px-3 font-bold text-[#0B1220]">{f.partner_iso} → {f.reporter_iso}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0E63C4]">HS {f.hs_code}</td>
                  <td className="py-2.5 px-3 text-[#24303F]">{f.product_summary}</td>
                  <td className="py-2.5 px-3 text-[#5B6779]">{f.period_label}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#0B1220]">
                    ${(f.value_usd! / 1e9).toFixed(1)}B
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={f.yoy_pct! > 0 ? 'text-[#067647]' : 'text-[#B42318]'}>
                      {f.yoy_pct! > 0 ? `+${f.yoy_pct}%` : `${f.yoy_pct}%`}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <a href={f.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 justify-end font-semibold">
                      Comtrade <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
