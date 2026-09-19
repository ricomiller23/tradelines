import { describe, it, expect } from 'vitest';
import { parseLegalRate, lookupAsOfRate } from '../lib/rates';
import { TradeMeasure } from '../lib/types';

describe('TRADELINES Rate Engine & Legal Precision Suite', () => {
  it('parses standard percentages and ad valorem rates with exact precision', () => {
    expect(parseLegalRate('10%')).toEqual({
      numeric: 10,
      unit: 'percent_ad_valorem',
      raw: '10%',
    });

    expect(parseLegalRate('12.5%')).toEqual({
      numeric: 12.5,
      unit: 'percent_ad_valorem',
      raw: '12.5%',
    });

    expect(parseLegalRate('ad valorem 12.5%')).toEqual({
      numeric: 12.5,
      unit: 'percent_ad_valorem',
      raw: 'ad valorem 12.5%',
    });

    expect(parseLegalRate('duty-free')).toEqual({
      numeric: 0,
      unit: 'percent_ad_valorem',
      raw: 'duty-free',
    });
  });

  it('preserves raw text and sets numeric to null for compound or tiered rates (NEVER approximates legal rates)', () => {
    const tiered = parseLegalRate('15/25/50%');
    expect(tiered.numeric).toBeNull();
    expect(tiered.raw).toBe('15/25/50%');

    const compound = parseLegalRate('the higher of 7.5% or 25%');
    expect(compound.numeric).toBeNull();
  });

  it('correctly retrieves point-in-time as-of rates across legal changes', () => {
    const testMeasures: TradeMeasure[] = [
      {
        id: 'm-ieepa',
        version: 1,
        supersedes: null,
        title: 'IEEPA 10%',
        kind: 'tariff',
        imposing_country: 'USA',
        target_countries: ['ALL'],
        hs_codes: ['85'],
        product_summary: 'Electronics',
        rate_text: '10%',
        rate_numeric: 10,
        rate_unit: 'percent_ad_valorem',
        legal_instrument: 'IEEPA',
        instrument_url: 'https://example.com',
        effective_from: '2025-02-01',
        effective_to: '2026-02-20',
        status: 'struck_down',
        exclusion_process: null,
        trigger_measure_id: null,
        source_id: 'scotus',
        source_url: 'https://example.com',
      },
      {
        id: 'm-new-duties',
        version: 1,
        supersedes: null,
        title: 'New Duties 12.5%',
        kind: 'tariff',
        imposing_country: 'USA',
        target_countries: ['CHN'],
        hs_codes: ['85'],
        product_summary: 'Electronics',
        rate_text: '12.5%',
        rate_numeric: 12.5,
        rate_unit: 'percent_ad_valorem',
        legal_instrument: 'Trade Act',
        instrument_url: 'https://example.com',
        effective_from: '2026-07-23',
        effective_to: null,
        status: 'in_force',
        exclusion_process: null,
        trigger_measure_id: null,
        source_id: 'fed_reg',
        source_url: 'https://example.com',
      },
    ];

    // As-of 2025-06-01: IEEPA 10% was in force
    const pastResult = lookupAsOfRate(testMeasures, 'CHN', '85', '2025-06-01');
    expect(pastResult.length).toBe(1);
    expect(pastResult[0].id).toBe('m-ieepa');
    expect(pastResult[0].rate_text).toBe('10%');

    // As-of 2026-04-01 (after SCOTUS strike-down, before July new duties): No special executive tariff in force
    const interimResult = lookupAsOfRate(testMeasures, 'CHN', '85', '2026-04-01');
    expect(interimResult.length).toBe(0);

    // As-of 2026-09-01: New Duties 12.5% in force
    const currentResult = lookupAsOfRate(testMeasures, 'CHN', '85', '2026-09-01');
    expect(currentResult.length).toBe(1);
    expect(currentResult[0].id).toBe('m-new-duties');
    expect(currentResult[0].rate_text).toBe('12.5%');
  });
});
