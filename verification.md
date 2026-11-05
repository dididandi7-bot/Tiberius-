# Catatan Verifikasi — Tiberius Store

Status: prototipe statis lokal; belum dipublikasikan sebagai toko transaksi aktif. Katalog dan seluruh harga merupakan data contoh.

## Pemeriksaan yang dilakukan

- Halaman dimuat melalui server HTTP lokal; judul, katalog 20 produk, dan 4 kategori tampil.
- Interaksi browser menguji tambah produk, penggabungan ID yang sama, total Rp9.797.000 untuk 1 PS5 Slim Disc + 2 DualSense, ringkasan kontak, dan tombol WhatsApp yang tetap nonaktif saat nomor usaha kosong.
- Perubahan keranjang menutup ringkasan lama dan memperbarui total.
- Search dan kategori bekerja bersama; hasil kosong dan reset berfungsi.
- Semua 20 entri katalog menggunakan berkas gambar dari folder `image/`; seluruh gambar katalog berhasil dimuat di browser.
- Modul frontend diuji di browser untuk pencarian, perhitungan total, kuantitas, normalisasi nomor, validasi checkout, isi pesan, sanitasi dan pemulihan localStorage.
- Tidak ada overflow horizontal pada viewport 320, 360, 768, dan 1280 CSS px.
- Paket runtime dibuat dengan `python scripts/package_site.py` dan menyertakan gambar produk lokal.

## Belum diverifikasi

- Pengujian otomatis Node.js (`npm test`), pemeriksaan sintaks `node --check`, dan script `tests/browser-smoke.mjs` belum dijalankan karena Node.js/npm tidak tersedia di environment ini.
- Belum dilakukan audit WCAG formal, pengujian screen reader, zoom 200%, browser Safari/Firefox, dan perangkat fisik.
- Belum dilakukan uji tugas dengan calon pengguna.
- Nomor WhatsApp usaha, harga aktual, stok, keaslian produk, spesifikasi TV, garansi, alamat, dan jam operasional perlu diberikan/dikonfirmasi pemilik.
- Belum ada pembayaran, reservasi, stok real-time, backend, hosting publik, atau pengujian produksi.

## Mengulang pemeriksaan

Jalankan server lokal dari root:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Dengan Node.js tersedia, jalankan `npm test`. Smoke test CDP ada di `tests/browser-smoke.mjs`; butuh Chrome dengan remote debugging port 9222, server di port 5500, dan Node.js yang menyediakan WebSocket bawaan. Tes tidak mengirim pesan WhatsApp.

Sebelum rilis, ganti semua data contoh, atur nomor WhatsApp resmi, tinjau tampilan serta alur pada perangkat target, dan tegaskan bahwa konfirmasi pesanan dilakukan manual.
