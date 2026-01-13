import React from 'react';
import { Asset, CategoryTarget, AssetCategory } from '../types';
import { CATEGORY_TARGETS } from '../constants';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  assets: Asset[];
  totalAssets: number;
}

const AssetAllocation: React.FC<Props> = ({ assets, totalAssets }) => {
  
  // Group assets by category
  const categoryData = CATEGORY_TARGETS.map(target => {
    const currentAmount = assets
      .filter(a => a.category === target.name)
      .reduce((sum, a) => sum + a.amount, 0);
    
    const currentPercent = totalAssets > 0 ? (currentAmount / totalAssets) * 100 : 0;
    const targetAmount = (target.targetPercent / 100) * totalAssets;
    
    // Gap = Target - Current. 
    // Positive Gap = Underweight (Need to Buy) -> Green
    // Negative Gap = Overweight (Need to Sell) -> Red
    const gap = targetAmount - currentAmount;
    
    return {
      ...target,
      currentAmount,
      currentPercent,
      targetAmount,
      gap
    };
  });

  const pieData = categoryData.map(c => ({
    name: c.name,
    value: c.currentAmount,
    color: c.color
  }));

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-lg font-bold text-white tracking-wide border-l-4 border-indigo-500 pl-3">
           Strategy Map <span className="text-slate-500 font-normal text-sm ml-2">Rebalancing Matrix</span>
         </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Table/List View */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700">
                <th className="pb-3 font-medium uppercase text-xs tracking-wider">Category</th>
                <th className="pb-3 font-medium uppercase text-xs text-right tracking-wider">Target</th>
                <th className="pb-3 font-medium uppercase text-xs text-right tracking-wider">Actual</th>
                <th className="pb-3 font-medium uppercase text-xs text-right tracking-wider">Diff</th>
                <th className="pb-3 font-medium uppercase text-xs text-right tracking-wider">Gap (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {categoryData.map((cat) => (
                <tr key={cat.name} className="group hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 font-medium text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}></span>
                    {cat.name}
                  </td>
                  <td className="py-4 text-right text-slate-400 font-mono">
                    <div className="text-xs">{cat.targetPercent}%</div>
                    <div className="text-[10px] opacity-50">{formatCurrency(cat.targetAmount)}</div>
                  </td>
                  <td className="py-4 text-right font-mono">
                    <span className="text-slate-200">{formatNumber(cat.currentPercent, 1)}%</span>
                    <div className="text-[10px] text-slate-500">{formatCurrency(cat.currentAmount)}</div>
                    
                    {/* Progress Bar within cell */}
                    <div className="w-full bg-slate-700/50 h-1 rounded-full mt-1 ml-auto max-w-[80px]">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${Math.min((cat.currentPercent/cat.targetPercent)*100, 100)}%`, backgroundColor: cat.color }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-mono text-xs">
                    <span className={cat.gap > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                       {cat.currentPercent < cat.targetPercent ? '-' : '+'}{formatNumber(Math.abs(cat.currentPercent - cat.targetPercent), 1)}%
                    </span>
                  </td>
                  <td className="py-4 text-right font-mono">
                    <div className={`text-xs font-bold px-2 py-0.5 rounded inline-block
                        ${cat.gap > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                      {cat.gap > 0 ? 'BUY' : 'TRIM'}
                    </div>
                    <div className={`text-xs mt-1 ${cat.gap > 0 ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
                      {formatCurrency(Math.abs(cat.gap))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Pie Chart */}
        <div className="w-full lg:w-1/3 h-64 relative flex items-center justify-center bg-slate-900/30 rounded-lg border border-slate-800 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#cbd5e1' }}
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-slate-500 text-[10px] uppercase tracking-widest">Allocation</span>
            <span className="text-slate-200 font-mono font-bold text-lg">2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AssetAllocation;