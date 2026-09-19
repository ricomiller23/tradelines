import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F6F8FB] border-t border-[#E4E9F0] py-8 text-xs text-[#5B6779] mt-16 font-mono">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-[#0B1220] uppercase text-[11px] mb-2">Legal Instrument Supremacy</h4>
          <p className="leading-relaxed text-[#24303F]">
            A measure is listed here only with the legal instrument that created it. Where trackers and official gazettes disagree, the instrument wins. Struck-down measures remain visible as audit history.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#0B1220] uppercase text-[11px] mb-2">Effective Tariff Load Method</h4>
          <p className="leading-relaxed text-[#24303F]">
            Derived trade-weighted applied duties use UN Comtrade import volumes as weights. Refuses to compute when weights are missing rather than defaulting to 1.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#0B1220] uppercase text-[11px] mb-2">Compliance Notice</h4>
          <p className="leading-relaxed">
            Not legal or customs compliance advice. Rates must be verified against primary statutory publications prior to entry filing.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-[#E4E9F0] text-[11px] text-[#8494A8] flex justify-between">
        <span>TRADELINES · The Monitor Series · Part 2</span>
        <span>Light-Theme Strict (#FFFFFF / #F6F8FB)</span>
      </div>
    </footer>
  );
}
