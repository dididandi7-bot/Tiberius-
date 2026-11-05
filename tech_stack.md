# Teknologi — Tiberius Store

## Prinsip
Website statis ringan, tanpa framework atau dependensi runtime. Seluruh katalog dan interaksi berjalan di browser.

| Lapisan | Teknologi |
|---|---|
| Markup | HTML5 semantik |
| Tampilan | CSS3, Grid, Flexbox, media query, ilustrasi CSS |
| Logika | JavaScript ES modules |
| Data katalog | Array objek lokal dalam `js/data.js` |
| Keranjang | localStorage; hanya ID dan jumlah produk |
| Pemesanan | Tautan WhatsApp `wa.me` setelah konfigurasi nomor toko |
| Hosting | Hosting berkas statis HTTPS; belum dideploy |
| Uji | Node.js `node:test`; browser modern untuk smoke test |

Tidak ada build, API key, backend, database, atau font/image CDN yang dibutuhkan. Browser modern Chromium, Firefox, dan Safari menjadi target; Internet Explorer tidak didukung.

## Data dan batas kepercayaan
Harga dalam JavaScript merupakan data publik yang dapat dilihat dan diubah pengguna, bukan acuan pembayaran. localStorage bersifat lokal dan tidak menyediakan stok. Nomor toko adalah informasi publik dan masih kosong. Kontak pemesan tidak disimpan; ketika membuka WhatsApp kontak serta rincian pesanan dimasukkan ke URL/draf layanan tersebut.

## Pengembangan
Jalankan server Python lokal pada port 5500 agar ES modules dilayani melalui HTTP. `npm test` hanya membutuhkan Node.js untuk pengujian, bukan runtime situs. `npm run package` membuat ZIP berisi aset runtime.
