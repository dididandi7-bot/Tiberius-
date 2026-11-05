export const CATEGORIES = Object.freeze([
  { id: 'all', name: 'Semua produk' },
  { id: 'console', name: 'Konsol PS5' },
  { id: 'controller', name: 'Controller' },
  { id: 'tv', name: 'TV Gaming' },
  { id: 'game', name: 'Game' },
]);

// Nama, visual, dan harga adalah contoh katalog; verifikasi dengan inventaris toko.
export const PRODUCTS = Object.freeze([
  { id: 'ps5-slim-disc', name: 'PlayStation 5 Slim Disc', category: 'console', description: 'Konsol generasi terbaru dengan pilihan game fisik dan digital.', specification: 'Disc Edition · 1TB', price: 7799000, image: 'image/PlayStation 5 Slim Disc.jpg', imageAlt: 'Konsol PlayStation 5 Slim Disc dan DualSense', tag: 'Pilihan gamer' },
  { id: 'ps5-slim-digital', name: 'PlayStation 5 Slim Digital', category: 'console', description: 'Desain ringkas untuk koleksi game digital favoritmu.', specification: 'Digital Edition · 1TB', price: 6899000, image: 'image/sony_playstation_5_slim_digital_825_gb_white_new_02_1.webp', imageAlt: 'Konsol PlayStation 5 Slim Digital Edition', tag: 'Digital edition' },
  { id: 'dualsense', name: 'DualSense Wireless Controller', category: 'controller', description: 'Rasakan detail permainan dengan kontroler nirkabel.', specification: 'Wireless · Haptic feedback', price: 999000, image: 'image/DualSense Wireless Controller.jpg', imageAlt: 'Controller nirkabel DualSense putih dan hitam', tag: 'Controller' },
  { id: 'dualsense-edge', name: 'DualSense Edge', category: 'controller', description: 'Controller performa tinggi dengan kontrol yang dapat diatur.', specification: 'Wireless · Pro controller', price: 3199000, image: 'image/dualsense-edge-listing-thumb-01-en-23aug22.webp', imageAlt: 'Controller DualSense Edge', tag: 'Pro gear' },
  { id: 'gaming-tv-55', name: 'Gaming TV 4K 55″', category: 'tv', description: 'Layar lebar untuk menikmati visual game di ruang bermain.', specification: '55 inch · 4K UHD', price: 8999000, image: 'image/tv-gaming-4-845x442.jpg', imageAlt: 'Televisi gaming layar lebar menampilkan pemandangan gunung', tag: 'Big screen' },
  { id: 'warhammer-40k', name: 'Warhammer 40,000: Space Marine 2', category: 'game', description: 'Hadapi pertempuran epik dalam semesta Warhammer 40,000.', specification: 'PS5 · Disc · Action', price: 1099000, image: 'image/Warhammer 40,000 Space Marine 2.jpg', imageAlt: 'Sampul game Warhammer 40,000 Space Marine 2 untuk PS5', tag: 'Game PS5' },
  { id: 'warhammer-40k-digital', name: 'Warhammer 40,000: Space Marine 2 (Digital)', category: 'game', description: 'Versi digital game aksi dalam semesta Warhammer 40,000.', specification: 'PS5 · Digital · Action', price: 999000, image: 'image/Warhammer 40,000 Space Marine 2 - Copy.jpg', imageAlt: 'Gambar versi digital game Warhammer 40,000 Space Marine 2', tag: 'Digital' },
  { id: 'red-dead-2', name: 'Red Dead Redemption 2', category: 'game', description: 'Jelajahi dunia terbuka dalam kisah petualangan epik.', specification: 'PS4 · Disc · Open world', price: 599000, image: 'image/Red Dead Redemption 2.jpg', imageAlt: 'Sampul game Red Dead Redemption 2', tag: 'Fan favorite' },
  { id: 'god-of-war-ragnarok', name: 'God of War Ragnarök', category: 'game', description: 'Ikuti perjalanan Kratos dan Atreus menghadapi takdir.', specification: 'PS5 · Disc · Action adventure', price: 899000, image: 'image/sony_ps5_god_of_war_ragnarok_full01_p14ain54.webp', imageAlt: 'Sampul game God of War Ragnarök untuk PS5', tag: 'Game PS5' },
  { id: 'spider-man-2', name: 'Marvel’s Spider-Man 2', category: 'game', description: 'Berayun melintasi New York dalam petualangan dua Spider-Man.', specification: 'PS5 · Disc · Action adventure', price: 999000, image: 'image/Marvel’s Spider-Man 2.webp', imageAlt: 'Sampul game Marvel’s Spider-Man 2 untuk PS5', tag: 'Game PS5' },
  { id: 'battlefield-6', name: 'Battlefield 6', category: 'game', description: 'Aksi shooter modern dalam pertempuran berskala besar.', specification: 'PS5 · Disc · Action shooter', price: 1099000, image: 'image/Battlefield 6.webp', imageAlt: 'Sampul game Battlefield 6 untuk PS5', tag: 'Game PS5' },
  { id: 'call-of-duty-modern-warfare-iv', name: 'Call of Duty: Modern Warfare IV', category: 'game', description: 'Aksi shooter Call of Duty dalam seri Modern Warfare.', specification: 'PS5 · Disc · Action shooter', price: 1099000, image: 'image/Call Of Duty Modern Warfare 4.jpg', imageAlt: 'Sampul game Call of Duty Modern Warfare untuk PS5', tag: 'Game PS5' },
  { id: 'death-stranding-2', name: 'Death Stranding 2: On the Beach', category: 'game', description: 'Lanjutkan perjalanan lintas dunia dalam petualangan sinematik.', specification: 'PS5 · Disc · Adventure', price: 1199000, image: 'image/Death Stranding 2.webp', imageAlt: 'Sampul game Death Stranding 2 On the Beach untuk PS5', tag: 'Game PS5' },
  { id: 'ea-sports-fc-27', name: 'EA Sports FC 27', category: 'game', description: 'Bawa pertandingan sepak bola ke setup gaming-mu.', specification: 'PS5 · Disc · Sports', price: 1099000, image: 'image/FC27.jpg', imageAlt: 'Sampul game EA Sports FC 27 untuk PS5', tag: 'Game PS5' },
  { id: 'helldivers-2', name: 'Helldivers 2', category: 'game', description: 'Bekerja sama menghadapi ancaman dalam misi galaksi.', specification: 'PS5 · Disc · Co-op shooter', price: 699000, image: 'image/Helldivers™ 2.jpg', imageAlt: 'Sampul game Helldivers 2 untuk PS5', tag: 'Co-op' },
  { id: 'marvel-wolverine', name: 'Marvel’s Wolverine', category: 'game', description: 'Petualangan aksi Wolverine dalam dunia Marvel.', specification: 'PS5 · Disc · Action adventure', price: 1199000, image: 'image/Marvel\'s Wolverine.webp', imageAlt: 'Sampul game Marvel’s Wolverine untuk PS5', tag: 'Game PS5' },
  { id: 'tekken-8', name: 'Tekken 8', category: 'game', description: 'Pertarungan intens dalam seri fighting Tekken.', specification: 'PS5 · Disc · Fighting', price: 799000, image: 'image/Tekken8.webp', imageAlt: 'Sampul game Tekken 8 untuk PS5', tag: 'Fighting' },
  { id: 'ufc-5', name: 'UFC 5', category: 'game', description: 'Masuki arena dan bertanding dalam game olahraga UFC.', specification: 'PS5 · Disc · Sports fighting', price: 699000, image: 'image/UFC 5.jpg', imageAlt: 'Sampul game EA Sports UFC 5 untuk PS5', tag: 'Sports' },
  { id: 'lego-party', name: 'LEGO Party!', category: 'game', description: 'Pesta permainan LEGO yang seru dimainkan bersama.', specification: 'PS5 · Disc · Party game', price: 699000, image: 'image/no_brand_ps5_lego_party_-_ps5_lego_party_full01_o9nnchd3.webp', imageAlt: 'Sampul game LEGO Party! untuk PS5', tag: 'Party game' },
  { id: 'lego-horizon-adventures', name: 'LEGO Horizon Adventures', category: 'game', description: 'Jelajahi petualangan Horizon dalam dunia LEGO.', specification: 'PS5 · Disc · Adventure', price: 699000, image: 'image/sony_ps5_lego_horizon_adventures_-_adventure_full01_vpi2c91a.webp', imageAlt: 'Sampul game LEGO Horizon Adventures untuk PS5', tag: 'Game PS5' },
]);

export const findProduct = (id) => PRODUCTS.find((product) => product.id === id);
export const filterProducts = (query, category) => {
  const keyword = query.trim().toLocaleLowerCase('id-ID');
  return PRODUCTS.filter((product) =>
    (category === 'all' || product.category === category) &&
    `${product.name} ${product.description} ${product.specification}`.toLocaleLowerCase('id-ID').includes(keyword));
};
