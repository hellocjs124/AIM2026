import { Asset } from '../types';
import { INITIAL_ASSETS } from '../constants';

const STORAGE_KEY = 'aim_portfolio_assets_v1';

export const loadAssets = (): Asset[] => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData) {
      return JSON.parse(serializedData);
    }
  } catch (error) {
    console.error("Failed to load assets from storage", error);
  }
  return INITIAL_ASSETS;
};

export const saveAssets = (assets: Asset[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error("Failed to save assets to storage", error);
  }
};

// Clear storage if needed for debugging
export const resetStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};