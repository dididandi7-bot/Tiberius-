import { BUSINESS } from './config.js';
import { CATEGORIES, PRODUCTS, filterProducts, findProduct } from './data.js';
import { money, quote, removeItem, setQuantity, validQuantity } from './cart.js';
import { loadState, saveState } from './storage.js';
import { buildWhatsAppLink, buildWhatsAppUrl, normalizePhone, validBusinessNumber, validateCheckout } from './checkout.js';

const $ = (id) => document.getElementById(id);
const loaded = loadState();
let state = loaded.state;
let category = 'all';
let toastTimer;
const businessReady = validBusinessNumber(BUSINESS.whatsapp);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function announce(message) {
  clearTimeout(toastTimer);
  const status = $('status-message');
  status.textContent = message;
  status.classList.add('visible');
  toastTimer = setTimeout(() => status.classList.remove('visible'), 4000);
}

function renderCatalog() {
  const products = filterProducts($('search').value, category);
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    const card = element('article', 'product-card');
    const visual = element('div', 'product-image');
    visual.dataset.category = product.category;
    const photo = element('img', 'product-photo');
    photo.src = product.image;
    photo.alt = product.imageAlt;
    photo.width = 800;
    photo.height = 600;
    photo.loading = 'lazy';
    photo.decoding = 'async';
    visual.append(photo, element('span', 'product-tag', product.tag));
    const body = element('div', 'product-body');
    body.append(
      element('p', 'product-category', CATEGORIES.find((entry) => entry.id === product.category).name),
      element('h3', '', product.name),
      element('p', 'product-description', product.description),
      element('p', 'product-spec', product.specification),
    );
    const bottom = element('div', 'product-bottom');
    const price = element('div', 'product-price');
    price.append(element('strong', '', money(product.price)), element('small', '', 'Harga contoh'));
    const add = element('button', 'add-button', '+ Tambah');
    add.type = 'button';
    add.dataset.add = product.id;
    add.setAttribute('aria-label', `Tambah ${product.name} ke keranjang`);
    bottom.append(price, add);
    body.append(bottom);
    if (product.category === 'game') {
      const whatsapp = element('a', 'product-whatsapp-link', 'Pesan via WhatsApp ↗');
      whatsapp.href = buildWhatsAppLink([{ ...product, quantity: 1 }], { singleProduct: true });
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener noreferrer';
      whatsapp.setAttribute('aria-label', `Pesan ${product.name} via WhatsApp (membuka tab baru)`);
      body.append(whatsapp);
    }
    card.append(visual, body);
    fragment.append(card);
  });
  $('product-grid').replaceChildren(fragment);
  $('result-count').textContent = `${products.length} dari ${PRODUCTS.length} produk`;
  $('no-results').hidden = products.length !== 0;
}

function renderFilters() {
  CATEGORIES.forEach((entry) => {
    const button = element('button', 'filter-button', entry.name);
    button.type = 'button';
    button.dataset.category = entry.id;
    button.setAttribute('aria-pressed', String(entry.id === category));
    $('category-filters').append(button);
  });
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach((node) => { node.textContent = ''; });
  document.querySelectorAll('[aria-invalid]').forEach((node) => node.removeAttribute('aria-invalid'));
}

function invalidateReview() {
  $('review-panel').hidden = true;
  $('whatsapp-button').setAttribute('aria-disabled', 'true');
  $('whatsapp-button').setAttribute('tabindex', '-1');
  $('whatsapp-button').removeAttribute('href');
  clearErrors();
}

function persist() {
  if (!saveState(state)) $('storage-warning').hidden = false;
}

function updateEstimate() {
  const estimate = quote(state);
  $('cart-count').textContent = estimate.units;
  $('cart-total').textContent = money(estimate.total);
  $('estimate-help').textContent = state.items.length ? `${estimate.units} item · harga dan stok perlu dikonfirmasi toko.` : 'Pilih produk untuk melihat total.';
  $('review-button').disabled = state.items.length === 0;
  document.querySelectorAll('[data-subtotal]').forEach((node) => {
    const line = estimate.lines.find((entry) => entry.id === node.dataset.subtotal);
    node.textContent = line ? money(line.subtotal) : '';
  });
}

