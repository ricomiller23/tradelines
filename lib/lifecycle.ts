import { TradeMeasure, MeasureStatus } from './types';

/**
 * State machine managing tariff legal lifecycle:
 * proposed -> in_force | suspended -> struck_down | expired
 * Struck down measures are NEVER deleted — history is the audit trail.
 */
export function transitionMeasureStatus(
  current: TradeMeasure,
  newStatus: MeasureStatus,
  effectiveDate: string
): TradeMeasure {
  return {
    ...current,
    version: current.version + 1,
    supersedes: current.id,
    status: newStatus,
    effective_to: newStatus === 'struck_down' || newStatus === 'expired' ? effectiveDate : current.effective_to,
  };
}

/**
 * Asserts that a measure is only classified as 'in_force' if backed by an authoritative legal instrument citation.
 */
export function assertLegalInstrumentEnforced(measure: TradeMeasure): boolean {
  if (measure.status === 'in_force') {
    if (!measure.legal_instrument || measure.legal_instrument.trim() === '') {
      throw new Error(`Measure ${measure.id} cannot be marked 'in_force' without a legal instrument citation.`);
    }
  }
  return true;
}
