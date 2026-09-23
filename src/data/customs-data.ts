export interface LiveCustomsFee {
  label: string;
  value: string;
}

export interface LiveCustomsItem {
  code: string;
  title: string;
  chapter: string;
  status: string;
  statusType: "allowed" | "banned" | "restricted" | "unknown";
  unitType: string;
  fixedFeeAmount?: number;
  fixedFeeUnit?: string;
  percentageTotal?: number;
  fees: LiveCustomsFee[];
  notes: string;
}

export interface LiveCustomsResponse {
  query: string;
  type: string;
  totalResults: number;
  items: LiveCustomsItem[];
  sourceUrl: string;
  timestamp: string;
  error?: string;
}
