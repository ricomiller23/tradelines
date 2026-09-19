export type MeasureKind = 'tariff' | 'quota' | 'export_control' | 'sanctions' | 'licensing' | 'ban';
export type MeasureStatus = 'in_force' | 'suspended' | 'struck_down' | 'excluded' | 'under_review' | 'expired' | 'proposed';

export interface TradeMeasure {
  id: string;
  version: number;
  supersedes: string | null;
  title: string;
  kind: MeasureKind;
  imposing_country: string; // ISO3
  target_countries: string[]; // ISO3[] or ['ALL']
  hs_codes: string[];
  product_summary: string;
  rate_text: string; // verbatim: '10%', 'ad valorem 12.5%', '15/25/50%'
  rate_numeric: number | null;
  rate_unit: string | null; // 'percent_ad_valorem' | 'specific_usd_per_kg'
  legal_instrument: string; // e.g. 'EO 14321', 'Section 232', 'Section 301', 'CUSMA'
  instrument_url: string;
  effective_from: string; // YYYY-MM-DD
  effective_to: string | null;
  status: MeasureStatus;
  exclusion_process: string | null;
  trigger_measure_id: string | null; // For counter-tariffs
  source_id: string;
  source_url: string;
  is_seed?: boolean;
  is_tracker_only?: boolean;
}

export interface MeasureEvent {
  id: string;
  measure_id: string;
  event_type: 'imposed' | 'raised' | 'lowered' | 'suspended' | 'struck_down' | 'reinstated' | 'excluded' | 'expired' | 'effective';
  event_date: string;
  summary: string;
  from_rate: string | null;
  to_rate: string | null;
  source_url: string;
}

export interface LegalChallenge {
  id: string;
  court: string;
  case_name: string;
  filed_date: string;
  decided_date: string;
  outcome: string;
  affected_measure_ids: string[];
  summary: string;
  source_url: string;
}

export interface TradeFlow {
  id: string;
  reporter_iso: string;
  partner_iso: string;
  hs_code: string;
  product_summary: string;
  period_label: string;
  period_start: string;
  direction: 'export' | 'import';
  value_usd: number | null;
  volume: number | null;
  volume_unit: string | null;
  yoy_pct: number | null;
  source_id: string;
  source_url: string;
}

export interface PortSignal {
  id: string;
  port_id: string;
  port_name: string;
  country_iso: string;
  metric: 'throughput_teu' | 'dwell_days' | 'queue_vessels' | 'blank_sailings' | 'freight_rate_usd_feu';
  period_label: string;
  value: number;
  unit: string;
  yoy_pct: number | null;
  source_id: string;
  source_url: string;
}

export interface SupplyDisruption {
  id: string;
  kind: 'port_congestion' | 'canal_disruption' | 'facility_outage' | 'export_restriction' | 'sanction_impact';
  title: string;
  hs_codes: string[];
  countries: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  started_at: string;
  resolved_at: string | null;
  summary: string;
  source_urls: string[];
}
