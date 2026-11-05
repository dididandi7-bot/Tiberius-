# Arsitektur — Tiberius Store

## 1. Bentuk aplikasi
Aplikasi satu halaman statis. Tidak memiliki server aplikasi, API, database, autentikasi, atau pembayaran. Data katalog bersumber dari modul frontend dan pengelola menerima permintaan melalui WhatsApp secara manual.

```text
Browser
├── index.html + css/styles.css
├── js/app.js ── js/data.js
│   ├── js/cart.js
│   ├── js/storage.js ── localStorage (ID + kuantitas)
│   └── js/checkout.js ── draf WhatsApp (setelah nomor toko diatur)
└── FAQ / informasi bahwa harga dan stok perlu dikonfirmasi
```

## 2. Modul aplikasi
- `index.html`: konten, katalog, keranjang, form, FAQ.
- `css/styles.css`: token visual, komponen, responsif, fokus, reduced motion.
- `js/config.js`: nama toko dan nomor WhatsApp publik.
- `js/data.js`: kategori, produk contoh, pencarian, lookup.
- `js/cart.js`: validasi jumlah, perubahan keranjang, hitung total.
- `js/storage.js`: validasi skema dan penyimpanan keranjang aman.
- `js/checkout.js`: validasi kontak, ringkasan teks, URL WhatsApp.
- `js/app.js`: render DOM dan interaksi UI.

## 3. Data keranjang
Contoh objek pada localStorage:

```json
{
  "schemaVersion": 1,
  "items": [
    { "productId": "ps5-slim-disc", "quantity": 1 }
  ]
}
```

Nama, nomor pemesan, harga, stok, dan hasil hitung tidak disimpan. Harga dihitung ulang dari katalog. Data rusak, produk tidak dikenal, jumlah invalid, dan versi skema berbeda tidak dipercaya.

## 4. Alur pemesanan
1. Pengguna menambah produk; keranjang menggabungkan ID dan menjaga jumlah 1–99.
2. Total dihitung dari harga katalog dan jumlah.
3. Formulir memvalidasi nama dan nomor pemesan lalu menampilkan ringkasan.
4. Bila nomor toko valid tersedia, pengguna membuka WhatsApp dengan pesan ter-encode.
5. Pengguna mengirim pesan sendiri. Toko memeriksa harga, produk, stok, dan ketentuan secara manual.
6. Website tidak menampilkan status pesanan berhasil dan tidak membuat reservasi.

## 5. Keamanan dan kegagalan
Gunakan `textContent`/DOM API untuk data dinamis, jangan masukkan input ke `innerHTML`. Validasi ulang jumlah dan kontak. Tangani kegagalan localStorage dan tampilkan peringatan. Nomor toko kosong menonaktifkan tautan pemesanan. Jangan menyimpan data sensitif atau menaruh rahasia di frontend.