function renderCart(focusTarget) {
  const fragment = document.createDocumentFragment();
  state.items.forEach((item) => {
    const product = findProduct(item.productId);
    if (!product) return;
    const row = element('div', 'cart-item');
    const head = element('div', 'cart-item-head');
    const icon = element('img', 'cart-thumb');
    icon.src = product.image;
    icon.alt = '';
    icon.loading = 'lazy';
    icon.decoding = 'async';
    const details = element('div');
    details.append(element('h3', '', product.name), element('p', 'item-rate', money(product.price)));
    head.append(icon, details);
    const controls = element('div', 'cart-item-controls');
    const quantity = element('div', 'quantity-control');
    for (const [action, text, label] of [['minus', '−', 'Kurangi'], ['plus', '+', 'Tambah']]) {
      const button = element('button', '', text);
      button.type = 'button';
      button.dataset.action = action;
      button.dataset.id = product.id;
      button.setAttribute('aria-label', `${label} jumlah ${product.name}`);
      button.disabled = action === 'minus' ? item.quantity <= 1 : item.quantity >= 99;
      quantity.append(button);
    }
    const input = element('input');
    input.type = 'number';
    input.inputMode = 'numeric';
    input.min = '1';
    input.max = '99';
    input.step = '1';
    input.value = item.quantity;
    input.dataset.quantity = product.id;
    input.setAttribute('aria-label', `Jumlah ${product.name}`);
    quantity.insertBefore(input, quantity.lastChild);
    const remove = element('button', 'remove-button', 'Hapus');
    remove.type = 'button';
    remove.dataset.action = 'remove';
    remove.dataset.id = product.id;
    remove.setAttribute('aria-label', `Hapus ${product.name} dari keranjang`);
    controls.append(quantity, remove);
    const error = element('p', 'field-error');
    error.id = `quantity-error-${product.id}`;
    input.setAttribute('aria-describedby', error.id);
    const subtotal = element('p', 'line-subtotal');
    subtotal.dataset.subtotal = product.id;
    row.append(head, controls, error, subtotal);
    fragment.append(row);
  });
  $('cart-items').replaceChildren(fragment);
  $('cart-empty').hidden = state.items.length > 0;
  updateEstimate();
  if (focusTarget) {
    const selector = focusTarget.action ? `[data-action="${focusTarget.action}"][data-id="${focusTarget.id}"]` : `[data-quantity="${focusTarget.id}"]`;
    const target = $('cart-items').querySelector(selector);
    if (target && !target.disabled) target.focus({ preventScroll: true });
    else ($('cart-items').querySelector(`[data-quantity="${focusTarget.id}"]`) || $('cart-heading')).focus({ preventScroll: true });
  }
}

function changeQuantity(id, quantity, focusTarget) {
  try {
    state.items = setQuantity(state.items, id, quantity);
    invalidateReview();
    persist();
    renderCart(focusTarget);
    return true;
  } catch (error) {
    announce(error.message);
    return false;
  }
}

function contact() {
  return { name: $('customer-name').value, phone: $('customer-phone').value };
}

function showError(error) {
  clearErrors();
  if (error.field === 'cart-heading') {
    $('form-error').textContent = error.message;
    $('cart-heading').focus();
    return;
  }
  const input = $(error.field);
  $(`${error.field}-error`).textContent = error.message;
  input.setAttribute('aria-invalid', 'true');
  input.focus();
}

