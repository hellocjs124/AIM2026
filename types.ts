export interface Asset {
  id: number;
  category: AssetCategory;
  code: string;
  name: string;
  amount: number; // Total Market Value in CNY
  type: string;
  price?: number; // Optional now
  quantity?: number; // Optional now
}

export type AssetCategory = 
  | "成长" 
  | "进攻" 
  | "稳健-黄金" 
  | "稳健-日经" 
  | "机动";

export interface CategoryTarget {
  name: AssetCategory;
  targetPercent: number; // 0-100
  color: string;
}

export interface DashboardMetrics {
  totalAssets: number;
  baseCapital: number;
  yieldAmount: number;
  yieldPercent: number;
  targetYieldPercent: number;
  targetTotal: number;
  daysElapsed: number;
  yearProgressPercent: number;
}