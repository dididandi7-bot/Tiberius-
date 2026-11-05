# Panduan UI/UX — Tiberius Store

## 1. Arah desain
Identitas gaming modern dengan latar charcoal, aksen lime, tipografi tegas, bentuk geometris, dan komponen kontras tinggi. Nada antarmuka percaya diri namun tidak membuat klaim stok atau transaksi. Seluruh tampilan memakai font sistem dan ilustrasi CSS/teks lokal; tidak bergantung pada CDN.

## 2. Susunan halaman
Header dan navigasi → hero editorial → bar kategori → katalog pencarian/filter → keranjang dan checkout → keunggulan → FAQ → kontak dan footer.

Desktop menggunakan katalog dengan keranjang di samping. Layar kecil menyusun satu kolom; navigasi ringkas, kartu produk 2 kolom hingga 350 px, dan 1 kolom pada viewport yang sangat sempit.

## 3. Alur
| Tahap | Respons antarmuka |
|---|---|
| Menjelajah | Hero singkat dan CTA menuju katalog |
| Menemukan | Search, filter kategori, harga, deskripsi produk |
| Menyusun | Tambah/kurangi/hapus jumlah produk |
| Menghitung | Total rupiah diperbarui sesuai harga katalog |
| Memeriksa | Form kontak dan ringkasan daftar/total |
| Bertanya/memesan | Draf WhatsApp, hanya setelah toko mengatur nomor resmi |

## 4. Komponen dan keadaan
- Navigasi anchor, skip link, fokus terlihat, tombol keranjang dengan jumlah.
- Kartu produk menampilkan kategori, nama, spesifikasi, harga contoh, dan tombol tambah.
- Search dan kategori aktif secara bersamaan; hasil kosong menyediakan reset.
- Kontrol kuantitas native 1–99, tombol hapus, total harga.
- Form nama (2–80 karakter) dan nomor WhatsApp (8–15 digit; awalan lokal 08 atau internasional 62).
- Ringkasan menampilkan kontak, produk, jumlah, dan total. Perubahan data mengharuskan pemeriksaan ulang.
- Keranjang kosong, peringatan harga contoh, gagal storage, dan nomor toko belum tersedia memiliki penjelasan.
- FAQ menggunakan `details`/`summary`.

## 5. Microcopy
- “Katalog dan harga merupakan contoh tampilan. Konfirmasi harga, keaslian produk, dan ketersediaan kepada toko sebelum pemesanan.”
- “Keranjangmu masih kosong. Tambahkan produk untuk mulai belanja.”
- “Harga dan stok dapat berubah. Toko akan mengonfirmasi rincian sebelum transaksi.”
- “Pesan ini belum merupakan transaksi.”

## 6. Aksesibilitas
Gunakan struktur HTML semantik, `lang="id"`, satu h1, label terlihat, status `aria-live`, fokus keyboard yang kontras, dan target sentuh minimal sekitar 44 px. Informasi tidak hanya dibedakan oleh warna. Hormati `prefers-reduced-motion`, dukung zoom/reflow, dan uji kontras/fokus di browser sebelum mengklaim kepatuhan WCAG formal.