function renderReview() {
  const estimate = quote(state);
  const data = contact();
  const description = document.createDocumentFragment();
  [['Nama', data.name.trim()], ['WhatsApp', normalizePhone(data.phone)]].forEach(([label, value]) => {
    description.append(element('dt', '', label), element('dd', '', value));
  });
  $('review-contact').replaceChildren(description);
  $('review-lines').replaceChildren(...estimate.lines.map((line) => element('li', '', `${line.name} × ${line.quantity} — ${money(line.subtotal)}`)));
  $('review-total').textContent = `Total sementara: ${money(estimate.total)}`;
  $('review-panel').hidden = false;
  const whatsapp = $('whatsapp-button');
  if (businessReady) {
    whatsapp.href = buildWhatsAppUrl(BUSINESS.whatsapp, state, data);
    whatsapp.setAttribute('aria-disabled', 'false');
    whatsapp.removeAttribute('tabindex');
  } else {
    whatsapp.setAttribute('aria-disabled', 'true');
    whatsapp.setAttribute('tabindex', '-1');
    whatsapp.removeAttribute('href');
  }
  $('review-heading').focus();
}

renderFilters();
renderCatalog();
renderCart();
$('storage-warning').hidden = !loaded.failed;
$('year').textContent = new Date().getFullYear();
$('unavailable-note').hidden = businessReady;
$('floating-whatsapp').href = buildWhatsAppLink();

if (businessReady) $('business-contact').textContent = `WhatsApp toko: +${BUSINESS.whatsapp}. Silakan konfirmasi harga dan stok sebelum transaksi.`;

$('search').addEventListener('input', renderCatalog);
$('category-filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  category = button.dataset.category;
  $('category-filters').querySelectorAll('button').forEach((node) => node.setAttribute('aria-pressed', String(node === button)));
  renderCatalog();
});
$('reset-filters').addEventListener('click', () => {
  $('search').value = '';
  category = 'all';
  $('category-filters').querySelectorAll('button').forEach((node) => node.setAttribute('aria-pressed', String(node.dataset.category === category)));
  renderCatalog();
  $('search').focus();
});
$('product-grid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const id = button.dataset.add;
  const current = state.items.find((item) => item.productId === id)?.quantity || 0;
  if (changeQuantity(id, current + 1)) announce(`${findProduct(id).name} ditambahkan ke keranjang.`);
});
$('cart-items').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { id, action } = button.dataset;
  if (action === 'remove') {
    invalidateReview();
    state.items = removeItem(state.items, id);
    persist();
    renderCart();
    ($('cart-items').querySelector('button') || $('cart-heading')).focus({ preventScroll: true });
    announce(`${findProduct(id).name} dihapus dari keranjang.`);
    return;
  }
  const current = state.items.find((item) => item.productId === id).quantity;
  changeQuantity(id, current + (action === 'plus' ? 1 : -1), { id, action });
});
$('cart-items').addEventListener('input', (event) => {
  if (!event.target.matches('[data-quantity]')) return;
  invalidateReview();
  $('review-button').disabled = true;
});
$('cart-items').addEventListener('change', (event) => {
  const input = event.target;
  if (!input.matches('[data-quantity]')) return;
  const id = input.dataset.quantity;
  if (!changeQuantity(id, input.valueAsNumber, { id })) {
    input.setAttribute('aria-invalid', 'true');
    $(`quantity-error-${id}`).textContent = 'Sebelumnya tetap dipakai. Masukkan jumlah bulat 1–99.';
    $('review-button').disabled = true;
    input.focus();
  }
});
for (const id of ['customer-name', 'customer-phone']) $(id).addEventListener('input', invalidateReview);
$('order-form').addEventListener('submit', (event) => {
  event.preventDefault();
  for (const input of $('cart-items').querySelectorAll('[data-quantity]')) {
    if (!validQuantity(input.valueAsNumber)) {
      input.setAttribute('aria-invalid', 'true');
      $(`quantity-error-${input.dataset.quantity}`).textContent = 'Masukkan jumlah bulat 1–99.';
      input.focus();
      return;
    }
    state.items = setQuantity(state.items, input.dataset.quantity, input.valueAsNumber);
  }
  persist();
  updateEstimate();
  const error = validateCheckout(state, contact());
  if (error) { showError(error); return; }
  clearErrors();
  renderReview();
});
$('edit-request').addEventListener('click', () => {
  invalidateReview();
  $('customer-name').focus();
});
