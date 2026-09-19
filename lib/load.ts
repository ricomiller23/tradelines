import { TradeMeasure, TradeFlow } from './types';

export interface EffectiveTariffLoadResult {
  originIso: string;
  destinationIso: string;
  effectiveRatePct: number;
  totalFlowValueUsd: number;
  methodBlock: {
    weightsPeriod: string;
    asOfDate: string;
    hsChapterCount: number;
    description: string;
  };
}

/**
 * Computes trade-weighted effective tariff load.
 * Mandatory Rule: Refuses to compute when flow weights are missing rather than defaulting to 1.
 */
export function calculateEffectiveTariffLoad(
  originIso: string,
  destinationIso: string,
  asOfDate: string,
  flows: TradeFlow[],
  measures: TradeMeasure[]
): EffectiveTariffLoadResult | null {
  const relevantFlows = flows.filter(
    (f) =>
      f.reporter_iso.toUpperCase() === destinationIso.toUpperCase() &&
      f.partner_iso.toUpperCase() === originIso.toUpperCase() &&
      f.value_usd !== null &&
      f.value_usd > 0
  );

  if (relevantFlows.length === 0) {
    return null; // Refuse to compute without weights
  }

  let totalWeightedDuty = 0;
  let totalFlowValue = 0;

  for (const flow of relevantFlows) {
    const applicableMeasures = measures.filter(
      (m) =>
        m.status === 'in_force' &&
        m.imposing_country.toUpperCase() === destinationIso.toUpperCase() &&
        (m.target_countries.includes('ALL') || m.target_countries.includes(originIso.toUpperCase())) &&
        (m.hs_codes.includes('ALL') || m.hs_codes.some((code) => flow.hs_code.startsWith(code)))
    );

    // Default rate if no special tariff measure is baseline MFN (e.g. 2.5%)
    let rate = 2.5;
    if (applicableMeasures.length > 0) {
      const topMeasure = applicableMeasures[0];
      if (topMeasure.rate_numeric !== null) {
        rate = topMeasure.rate_numeric;
      }
    }

    const flowVal = flow.value_usd || 0;
    totalWeightedDuty += rate * flowVal;
    totalFlowValue += flowVal;
  }

  const effectiveRate = parseFloat((totalWeightedDuty / totalFlowValue).toFixed(2));

  return {
    originIso,
    destinationIso,
    effectiveRatePct: effectiveRate,
    totalFlowValueUsd: totalFlowValue,
    methodBlock: {
      weightsPeriod: relevantFlows[0]?.period_label || '2026',
      asOfDate,
      hsChapterCount: relevantFlows.length,
      description: `Trade-weighted applied tariff average. Weights derived from customs import valuations across ${relevantFlows.length} HS chapters.`,
    },
  };
}
