import React, { useState } from 'react';
import { Asset, AssetCategory } from '../types';
import { CATEGORY_TARGETS } from '../constants';
import { formatCurrency } from '../utils/calculations';
import { Edit2, Trash2, Search, Filter, Save, X } from 'lucide-react';

interface Props {
  assets: Asset[];
  onUpdateAsset: (id: number, updates: Partial<Asset>) => void;
  onDeleteAsset: (id: number) => void;
}

const HoldingsTable: React.FC<Props> = ({ assets, onUpdateAsset, onDeleteAsset }) => {
  const [filterCategory, setFilterCategory] = useState<AssetCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Edit State
  const [editAmount, setEditAmount] = useState<string>('');

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = filterCategory === 'All' || asset.category === filterCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const startEditing = (asset: Asset) => {
    setEditingId(asset.id);
    setEditAmount(asset.amount.toString());
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditAmount('');
  };

  const saveEditing = (id: number) => {
    const amt = parseFloat(editAmount);
    if (!isNaN(amt)) {
      onUpdateAsset(id, {
        amount: amt
      });
    }
    setEditingId(null);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-white tracking-wide border-l-4 border-indigo-500 pl-3 self-start sm:self-center">
          Holdings Manager <span className="text-slate-500 font-normal text-sm ml-2">Institutional View</span>
        </h3>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
             <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
             <input 
               type="text" 
               placeholder="Search ticker..." 
               className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 w-full sm:w-48 outline-none placeholder-slate-600 transition-all focus:w-64"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          
          <div className="relative">
             <Filter className="absolute left-3 top-2.5 text-slate-500" size={16} />
             <select 
               className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-8 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 appearance-none outline-none cursor-pointer"
               value={filterCategory}
               onChange={(e) => setFilterCategory(e.target.value as AssetCategory | 'All')}
             >
               <option value="All">All Categories</option>
               {CATEGORY_TARGETS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
             </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-900 text-slate-400 border-b border-slate-700">
              <th className="px-4 py-3 font-medium uppercase text-xs tracking-wider">Type</th>
              <th className="px-4 py-3 font-medium uppercase text-xs tracking-wider">Code</th>
              <th className="px-4 py-3 font-medium uppercase text-xs tracking-wider">Name</th>
              <th className="px-4 py-3 font-medium uppercase text-xs text-right tracking-wider">Market Value (CNY)</th>
              <th className="px-4 py-3 font-medium uppercase text-xs text-center tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors group">
                 <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-opacity-20
                    ${asset.category === '成长' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500' : 
                      asset.category === '进攻' ? 'bg-amber-500/10 text-amber-400 border-amber-500' :
                      asset.category === '稳健-黄金' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500' :
                      asset.category === '稳健-日经' ? 'bg-blue-500/10 text-blue-400 border-blue-500' :
                      'bg-slate-500/10 text-slate-400 border-slate-500'
                    }`}>
                    {asset.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                   <span className="text-slate-400 font-mono">{asset.code}</span>
                </td>
                <td className="px-4 py-3">
                   <span className="text-slate-200 font-medium">{asset.name}</span>
                </td>

                {/* Market Value Column (Editable) */}
                <td className="px-4 py-3 text-right font-mono font-bold">
                    {editingId === asset.id ? (
                        <div className="flex justify-end">
                             <input 
                            type="number" 
                            value={editAmount} 
                            onChange={e => setEditAmount(e.target.value)}
                            className="w-32 bg-slate-950 border border-indigo-500 text-right px-2 py-1 rounded outline-none text-white focus:ring-1 focus:ring-indigo-500"
                            autoFocus
                        />
                        </div>
                    ) : (
                        <span className="text-slate-100">{formatCurrency(asset.amount)}</span>
                    )}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    {editingId === asset.id ? (
                      <>
                        <button onClick={() => saveEditing(asset.id)} className="text-emerald-400 hover:text-emerald-300 p-1.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors"><Save size={14} /></button>
                        <button onClick={cancelEditing} className="text-slate-400 hover:text-white p-1.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors"><X size={14} /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEditing(asset)} className="text-indigo-400 hover:text-indigo-300 p-1.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors"><Edit2 size={14} /></button>
                        <button onClick={() => onDeleteAsset(asset.id)} className="text-rose-500 hover:text-rose-400 p-1.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors"><Trash2 size={14} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAssets.length === 0 && (
           <div className="text-center py-12 text-slate-500">
              No assets found matching your criteria.
           </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsTable;