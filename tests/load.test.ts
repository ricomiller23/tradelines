import { describe, it, expect } from 'vitest';
import { calculateEffectiveTariffLoad } from '../lib/load';
import { TradeFlow, TradeMeasure } from '../lib/types';

describe('Effective Tariff Load Suite', () => {
  it('computes weighted tariff load accurately with valid flows and measures', () => {
    const flows: TradeFlow[] = [
      {
        id: 'f1',
        reporter_iso: 'USA',
        partner_iso: 'CHN',
        hs_code: '85',
        product_summary: 'Electronics',
        period_label: '2026',
        period_start: '2026-01-01',
        direction: 'import',
        value_usd: 100000000,
        volume: null,
        volume_unit: null,
        yoy_pct: 0,
        source_id: 'comtrade',
        source_url: '',
      },
    ];

    const measures: TradeMeasure[] = [
      {
        id: 'm1',
        version: 1,
        supersedes: null,
        title: 'Duty',
        kind: 'tariff',
        imposing_country: 'USA',
        target_countries: ['CHN'],
        hs_codes: ['85'],
        product_summary: 'Electronics',
        rate_text: '12.5%',
        rate_numeric: 12.5,
        rate_unit: 'percent_ad_valorem',
        legal_instrument: 'Proclamation',
        instrument_url: '',
        effective_from: '2026-01-01',
        effective_to: null,
        status: 'in_force',
        exclusion_process: null,
        trigger_measure_id: null,
        source_id: 'ustr',
        source_url: '',
      },
    ];

    const result = calculateEffectiveTariffLoad('CHN', 'USA', '2026-09-19', flows, measures);
    expect(result).not.toBeNull();
    expect(result?.effectiveRatePct).toBe(12.5);
  });

  it('refuses to compute when flow weights are missing rather than defaulting to 1', () => {
    const result = calculateEffectiveTariffLoad('CHN', 'USA', '2026-09-19', [], []);
    expect(result).toBeNull();
  });
});
