import { money, quote } from './cart.js';
import { WA_NUMBER } from './config.js';

export function normalizePhone(value) {
  const source = value.trim();
  if (!/^\+?[\d\s()-]+$/.test(source)) return '';
  const digits = source.replace(/[\s()+-]/g, '');
  if (!/^\d{8,15}$/.test(digits)) return '';
  const normalized = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
  return /^\d{8,15}$/.test(normalized) ? normalized : '';
}

export const validBusinessNumber = (value) => typeof value === 'string' && /^[1-9]\d{7,14}$/.test(value);

export function validateCheckout(state, contact) {
  if (!state.items.length) return { field: 'cart-heading', message: 'Tambahkan produk sebelum memeriksa pesanan.' };
  const name = contact.name.trim();
  if (name.length < 2 || name.length > 80 || /[\r\n]/.test(name)) return { field: 'customer-name', message: 'Isi nama 2–80 karakter dalam satu baris.' };
  if (!normalizePhone(contact.phone)) return { field: 'customer-phone', message: 'Isi nomor WhatsApp yang valid, 8–15 digit. Awalan 08 atau 62 diperbolehkan.' };
  return null;
}

export function buildMessage(state, contact) {
  const estimate = quote(state);
  return [
    'Halo Tiberius Store, saya ingin bertanya/memesan produk berikut:',
    `Nama: ${contact.name.trim()}`,
    `WhatsApp: ${normalizePhone(contact.phone)}`,
    '',
    ...estimate.lines.map((line) => `${line.name} × ${line.quantity} — ${money(line.price)} = ${money(line.subtotal)}`),
    '',
    `Total sementara: ${money(estimate.total)}`,
    'Mohon konfirmasi harga terbaru, keaslian, garansi, dan ketersediaan produk. Pesan ini belum merupakan transaksi.',
  ].join('\n');
}

function buildLink(number, message) {
  if (!validBusinessNumber(number)) throw new Error('Nomor WhatsApp toko belum tersedia.');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrl(number, state, contact) {
  const error = validateCheckout(state, contact);
  if (error) throw new Error(error.message);
  return buildLink(number, buildMessage(state, contact));
}

const messageValue = (value, fallback) => (
  typeof value === 'string' && value.trim() ? value.trim() : fallback
);

function platformName(item) {
  const platform = item.platform || (typeof item.specification === 'string' ? item.specification.split('·')[0] : '');
  return messageValue(platform, 'Tidak dicantumkan');
}

function productPrice(item) {
  return Number.isFinite(item.price) && item.price >= 0 ? money(item.price) : 'Belum dicantumkan';
}

export function buildWhatsAppLink(items = [], { singleProduct = false } = {}) {
  const lines = Array.isArray(items) ? items.filter((item) => item && typeof item === 'object') : [];
  let message = 'Halo, saya mau tanya soal katalog game.';

  if (singleProduct && lines.length) {
    const item = lines[0];
    const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
    message = [
      'Halo, saya mau pesan:',
      `Game: ${messageValue(item.name, 'Produk')}`,
      `Platform: ${platformName(item)}`,
      `Harga: ${productPrice(item)}`,
      `Jumlah: ${quantity}`,
      'Mohon info ketersediaan dan cara pembayarannya.',
    ].join('\n');
  } else if (lines.length) {
    let total = 0;
    let completePrices = true;
    const itemMessages = lines.map((item) => {
      const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
      const priceIsValid = Number.isFinite(item.price) && item.price >= 0;
      if (priceIsValid) total += item.price * quantity;
      else completePrices = false;
      const subtotal = priceIsValid ? money(item.price * quantity) : 'Belum dicantumkan';
      return [
        `- ${messageValue(item.name, 'Produk')}`,
        `  Platform: ${platformName(item)}`,
        `  Harga: ${productPrice(item)}`,
        `  Jumlah: ${quantity}`,
        `  Subtotal: ${subtotal}`,
      ].join('\n');
    });
    message = [
      'Halo, saya mau pesan:',
      '',
      ...itemMessages,
      '',
      `Total harga: ${completePrices ? money(total) : 'Belum dapat dihitung (harga belum dicantumkan).'}`,
      'Mohon info ketersediaan dan cara pembayarannya.',
    ].join('\n');
  }

  return buildLink(WA_NUMBER, message);
}
