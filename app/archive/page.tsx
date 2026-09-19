import React from 'react';
import { Archive, Calendar, ExternalLink } from 'lucide-react';

export const revalidate = 300;

export default function ArchivePage() {
  const milestones = [
    { date: '8 Sep 2026', title: 'Canada Counter-Tariffs at 15/25/50% Take Effect on Targeted US Goods' },
    { date: '23 Jul 2026', title: 'New 10%–12.5% Statutory Duties Take Effect on Imports from Over 80 Countries' },
    { date: '20 Feb 2026', title: 'Supreme Court Strikes Down Unilateral IEEPA Tariffs (Importers Coalition v. US)' },
    { date: '1 Aug 2025', title: 'Universal Suspension of $800 De Minimis Import Exemption' },
    { date: '1 Feb 2025', title: 'Initial Emergency Tariff Impositions under Executive Authority' },
  ];

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Archive className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            24-Month Tariff Era Archive (September 2024 → September 2026)
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Comprehensive historical record documenting the entire legal sequence: initial EOs, court challenges, rate lapses, and statutory restorations.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0B1220] uppercase tracking-wider">
          Chronological Epoch Milestones
        </h2>
        <div className="divide-y divide-[#E4E9F0] text-xs">
          {milestones.map((m, i) => (
            <div key={i} className="py-3 flex items-start gap-4">
              <span className="font-bold text-[#0E63C4] bg-[#EBF3FD] px-2 py-0.5 rounded border border-[#CBD5E1] shrink-0">
                {m.date}
              </span>
              <span className="font-semibold text-[#0B1220]">{m.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
