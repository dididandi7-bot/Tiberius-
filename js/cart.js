import { findProduct } from './data.js';

export const money = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(value);

export const validQuantity = (value) => Number.isInteger(value) && value >= 1 && value <= 99;

export function setQuantity(items, productId, quantity) {
  if (!findProduct(productId) || !validQuantity(quantity)) throw new RangeError('Jumlah harus bilangan bulat antara 1 dan 99.');
  const exists = items.some((item) => item.productId === productId);
  return exists ? items.map((item) => item.productId === productId ? { productId, quantity } : item) : [...items, { productId, quantity }];
}

export const removeItem = (items, productId) => items.filter((item) => item.productId !== productId);

export function quote(state) {
  const lines = state.items.flatMap((item) => {
    const product = findProduct(item.productId);
    return product && validQuantity(item.quantity) ? [{ ...product, quantity: item.quantity, subtotal: product.price * item.quantity }] : [];
  });
  return {
    lines,
    units: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.subtotal, 0),
  };
}
