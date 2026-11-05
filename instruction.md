# SOP Pengembangan — Tiberius Store

## 1. Identitas dan tujuan
- **Nama proyek:** Refactoring & Redesign Tiberius Gaming
- **Nama website:** Tiberius Gaming / Tiberius Store
- **Jenis:** Katalog dan toko online UMKM produk gaming
- **Tujuan:** Menampilkan katalog responsif dan interaktif untuk konsol PS5, controller, TV gaming, dan game original, dengan alur pemesanan yang jelas.
- **Target pengguna:** Gamer pemula hingga enthusiast yang mencari produk gaming original dengan harga bersahabat.
- **Batas MVP:** Situs statis HTML, CSS, dan JavaScript native. Tidak ada akun, backend, stok real-time, reservasi otomatis, ataupun pembayaran online.

## 2. Aturan data dan konten
1. Katalog sumber berada di `js/data.js`. Setiap produk memiliki ID unik, nama, kategori, deskripsi, spesifikasi, harga integer rupiah, path gambar lokal dari `image/`, dan alt gambar.
2. Harga saat ini adalah contoh visual, bukan penawaran terkonfirmasi. Ganti setelah data toko diverifikasi.
3. Jangan membuat klaim stok, garansi, kondisi, keaslian produk tertentu, testimoni, alamat, atau jam operasional tanpa konfirmasi pemilik.
4. Nomor WhatsApp usaha berada di `js/config.js`, format internasional digit saja. Nomor kosong menonaktifkan tombol pemesanan. Jangan memakai nomor uji sebagai tujuan.
5. Semua harga dihitung dari data katalog terkini, bukan nilai dari localStorage.

## 3. Aturan implementasi
- Gunakan HTML5 semantik, CSS responsif, dan JavaScript ES modules tanpa framework, pustaka UI, CDN, atau proses build.
- Bahasa antarmuka Indonesia, `lang="id"`, satu `h1`, landmark semantik, tautan lewati konten, label input yang terlihat, fokus keyboard jelas, dan dukungan `prefers-reduced-motion`.
- Pencarian nama/deskripsi/spesifikasi dan kategori harus dapat digunakan bersama. Keadaan hasil kosong menyertakan reset.
- Keranjang menggabungkan produk berdasar ID. Jumlah harus integer 1–99. Total = harga satuan × jumlah.
- Perubahan keranjang atau kontak setelah ringkasan harus membatalkan pemeriksaan sebelumnya.
- Render data dinamis melalui DOM API dan `textContent`; jangan memasukkan input ke `innerHTML`.
- localStorage hanya menyimpan versi skema, ID produk, dan jumlah. Tangani JSON rusak atau storage ditolak tanpa menghentikan katalog.
- Nama dan nomor pemesan tidak boleh masuk localStorage atau log. Informasikan bahwa data akan dimasukkan ke draf WhatsApp.
- Membuka WhatsApp bukan transaksi berhasil. Pengguna menekan kirim sendiri; toko mengonfirmasi harga, stok, keaslian, garansi, dan ketentuan secara manual.

## 4. Menjalankan dan menguji
Jalankan server lokal dari root:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Buka `http://127.0.0.1:5500`; ES modules tidak didukung melalui `file://`.

Jalankan pengujian fungsi:

```bash
npm test
```

Jalankan pemeriksaan sintaks bila Node.js tersedia:

```bash
node --check js/data.js
node --check js/cart.js
node --check js/storage.js
node --check js/checkout.js
node --check js/app.js
```

## 5. Kriteria penerimaan
| Skenario | Hasil yang diharapkan |
|---|---|
| Buka katalog | Dua puluh produk dari empat kategori tampil dengan seluruh gambar lokal yang berhasil dimuat |
| Cari dan filter | Keduanya aktif bersamaan; kondisi kosong menawarkan reset |
| Tambah produk yang sama dua kali | Satu baris keranjang dengan jumlah dua |
| Jumlah 0, negatif, desimal, atau 100 | Ditolak; jumlah tersimpan tetap valid |
| Keranjang berisi PS5 Slim Disc dan 2 DualSense | Total contoh Rp9.797.000 |
| Harga katalog berubah | Hitungan keranjang menggunakan harga baru, bukan cache harga |
| Keranjang kosong/kontak tidak valid | Pesanan tidak lolos; kesalahan jelas dan fokus menuju kontrol |
| Reload, JSON rusak, atau storage ditolak | Keranjang valid dipulihkan atau aplikasi tetap berjalan dengan pesan |
| Nama berisi `<`, `&`, kutip | Tampil sebagai teks; draf pesan ter-encode |
| Nomor toko kosong | Tombol WhatsApp tidak aktif |
| Ringkasan dibuka | Daftar produk, jumlah, total, dan kontak ditampilkan |
| Keranjang/kontak berubah setelah ringkasan | Ringkasan lama ditutup dan perlu diperiksa ulang |
| Lebar 320, 360, 768, 1280 px | Tidak ada overflow horizontal; seluruh kontrol dapat dicapai |
| Keyboard tanpa mouse | Tautan lewati konten, navigasi, katalog, keranjang, dan FAQ dapat digunakan |

## 6. Paket statis dan kesiapan publikasi
Jalankan `npm run package` untuk membuat `artifacts/tiberius-store.zip`. Periksa tampilan serta alur pada browser sebelum publikasi. Ganti seluruh harga contoh, konfirmasi spesifikasi/keaslian/garansi dan stok, masukkan nomor resmi, lalu uji ulang tautan WhatsApp. Website belum memproses pembayaran atau menyimpan pesanan; jangan menyebut pesanan terkonfirmasi.
