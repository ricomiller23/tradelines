'use client';

import React, { useState } from 'react';
import { Scale, ShieldCheck, AlertTriangle, ArrowRight, Anchor, Globe2, ExternalLink, Info } from 'lucide-react';

export interface TradeCorridor {
  id: string;
  corridorName: string;
  origin: string;
  destination: string;
  lat: number;
  lng: number;
  statutoryInstrument: string;
  tariffRate: string;
  frictionType: 'Tariff Rate Hike' | 'Carbon Border Levy' | 'Rules of Origin' | 'Security Surcharge';
  annualTradeValue: string;
  legalStatus: string;
  legalGazetteUrl: string;
}

export const MONITORED_CORRIDORS: TradeCorridor[] = [
  {
    id: 'us-china-transpacific',
    corridorName: 'Transpacific Technology & Manufacturing Corridor',
    origin: 'China (Shenzhen / Shanghai)',
    destination: 'United States (LA / Long Beach)',
    lat: 31.2304,
    lng: 121.4737,
    statutoryInstrument: '19 U.S.C. § 2411 (Section 301) / Presidential Proc. 10783',
    tariffRate: '25.0% – 100.0% Ad Valorem',
    frictionType: 'Tariff Rate Hike',
    annualTradeValue: '$575 Billion',
    legalStatus: 'Active & Enforced (CIT Appeals Pending)',
    legalGazetteUrl: 'https://ustr.gov'
  },
  {
    id: 'eu-cbam-corridor',
    corridorName: 'EU Carbon Border Adjustment Mechanism (CBAM)',
    origin: 'Third Countries (Global)',
    destination: 'European Union (Rotterdam / Antwerp)',
    lat: 51.9244,
    lng: 4.4777,
    statutoryInstrument: 'Regulation (EU) 2023/956 of the European Parliament',
    tariffRate: '€65 – €85 / tonne CO2 equivalent',
    frictionType: 'Carbon Border Levy',
    annualTradeValue: '$410 Billion Covered Goods',
    legalStatus: 'Definitive Period Phase-in',
    legalGazetteUrl: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en'
  },
  {
    id: 'us-canada-usmca',
    corridorName: 'USMCA Northern Border Industrial & Timber Corridor',
    origin: 'Canada (Ontario / British Columbia)',
    destination: 'United States (Detroit / Great Lakes)',
    lat: 42.3314,
    lng: -83.0458,
    statutoryInstrument: '19 U.S.C. § 4501 et seq. / Tariff Act 1930 § 701',
    tariffRate: '14.54% Combined AD/CVD (Softwood)',
    frictionType: 'Tariff Rate Hike',
    annualTradeValue: '$780 Billion Total Trade',
    legalStatus: 'Chapter 10 Dispute Panel Active',
    legalGazetteUrl: 'https://www.trade.gov'
  },
  {
    id: 'redsea-cape-reroute',
    corridorName: 'Asia-Europe Cape of Good Hope Maritime Reroute',
    origin: 'Asia / Indian Ocean',
    destination: 'North Europe / Mediterranean',
    lat: -34.3568,
    lng: 18.4740,
    statutoryInstrument: 'IMO Maritime Safety Circular / Joint War Committee JWLA-032',
    tariffRate: '$1,200 – $2,000 War Risk Surcharge/FEU',
    frictionType: 'Security Surcharge',
    annualTradeValue: '$1.1 Trillion Rerouted Cargo',
    legalStatus: 'Permanent Commercial Deviation (+14d Transit)',
    legalGazetteUrl: 'https://www.imo.org'
  },
  {
    id: 'us-mexico-automotive',
    corridorName: 'USMCA Cross-Border Automotive Supply Chain',
    origin: 'Mexico (Monterrey / Bajío)',
    destination: 'United States (Laredo / Midwest Assembly)',
    lat: 27.5036,
    lng: -99.5075,
    statutoryInstrument: 'USMCA Uniform Regulations Article 5 / 19 CFR Part 182',
    tariffRate: '0.0% (Conditioned on 75% RVC & 40% LVC)',
    frictionType: 'Rules of Origin',
    annualTradeValue: '$815 Billion Cross-Border Trade',
    legalStatus: 'Panel Ruling Compliant',
    legalGazetteUrl: 'https://www.cbp.gov'
  },
  {
    id: 'malacca-strait',
    corridorName: 'Strait of Malacca Hydrocarbon & Container Artery',
    origin: 'Persian Gulf & Africa',
    destination: 'East Asia (Singapore / Tokyo / Shanghai)',
    lat: 1.3521,
    lng: 103.8198,
    statutoryInstrument: 'UNCLOS Part III Straits Used for International Navigation',
    tariffRate: 'Free Transit (Escalating Port Dues)',
    frictionType: 'Security Surcharge',
    annualTradeValue: '$3.5 Trillion Annually',
    legalStatus: 'Navigational Freedom Monitored',
    legalGazetteUrl: 'https://www.mpa.gov.sg'
  }
];

function projectGlobalCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const y = ((85 - lat) / 170) * 100;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(3, Math.min(97, y))
  };
}

export function TradeCorridorMap() {
  const [selectedCorridor, setSelectedCorridor] = useState<TradeCorridor>(MONITORED_CORRIDORS[0]);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6 font-mono">
      {/* Header */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0E63C4] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide font-display">
              Global Trade Corridors & Statutory Tariff Friction Map
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-bold">
              Customs & Trade Dockets
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 font-sans">
            Strict Invariant: The statutory instrument (statute, proclamation, regulation) outranks any journalistic paraphrase.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-[#344054] font-bold">
            WTO Disputes Tracked: 38
          </span>
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-[#0E63C4] font-bold">
            Average Tariff: 13.5%
          </span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="relative w-full bg-[#F8FAFC] border-b border-[#E4E9F0] overflow-hidden" style={{ minHeight: '360px' }}>
        <svg
          viewBox="0 0 100 55"
          className="w-full h-auto max-h-[440px] select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Lat / Lng Grid */}
          <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 1" />
          <line x1="50" y1="0" x2="50" y2="55" stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 1" />

          {/* Continents */}
          <path d="M 12,8 L 26,8 L 32,16 L 24,24 L 20,28 L 14,24 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 24,29 L 34,31 L 32,46 L 27,51 L 24,38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 46,10 L 58,10 L 56,19 L 48,19 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 46,21 L 58,21 L 60,38 L 52,47 L 46,33 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 59,7 L 90,8 L 86,28 L 68,26 L 60,18 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 80,36 L 93,36 L 90,48 L 78,46 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />

          {/* Trade Route Lines */}
          <path d="M 84,20 Q 98,20 18,22" fill="none" stroke="#0E63C4" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.4" />
          <path d="M 51,14 Q 38,18 24,20" fill="none" stroke="#0E63C4" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.4" />
          <path d="M 78,32 Q 55,48 51,14" fill="none" stroke="#0E63C4" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.4" />
        </svg>

        {/* Markers */}
        <div className="absolute inset-0 pointer-events-auto">
          {MONITORED_CORRIDORS.map((corridor) => {
            const { x, y } = projectGlobalCoords(corridor.lat, corridor.lng);
            const isSelected = selectedCorridor.id === corridor.id;
            return (
              <div
                key={corridor.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                onClick={() => setSelectedCorridor(corridor)}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <span className={`absolute w-7 h-7 rounded-full opacity-30 bg-[#0E63C4] ${isSelected ? 'animate-ping' : ''}`} />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-md ${
                      isSelected
                        ? 'bg-[#0E63C4] border-[#FFFFFF] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#0E63C4] text-[#0E63C4]'
                    }`}
                  >
                    <Anchor className="w-3 h-3" />
                  </div>

                  {/* Badge */}
                  <div
                    className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shadow-xs border pointer-events-none transition ${
                      isSelected
                        ? 'bg-[#101828] text-[#FFFFFF] border-[#101828]'
                        : 'bg-[#FFFFFF]/95 text-[#344054] border-[#E4E9F0]'
                    }`}
                  >
                    {corridor.id.split('-')[0].toUpperCase()} : {corridor.tariffRate.split(' ')[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corridor Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#101828] font-display">{selectedCorridor.corridorName}</h3>
            <span className="text-xs px-2 py-0.5 bg-[#EFF8FF] border border-[#B2DDFF] text-[#0E63C4] rounded font-bold">
              {selectedCorridor.frictionType}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Tariff / Levy Rate
              </span>
              <span className="text-sm font-bold text-[#B42318]">{selectedCorridor.tariffRate}</span>
              <span className="text-[10px] text-[#667085] block mt-0.5 font-sans">Effective statutory rate</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Annual Trade Volume
              </span>
              <span className="text-sm font-bold text-[#0E63C4]">{selectedCorridor.annualTradeValue}</span>
              <span className="text-[10px] text-[#667085] block mt-0.5 font-sans">Customs value baseline</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Legal Status
              </span>
              <span className="text-xs font-bold text-[#101828] block mt-1">{selectedCorridor.legalStatus}</span>
            </div>
          </div>
        </div>

        {/* Statutory Instrument Column */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <Scale className="w-4 h-4 text-[#0E63C4]" />
              <span>Statutory Instrument Authority (Direct Quote)</span>
            </div>
            <p className="text-xs text-[#344054] bg-[#FFFFFF] p-2 rounded border border-[#E4E9F0] font-mono leading-relaxed">
              <strong>Statute:</strong> {selectedCorridor.statutoryInstrument}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Routing: {selectedCorridor.origin} → {selectedCorridor.destination}</span>
            <a
              href={selectedCorridor.legalGazetteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#0E63C4] hover:underline flex items-center gap-0.5 font-semibold font-sans"
            >
              Statutory Docket <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
