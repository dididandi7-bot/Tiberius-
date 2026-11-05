import test from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES, PRODUCTS, filterProducts } from '../js/data.js';
import { quote, setQuantity, validQuantity } from '../js/cart.js';
import { emptyState, loadState, sanitizeState, saveState } from '../js/storage.js';
import { buildMessage, buildWhatsAppLink, buildWhatsAppUrl, normalizePhone, validBusinessNumber, validateCheckout } from '../js/checkout.js';
import { WA_NUMBER } from '../js/config.js';

const state = () => ({ ...emptyState(), items: [{ productId: 'ps5-slim-disc', quantity: 1 }, { productId: 'dualsense', quantity: 2 }] });
const contact = { name: 'Rani <A> & "B"', phone: '+62 812-3456-7890' };

test('20 products use unique images, cover all categories, and combine search with category filters', () => {
  assert.equal(PRODUCTS.length, 20);
  assert.equal(new Set(PRODUCTS.map((product) => product.id)).size, PRODUCTS.length);
  assert.equal(new Set(PRODUCTS.map((product) => product.image)).size, PRODUCTS.length);
  for (const category of CATEGORIES.slice(1)) assert.ok(PRODUCTS.some((product) => product.category === category.id));
  assert.equal(filterProducts(' SLIM ', 'console').length, 2);
  assert.equal(filterProducts('slim', 'game').length, 0);
  assert.equal(filterProducts('', 'all').length, PRODUCTS.length);
  assert.equal(filterProducts('world terbuka', 'game')[0].id, 'red-dead-2');
  assert.equal(filterProducts('helldivers', 'game')[0].image, 'image/Helldivers™ 2.jpg');
  assert.equal(filterProducts('digital', 'game').some((product) => product.id === 'warhammer-40k-digital'), true);
});

test('cart merges matching products, enforces quantity limits, and uses current catalogue prices', () => {
  let items = setQuantity([], 'ps5-slim-disc', 1);
  items = setQuantity(items, 'ps5-slim-disc', 2);
  assert.deepEqual(items, [{ productId: 'ps5-slim-disc', quantity: 2 }]);
  assert.ok(validQuantity(1));
  for (const value of [0, -1, 1.5, 100, NaN, '2']) assert.throws(() => setQuantity(items, 'ps5-slim-disc', value), RangeError);
  assert.throws(() => setQuantity(items, 'unknown', 1), RangeError);
  assert.equal(quote(state()).total, 9797000);
  assert.equal(quote(state()).units, 3);
});

test('storage restores only valid product IDs and quantities without contact data', () => {
  let stored;
  const storage = { setItem: (_, value) => { stored = value; }, getItem: () => stored };
  const draft = { ...state(), name: 'Private', phone: '081234567890' };
  assert.ok(saveState(draft, () => storage));
  assert.equal(stored.includes('Private'), false);
  assert.equal(stored.includes('phone'), false);
  assert.deepEqual(loadState(() => storage).state, state());
  assert.equal(loadState(() => ({ getItem: () => '{bad' })).failed, true);
  assert.equal(loadState(() => { throw Error('denied'); }).failed, true);
  assert.equal(saveState(state(), () => { throw Error('quota'); }), false);
  assert.deepEqual(sanitizeState({ schemaVersion: 2, items: state().items }), emptyState());
});

test('storage drops unknown products, invalid quantities, duplicates, and injected fields', () => {
  const draft = state();
  draft.items.push({ productId: 'unknown', quantity: 2 }, { productId: 'dualsense-edge', quantity: 100 }, { productId: 'dualsense', quantity: 5 }, null);
  draft.items[0].price = 1;
  assert.deepEqual(sanitizeState(draft), state());
});

test('contact validation supports local/international phone formats and rejects malformed input', () => {
  assert.equal(normalizePhone('0812 3456 7890'), '6281234567890');
  assert.equal(normalizePhone('+62 (812) 3456-7890'), '6281234567890');
  for (const value of ['123', '0812<script>', '0812+3456789', '1234567890123456']) assert.equal(normalizePhone(value), '');
  assert.equal(validateCheckout(state(), contact), null);
  assert.equal(validateCheckout(emptyState(), contact).field, 'cart-heading');
  assert.equal(validateCheckout(state(), { ...contact, name: ' ' }).field, 'customer-name');
  assert.equal(validateCheckout(state(), { ...contact, name: 'A\nB' }).field, 'customer-name');
  assert.equal(validateCheckout(state(), { ...contact, phone: 'abc' }).field, 'customer-phone');
});

test('WhatsApp draft encodes the complete product list and requires a configured store number', () => {
  const message = buildMessage(state(), contact);
  assert.ok(message.includes('9.797.000'));
  assert.ok(message.includes('PlayStation 5 Slim Disc × 1'));
  assert.ok(message.includes('belum merupakan transaksi'));
  const url = new URL(buildWhatsAppUrl('12025550123', state(), contact));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(validBusinessNumber(''), false);
  assert.equal(validBusinessNumber('+62812345678'), false);
  assert.throws(() => buildWhatsAppUrl('', state(), contact));
});

test('catalog WhatsApp links include product details and safely handle missing data', () => {
  const game = { name: 'Tekken 8 & Friends', specification: 'PS5 · Disc · Fighting', price: 799000 };
  const productUrl = new URL(buildWhatsAppLink([{ ...game, quantity: 1 }], { singleProduct: true }));
  const productMessage = productUrl.searchParams.get('text');
  assert.equal(productUrl.pathname, `/${WA_NUMBER}`);
  assert.ok(productMessage.includes('Game: Tekken 8 & Friends'));
  assert.ok(productMessage.includes('Platform: PS5'));
  assert.ok(productMessage.includes('Harga: Rp799.000'));
  assert.ok(productMessage.includes('Jumlah: 1'));
  assert.ok(!productMessage.includes('undefined'));

  const cartUrl = new URL(buildWhatsAppLink([
    { ...game, quantity: 2 },
    { name: 'Produk tanpa data harga/platform', quantity: 1 },
  ]));
  const cartMessage = cartUrl.searchParams.get('text');
  assert.ok(cartMessage.includes('Tekken 8 & Friends'));
  assert.ok(cartMessage.includes('Jumlah: 2'));
  assert.ok(cartMessage.includes('Total harga: Belum dapat dihitung'));
  assert.ok(cartMessage.includes('Platform: Tidak dicantumkan'));
  assert.ok(!cartMessage.includes('undefined'));

  assert.equal(new URL(buildWhatsAppLink()).searchParams.get('text'), 'Halo, saya mau tanya soal katalog game.');
});
