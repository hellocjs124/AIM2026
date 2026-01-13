import React, { useState, useMemo } from 'react';
import { Asset, DashboardMetrics } from './types';
import { INITIAL_ASSETS, BASE_CAPITAL_2026, TARGET_ANNUAL_RETURN_PERCENT } from './constants';
import { getDaysElapsed, getDynamicSimulatedDate, formatDateString } from './utils/calculations';

// Components
import DashboardHeader from './components/DashboardHeader';
import AssetAllocation from './components/AssetAllocation';
import HoldingsTable from './components/HoldingsTable';
import AddAssetModal from './components/AddAssetModal';
import { PlusCircle } from 'lucide-react';

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Dynamic Date Logic (Simulates Current Day in 2026)
  const currentDate = useMemo(() => getDynamicSimulatedDate(), []);
  const currentDateStr = formatDateString(currentDate);

  // Core Metrics Calculation
  const metrics: DashboardMetrics = useMemo(() => {
    // 1. Calculate Total Assets from current holdings
    const totalAssets = assets.reduce((acc, curr) => acc + curr.amount, 0);
    
    // 2. Calculate Yield (Profit/Loss) against Base Capital (2.5M)
    const yieldAmount = totalAssets - BASE_CAPITAL_2026;
    const yieldPercent = (yieldAmount / BASE_CAPITAL_2026) * 100;
    
    // 3. Time Logic based on Dynamic Date
    const daysElapsed = getDaysElapsed(currentDate);
    const yearProgressPercent = (daysElapsed / 365) * 100;

    return {
      totalAssets,
      baseCapital: BASE_CAPITAL_2026,
      yieldAmount,
      yieldPercent,
      targetYieldPercent: TARGET_ANNUAL_RETURN_PERCENT,
      targetTotal: BASE_CAPITAL_2026 * (1 + TARGET_ANNUAL_RETURN_PERCENT / 100),
      daysElapsed,
      yearProgressPercent
    };
  }, [assets, currentDate]);

  // Handlers
  const handleUpdateAsset = (id: number, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleDeleteAsset = (id: number) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    const nextId = Math.max(...assets.map(a => a.id), 0) + 1;
    setAssets(prev => [...prev, { ...newAsset, id: nextId }]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* Top Navigation / Brand */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">A</div>
                 <span className="text-xl font-bold text-white tracking-tight">AlphaStream <span className="text-slate-500 text-sm font-normal">2026</span></span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-xs text-slate-500 hidden sm:block">
                   System Date: <span className="text-indigo-400 font-mono font-bold">{currentDateStr}</span>
                 </div>
                 <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow shadow-indigo-500/20"
                 >
                    <PlusCircle size={16} />
                    <span>Add Asset</span>
                 </button>
              </div>
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Stats */}
        <DashboardHeader 
          metrics={metrics} 
          assets={assets} 
          currentDateStr={currentDateStr}
        />

        {/* Allocation Strategy */}
        <AssetAllocation assets={assets} totalAssets={metrics.totalAssets} />

        {/* Holdings List */}
        <HoldingsTable 
          assets={assets} 
          onUpdateAsset={handleUpdateAsset} 
          onDeleteAsset={handleDeleteAsset} 
        />

      </main>

      <footer className="border-t border-slate-800 mt-12 py-8 bg-slate-950">
         <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-xs">
            <p>&copy; 2026 AlphaStream Dashboard. Personal Use Only.</p>
            <p className="mt-2">Simulated Environment. Not Investment Advice.</p>
         </div>
      </footer>

      {/* Modals */}
      <AddAssetModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddAsset} 
      />

    </div>
  );
};

export default App;