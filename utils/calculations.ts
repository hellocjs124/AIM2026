export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Generates a date object for "Today's Month/Day" but in 2026
export const getDynamicSimulatedDate = (): Date => {
  const now = new Date();
  // Create date for 2026, current month, current day
  return new Date(2026, now.getMonth(), now.getDate());
};

export const formatDateString = (date: Date): string => {
  // Returns YYYY-MM-DD format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDaysElapsed = (currentDate: Date): number => {
  const start = new Date(2026, 0, 1).getTime(); // Jan 1, 2026
  const current = currentDate.getTime();
  
  // Calculate difference in milliseconds
  const diffTime = current - start;
  
  // Convert to days. Math.max ensures we don't get negative numbers if system clock is weird
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); 
  
  return diffDays + 1; // Jan 1 is Day 1
};