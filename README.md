<<<<<<< HEAD
# Tiberius Store

Katalog dan keranjang belanja Tiberius Store dibuat dengan HTML, CSS, dan JavaScript native. Tidak menggunakan framework, library UI, backend, atau proses build.

## Menjalankan lokal

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Buka `http://127.0.0.1:5500`. ES modules memerlukan server HTTP; jangan membuka aplikasi melalui `file://`.

## Fitur

- Katalog 20 produk untuk konsol PS5, controller, TV gaming, dan game dengan foto produk dari seluruh berkas di folder `image/`.
- Pencarian dan filter kategori yang dapat digabungkan.
- Keranjang dengan tambah/ubah/hapus jumlah dan estimasi total.
- Keranjang disimpan di localStorage dengan pemulihan data aman.
- Formulir kontak, ringkasan pesanan, dan draf pesan WhatsApp.
- Tampilan responsif, kontrol keyboard, notifikasi aksesibel, FAQ native.

Harga, stok, kelengkapan, kondisi, dan garansi belum diverifikasi. Konfirmasi seluruh informasi kepada toko sebelum transaksi. Tidak ada pembayaran, reservasi, atau pencatatan transaksi di website.

## Konfigurasi toko

Masukkan nomor WhatsApp resmi (kode negara dan digit saja) ke `js/config.js`. Nomor masih kosong secara default, sehingga tombol pesan nonaktif. Ubah katalog, foto (`image/`), dan harga contoh pada `js/data.js`. Jangan aktifkan nomor uji atau mengklaim stok/garansi yang belum dikonfirmasi.

Nama dan nomor pemesan tidak disimpan di localStorage. Jika pengguna meneruskan pesanan, informasi kontak dan rincian produk akan dimasukkan ke draf WhatsApp dan pengguna harus menekan kirim sendiri.

## Tes dan paket statis

```bash
npm test
npm run package
```

Paket runtime dibuat di `artifacts/tiberius-store.zip`. Hanya HTML, CSS, JavaScript, dan aset gambar yang dibutuhkan yang disertakan.

Panduan proyek: [instruction.md](instruction.md), [prd.md](prd.md), [tech_stack.md](tech_stack.md), [arsitektur.md](arsitektur.md), [ui.ux.md](ui.ux.md), dan [verification.md](verification.md).
=======
# Tiberius-
>>>>>>> 47aa14f3ff901ead8f5786a8120d3c3a7c231d56
