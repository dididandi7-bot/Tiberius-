import { findProduct } from './data.js';
import { validQuantity } from './cart.js';

export const STORAGE_KEY = 'tiberius-store:cart:v1';
export const emptyState = () => ({ schemaVersion: 1, items: [] });

export function sanitizeState(value) {
  const state = emptyState();
  if (!value || value.schemaVersion !== 1 || !Array.isArray(value.items)) return state;
  const seen = new Set();
  for (const item of value.items) {
    if (!item || !findProduct(item.productId) || !validQuantity(item.quantity) || seen.has(item.productId)) continue;
    seen.add(item.productId);
    state.items.push({ productId: item.productId, quantity: item.quantity });
  }
  return state;
}

export function loadState(getStorage = () => globalThis.localStorage) {
  try {
    const raw = getStorage().getItem(STORAGE_KEY);
    return { state: sanitizeState(raw ? JSON.parse(raw) : null), failed: false };
  } catch {
    return { state: emptyState(), failed: true };
  }
}

export function saveState(state, getStorage = () => globalThis.localStorage) {
  try {
    const safe = { schemaVersion: 1, items: state.items.map(({ productId, quantity }) => ({ productId, quantity })) };
    getStorage().setItem(STORAGE_KEY, JSON.stringify(safe));
    return true;
  } catch {
    return false;
  }
}
