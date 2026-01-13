import { Asset, CategoryTarget } from './types';

export const BASE_CAPITAL_2026 = 2500000;
export const TARGET_ANNUAL_RETURN_PERCENT = 30; // 30%

export const CATEGORY_TARGETS: CategoryTarget[] = [
  { name: "成长", targetPercent: 60, color: "#10b981" }, // Emerald 500
  { name: "进攻", targetPercent: 20, color: "#f59e0b" }, // Amber 500
  { name: "稳健-黄金", targetPercent: 5, color: "#eab308" }, // Yellow 500
  { name: "稳健-日经", targetPercent: 5, color: "#3b82f6" }, // Blue 500
  { name: "机动", targetPercent: 10, color: "#64748b" }, // Slate 500
];

export const INITIAL_ASSETS: Asset[] = [
  { "id": 1, "category": "成长", "code": "159915", "name": "创业板 ETF", "amount": 297540, "type": "ETF" },
  { "id": 2, "category": "成长", "code": "159783", "name": "双创基金", "amount": 28350, "type": "Fund" },
  { "id": 3, "category": "成长", "code": "300308", "name": "中际旭创", "amount": 234304, "type": "Stock" },
  { "id": 4, "category": "成长", "code": "300394", "name": "天孚通信", "amount": 190000, "type": "Stock" },
  { "id": 5, "category": "成长", "code": "300502", "name": "新易盛", "amount": 153280, "type": "Stock" },
  { "id": 6, "category": "成长", "code": "300750", "name": "宁德时代", "amount": 136420, "type": "Stock" },
  { "id": 7, "category": "成长", "code": "300274", "name": "阳光电源", "amount": 16048, "type": "Stock" },
  { "id": 8, "category": "成长", "code": "300014", "name": "亿纬锂能", "amount": 13326, "type": "Stock" },
  { "id": 9, "category": "成长", "code": "603259", "name": "药明康德", "amount": 13644, "type": "Stock" },
  { "id": 10, "category": "成长", "code": "600276", "name": "恒瑞医药", "amount": 21936, "type": "Stock" },
  { "id": 11, "category": "成长", "code": "601138", "name": "工业富联", "amount": 23772, "type": "Stock" },
  { "id": 12, "category": "成长", "code": "000333", "name": "美的集团", "amount": 7620, "type": "Stock" },
  { "id": 13, "category": "成长", "code": "161726", "name": "招商国证生物医药", "amount": 106890, "type": "Fund" },
  { "id": 14, "category": "成长", "code": "000746", "name": "招商行业精选", "amount": 69195, "type": "Fund" },
  { "id": 15, "category": "成长", "code": "399011", "name": "中海医疗保健", "amount": 25781, "type": "Fund" },
  { "id": 16, "category": "成长", "code": "005689", "name": "中银医疗保健", "amount": 15194, "type": "Fund" },
  { "id": 17, "category": "成长", "code": "001938", "name": "中欧时代先锋", "amount": 8425, "type": "Fund" },
  { "id": 18, "category": "成长", "code": "519181", "name": "万家和谐增长", "amount": 7767, "type": "Fund" },
  { "id": 19, "category": "进攻", "code": "515880", "name": "通信ETF", "amount": 47096, "type": "ETF" },
  { "id": 20, "category": "进攻", "code": "016371", "name": "信澳业绩驱动", "amount": 118655, "type": "Fund" },
  { "id": 21, "category": "进攻", "code": "025209", "name": "永赢先锋半导体", "amount": 105451, "type": "Fund" },
  { "id": 22, "category": "进攻", "code": "022365", "name": "永赢科技智选", "amount": 87017, "type": "Fund" },
  { "id": 23, "category": "进攻", "code": "021528", "name": "财通成长优选", "amount": 83827, "type": "Fund" },
  { "id": 24, "category": "进攻", "code": "310358", "name": "申万菱信新经济", "amount": 37510, "type": "Fund" },
  { "id": 25, "category": "进攻", "code": "377240", "name": "摩根新兴动力", "amount": 36004, "type": "Fund" },
  { "id": 26, "category": "进攻", "code": "006250", "name": "摩根动力精选", "amount": 24115, "type": "Fund" },
  { "id": 27, "category": "进攻", "code": "024170", "name": "信澳新能源C", "amount": 15261, "type": "Fund" },
  { "id": 28, "category": "进攻", "code": "001410", "name": "信澳新能源A", "amount": 10390, "type": "Fund" },
  { "id": 29, "category": "稳健-黄金", "code": "601899", "name": "紫金矿业", "amount": 15296, "type": "Stock" },
  { "id": 30, "category": "稳健-黄金", "code": "518850", "name": "黄金9999", "amount": 14790, "type": "ETF" },
  { "id": 31, "category": "稳健-黄金", "code": "009033", "name": "建信上海金", "amount": 7671, "type": "Fund" },
  { "id": 32, "category": "稳健-日经", "code": "513000", "name": "日经225ETF", "amount": 142275, "type": "ETF" },
  { "id": 33, "category": "机动", "code": "110017", "name": "易方达增强回报", "amount": 93116, "type": "Fund" },
  { "id": 34, "category": "机动", "code": "CASH", "name": "现金/余额", "amount": 262034, "type": "Cash" }
];