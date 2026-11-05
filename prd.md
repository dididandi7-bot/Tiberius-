# Product Requirement Document — Tiberius Store

## 1. Ringkasan
Tiberius Store adalah katalog responsif produk gaming untuk membantu gamer menemukan perangkat dan menyusun pertanyaan/pesanan. Katalog mencakup PS5, controller, TV gaming, dan game original. Implementasi saat ini adalah prototipe statis, bukan toko dengan transaksi otomatis.

## 2. Pengguna dan kebutuhan
- Gamer pemula yang ingin memahami pilihan perangkat dan harga.
- Gamer enthusiast yang ingin membandingkan konsol, controller, TV, dan game.
- Pengelola UMKM yang membutuhkan katalog sederhana dan ringkasan pesanan untuk ditindaklanjuti manual.

## 3. Cakupan MVP
1. Beranda dengan identitas, manfaat, CTA menuju katalog, dan penjelasan pemesanan.
2. Katalog 20 produk pada 4 kategori, menggunakan setiap berkas gambar pada folder `image/`, termasuk satu entri digital Warhammer dari gambar yang bernama `- Copy`.
3. Pencarian produk dan filter kategori yang aktif bersamaan.
4. Keranjang dengan tambah, hapus, ubah jumlah 1–99, dan total rupiah.
5. Penyimpanan keranjang aman melalui localStorage.
6. Formulir nama dan nomor WhatsApp, tinjauan pesanan, dan draf pesan WhatsApp.
7. FAQ tentang harga, stok, keaslian produk, dan status pesanan.
8. Responsif, navigasi keyboard, pesan status, dan keadaan kosong/error.

## 4. Di luar cakupan
Akun, stok real-time, admin, database, pembayaran, pengiriman, sistem garansi, reservasi terjamin, dan riwayat transaksi. Pengelola memperbarui katalog pada `js/data.js`.

## 5. Aturan bisnis dan data
- Mata uang IDR; harga adalah integer rupiah pada data katalog.
- Total = jumlah harga × kuantitas. Gunakan harga katalog saat ini.
- Maksimum 99 unit per baris sebagai batas teknis, bukan stok.
- Harga katalog saat ini hanya contoh. Konfirmasi harga, keaslian, kondisi, garansi, kelengkapan, dan ketersediaan dengan toko.
- Pengajuan WhatsApp menyiapkan teks, tidak mengirim pesan. Pengguna perlu menekan kirim.
- Pengajuan bukan transaksi sampai toko membalas dan menyepakati pesanan secara manual.
- Nomor WhatsApp usaha kosong sampai toko memberikan nomor resmi. Tidak ada nomor contoh sebagai penerima aktif.
- Nama dan nomor pemesan tidak disimpan; keranjang saja yang disimpan di browser.

## 6. Alur utama
Buka halaman → cari/filter katalog → tambahkan produk → atur jumlah → isi kontak → tinjau total dan rincian → (jika nomor resmi telah diatur) buka draf WhatsApp → kirim sendiri → tunggu konfirmasi toko.

## 7. Kriteria penerimaan
- Dua puluh produk memakai semua gambar dari folder `image/` dan empat kategori tersedia.
- Search dan kategori digabungkan; hasil kosong menyediakan reset.
- Produk ber-ID sama memiliki satu baris keranjang.
- Jumlah invalid ditolak; perhitungan memakai harga katalog terbaru.
- Contoh satu PS5 Slim Disc + dua DualSense menghasilkan total Rp9.797.000.
- Ringkasan memuat nama, kontak, produk, jumlah, dan total.
- Nomor usaha kosong menonaktifkan tombol WhatsApp.
- Keranjang valid dapat dipulihkan; JSON/storage error tidak merusak katalog.
- Data dinamis aman ditampilkan sebagai teks.
- Tidak ada scroll horizontal pada lebar 320 px; kontrol dapat dioperasikan dengan keyboard.

## 8. Kesiapan rilis
Sebelum rilis, ganti semua data harga contoh dan konfirmasi seluruh detail produk serta kontak resmi. Uji ulang katalog, tampilan mobile, aksesibilitas, dan draf WhatsApp di browser. Jangan menyatakan stok, pembayaran, atau reservasi aktif karena fitur tersebut tidak tersedia.
