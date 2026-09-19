import { TradeMeasure } from './types';

export interface ParsedRate {
  numeric: number | null;
  unit: string | null;
  raw: string;
}

/**
 * Parses raw legal rate text.
 * Rule: If a rate cannot be deterministically parsed into an exact number,
 * keep rate_text verbatim and set rate_numeric to null — NEVER approximate a legal rate.
 */
export function parseLegalRate(rawText: string): ParsedRate {
  const cleaned = rawText.trim();

  // Pattern: Single percentage like "10%", "12.5%", "25%"
  const singlePctMatch = cleaned.match(/^([0-9]+(?:\.[0-9]+)?)\s*%$/);
  if (singlePctMatch) {
    return {
      numeric: parseFloat(singlePctMatch[1]),
      unit: 'percent_ad_valorem',
      raw: cleaned,
    };
  }

  // Pattern: "ad valorem 12.5%"
  const adValoremMatch = cleaned.match(/ad valorem\s+([0-9]+(?:\.[0-9]+)?)\s*%/i);
  if (adValoremMatch) {
    return {
      numeric: parseFloat(adValoremMatch[1]),
      unit: 'percent_ad_valorem',
      raw: cleaned,
    };
  }

  // Pattern: Duty free
  if (/duty[- ]free/i.test(cleaned) || cleaned === '0%') {
    return {
      numeric: 0,
      unit: 'percent_ad_valorem',
      raw: cleaned,
    };
  }

  // Compound, specific, or range rates (e.g. "15/25/50%", "the higher of 7.5% or 25%")
  // Cannot be collapsed into a single number without losing legal precision
  return {
    numeric: null,
    unit: 'compound_or_tiered',
    raw: cleaned,
  };
}

/**
 * Looks up the applicable tariff rate for an origin country and HS code as of a specific date.
 * Allows historical point-in-time dispute audits.
 */
export function lookupAsOfRate(
  measures: TradeMeasure[],
  originIso: string,
  hsCode: string,
  asOfDate: string
): TradeMeasure[] {
  const targetDate = new Date(asOfDate).getTime();

  return measures.filter((m) => {
    // Check country scope
    const matchesCountry =
      m.target_countries.includes('ALL') ||
      m.target_countries.map((c) => c.toUpperCase()).includes(originIso.toUpperCase());

    if (!matchesCountry) return false;

    // Check HS scope
    const matchesHs =
      m.hs_codes.includes('ALL') ||
      m.hs_codes.some((code) => hsCode.startsWith(code) || code.startsWith(hsCode));

    if (!matchesHs) return false;

    // Check effective date window
    const fromDate = new Date(m.effective_from).getTime();
    if (targetDate < fromDate) return false;

    if (m.effective_to) {
      const toDate = new Date(m.effective_to).getTime();
      if (targetDate > toDate) return false;
    }

    return true;
  });
}
