import * as XLSX from 'xlsx';
import { Asset, AssetCategory } from '../types';

export const parsePortfolioFile = async (file: File): Promise<Partial<Asset>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert to JSON with header row detection
        const rawData = XLSX.utils.sheet_to_json(sheet);
        
        const parsedAssets: Partial<Asset>[] = rawData.map((row: any) => {
          // Map columns flexibly
          const code = row['代码'] || row['code'] || row['Code'] || row['Ticker'];
          const name = row['名称'] || row['name'] || row['Name'];
          // Handle amount: remove currency symbols, commas, ensure float
          let amountRaw = row['金额'] || row['amount'] || row['Amount'] || row['Market Value'] || row['市值'];
          
          const amount = parseFloat(String(amountRaw).replace(/[^0-9.-]+/g,""));
          
          // Category mapping with fallback
          let category = row['Category'] || row['category'] || row['类别'] || row['Unnamed: 0'];
          
          // Validate Category matches AssetCategory type, else default to '机动'
          const validCategories: AssetCategory[] = ["成长", "进攻", "稳健-黄金", "稳健-日经", "机动"];
          if (!validCategories.includes(category)) {
             category = "机动";
          }

          if (!code || isNaN(amount)) return null;

          return {
            code: String(code),
            name: String(name || code),
            amount: amount,
            category: category as AssetCategory,
            type: 'Imported' // Default type for imports
          };
        }).filter((item): item is Partial<Asset> => item !== null);

        resolve(parsedAssets);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};