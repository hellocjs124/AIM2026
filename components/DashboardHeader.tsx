import React from 'react';
import { Asset, DashboardMetrics } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { TrendingUp, TrendingDown, Clock, Wallet, Activity, Target } from 'lucide-react';

interface Props {
  metrics: DashboardMetrics;
  assets: Asset[];
  currentDateStr: string;
}

const DashboardHeader: React.FC<Props> = ({ metrics, assets, currentDateStr }) => {
  const { totalAssets, baseCapital, yieldAmount, yieldPercent, daysElapsed, yearProgressPercent, targetYieldPercent } = metrics;
  
  const isProfit = yieldAmount >= 0;
  const projectedTarget = baseCapital * (1 + targetYieldPercent / 100);
  const gapToTarget = projectedTarget - totalAssets;
  
  // Calculate Asset Breakdown
  const cashAssets = assets.filter(a => a.type === 'Cash' || a.category === '机动').reduce((acc, curr) => acc + curr.amount, 0);
  const investAssets = totalAssets - cashAssets;
  const investPercent = (investAssets / totalAssets) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      
      {/* 1. Total Assets Control Tower */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl relative overflow-hidden backdrop-blur-sm shadow-lg col-span-1 lg:col-span-2 group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wallet size={120} />
        </div>
        <div className="flex items-center gap-2 mb-2">
           <div className="bg-indigo-500/20 text-indigo-300 p-1.5 rounded-md">
             <Target size={16} />
           </div>
           <h2 className="text-indigo-200 text-xs font-bold uppercase tracking-widest">A.I.M. Portfolio 2026</h2>
        </div>
        
        <div className="flex items-baseline gap-3 mt-2">
          <span className="text-5xl lg:text-6xl font-bold text-white tracking-tight font-mono">
            {formatCurrency(totalAssets)}
          </span>
        </div>
        
        <div className="mt-6 flex items-center gap-6 text-sm">
           <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Equity</span>
              <span className="text-slate-200 font-mono text-base">{formatCurrency(investAssets)} <span className="text-xs text-slate-400">({formatNumber(investPercent, 1)}%)</span></span>
           </div>
           <div className="w-px h-8 bg-slate-700"></div>
           <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Liquid</span>
              <span className="text-slate-200 font-mono text-base">{formatCurrency(cashAssets)} <span className="text-xs text-slate-400">({formatNumber(100 - investPercent, 1)}%)</span></span>
           </div>
        </div>
      </div>

      {/* 2. Yield Target Tracking */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl relative backdrop-blur-sm shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">YTD Alpha</h2>
            <div className={`text-3xl font-bold font-mono mt-1 flex items-center gap-2 ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isProfit ? <TrendingUp size={24}/> : <TrendingDown size={24}/>}
              {yieldPercent > 0 ? '+' : ''}{formatNumber(yieldPercent)}%
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs font-mono text-slate-500">Target: {targetYieldPercent}%</div>
             <div className="text-[10px] text-slate-600 font-mono mt-1">Base: {formatNumber(baseCapital/10000, 0)}W</div>
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
           <div className="flex justify-between text-xs text-slate-400 border-b border-slate-700 pb-2">
             <span>Net PnL</span>
             <span className={`font-mono ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>{yieldAmount > 0 ? '+' : ''}{formatCurrency(yieldAmount)}</span>
           </div>
           <div className="flex justify-between text-xs text-slate-400">
             <span>Gap to Goal ({formatCurrency(projectedTarget)})</span>
             <span className="text-slate-200 font-mono">{formatCurrency(gapToTarget)}</span>
           </div>
           
           <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${isProfit ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                style={{ width: `${Math.min(Math.max((yieldPercent / targetYieldPercent) * 100, 0), 100)}%` }}
              ></div>
           </div>
        </div>
      </div>

      {/* 3. Time Axis vs Performance */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl relative backdrop-blur-sm shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <Clock size={14} /> Time Horizon
          </h2>
          <span className="text-xs text-indigo-400 font-mono border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 rounded">
            {currentDateStr}
          </span>
        </div>
        
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-white font-mono">Day {daysElapsed}</span>
            <span className="text-sm text-slate-500 font-mono">/ 365</span>
          </div>
          
          <div className="relative space-y-4">
            {/* Time Progress Bar */}
            <div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1 text-slate-500">
                <span>Time Elapsed</span>
                <span>{formatNumber(yearProgressPercent, 1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${yearProgressPercent}%` }}
                ></div>
                </div>
            </div>

            {/* Yield Progress Bar Comparison */}
            <div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1 text-slate-500">
                <span>Yield Pacing</span>
                <span>{formatNumber((yieldPercent/targetYieldPercent)*100, 1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div 
                    className={`h-full rounded-full ${yieldPercent < (targetYieldPercent * (yearProgressPercent/100)) ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.min((yieldPercent/targetYieldPercent)*100, 100)}%` }}
                ></div>
                </div>
            </div>
            
            {yieldPercent < (targetYieldPercent * (yearProgressPercent/100)) && (
               <div className="flex items-center gap-2 mt-2 text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                  <Activity size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wide">Pacing Lag</span>
               </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardHeader;