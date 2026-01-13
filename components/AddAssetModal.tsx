import React, { useState } from 'react';
import { Asset, AssetCategory } from '../types';
import { CATEGORY_TARGETS } from '../constants';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: Omit<Asset, 'id'>) => void;
}

const AddAssetModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    category: '成长' as AssetCategory,
    code: '',
    name: '',
    amount: '',
    type: 'Stock'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    
    if (!formData.code || !formData.name || isNaN(amount)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onAdd({
      category: formData.category,
      code: formData.code,
      name: formData.name,
      amount: amount,
      type: formData.type as any
    });
    
    onClose();
    // Reset form
    setFormData({
      category: '成长',
      code: '',
      name: '',
      amount: '',
      type: 'Stock'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-800/50">
          <h2 className="text-white font-bold">Add Portfolio Asset</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs uppercase text-slate-500 mb-1">Category</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm outline-none focus:border-indigo-500"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as AssetCategory})}
                >
                  {CATEGORY_TARGETS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-xs uppercase text-slate-500 mb-1">Type</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm outline-none focus:border-indigo-500"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Stock">Stock</option>
                  <option value="Fund">Fund</option>
                  <option value="ETF">ETF</option>
                  <option value="Bond">Bond</option>
                  <option value="Cash">Cash</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1">Ticker / Code</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm outline-none focus:border-indigo-500"
                placeholder="e.g. 300750"
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1">Asset Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm outline-none focus:border-indigo-500"
                placeholder="e.g. CATL"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-500 mb-1">Market Value (CNY)</label>
            <input 
              type="number" 
              step="0.01"
              className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm outline-none focus:border-indigo-500"
              placeholder="0.00"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
            />
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded transition-colors shadow-lg shadow-indigo-500/20"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetModal;