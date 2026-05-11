# MainkoBukittinggi.id — CLAUDE.md

> Konteks proyek ini untuk Claude Code. Baca seluruh dokumen sebelum menulis satu baris kode pun.

---

## Identitas Proyek

**Nama website:** MainkoBukittinggi.id  
**Tagline:** Kota Dua Waktu  
**Konsep:** Digital playground berbasis budaya Bukittinggi, Sumatera Barat. Bukan portal informasi biasa — pengunjung _merasakan, memainkan, dan berinteraksi_ dengan Bukittinggi. Setiap halaman adalah satu cara baru untuk mengenal kota ini.  
**Kompetisi:** Nusantara Digital City oleh Media Cloud Indonesia  
**Deadline submisi:** 20 Juli 2026

---

## Tech Stack

| Layer             | Pilihan                       | Alasan                                              |
| ----------------- | ----------------------------- | --------------------------------------------------- |
| Framework         | Next.js 14 (App Router)       | SSG + SSR hybrid, React-familiar, SEO               |
| Styling           | Tailwind CSS                  | Rapid development, konsisten                        |
| Animation         | Framer Motion                 | Scroll-driven animation, spring physics             |
| 2D Game           | Phaser.js                     | Mature, browser-native, TypeScript support          |
| Audio             | Tone.js                       | Presisi timing, sampler, transport                  |
| Peta              | Leaflet.js + react-leaflet    | Lightweight, open source, custom overlay            |
| AI                | Gemini API (gemini-2.0-flash) | Free tier generous, capable untuk semua AI features |
| Image compare     | react-compare-slider          | Then & Now photo slider                             |
| Card export       | html2canvas                   | Shareable card generator                            |
| Generative visual | p5.js atau Three.js           | Ngarai Living Canvas hero                           |
| Deploy            | Vercel                        | Free tier, CI/CD otomatis dari GitHub               |
| Domain            | .id custom                    | Requirement kompetisi                               |

---

## Struktur Halaman

### 1. 🏙️ Beranda — "Kota Dua Waktu"

**Route:** `/`  
**Konsep:** Scroll ke bawah = waktu mundur ke masa lalu Bukittinggi.

**Komponen kunci:**

- `<NgaraiCanvas />` — hero section generatif p5.js/Three.js. Langit berubah sesuai jam WIB nyata: 06.00 kabut pagi, 12.00 cerah, 18.00 sunset, 22.00 bintang
- `<JamGadangClock />` — ilustrasi SVG Jam Gadang di navbar/hero. Jarum jam bergerak mengikuti scroll position (semakin scroll ke bawah, jarum berputar mundur). Jarum real-time saat user tidak scroll
- `<ThenNowSlider />` — komponen react-compare-slider menampilkan foto lokasi yang sama di era 1930-an vs hari ini
- Timeline scroll: `opacity` dan `transform` tiap section dikontrol Framer Motion `useScroll` + `useTransform`
- CTA di bagian bawah: tombol masuk ke Kampuang

**Urutan section saat scroll:**

1. Hero: Bukittinggi hari ini (Ngarai Canvas)
2. Transisi: kabut masuk, warna memudar ke sepia
3. Era 1970-an: foto & cerita kota
4. Era kemerdekaan 1945
5. Era kolonial 1920-an: Fort de Kock, arsitektur Belanda
6. CTA: "Jelajahi Kampuang" → masuk ke halaman 2

---

### 2. 🗺️ Kampuang — 2D Exploration World

**Route:** `/kampuang`  
**Konsep:** Dunia top-down 2D berbasis Phaser.js. Navigasi utama seluruh website. Pengunjung mengontrol karakter dan berinteraksi dengan dunia.

**Mekanik game:**

- Kontrol: WASD atau arrow keys
- Collision detection dengan objek dan bangunan
- Proximity trigger: saat karakter mendekati objek dalam radius N pixel → popup info muncul
- Interact key: `E` atau `Space` untuk membaca info / masuk pintu

**Isi dunia Kampuang:**

- 🏛️ Rumah Gadang → popup: sistem matrilineal Minang
- 🕐 Jam Gadang kecil → popup: fakta unik (angka IIII bukan IV)
- 🎭 Panggung Randai → popup: seni pertunjukan Minang
- 🧵 Rumah Tenun → popup: songket & pandai sikek
- 🌳 Pohon Beringin → easter egg: Minang Time Capsule
- **Pintu Portal ke halaman lain:**
  - 🎵 Pintu Studio → `/studio`
  - 🍛 Pintu Dapur → `/dapur`
  - 💬 Pintu Curhat → `/curhat`
  - 📍 Pintu Peta → `/peta`
  - 🏠 Rumah Pulang → `/` (kembali ke Beranda)

**NPC Mak Itam:**

- Karakter AI guide yang bisa diajak bicara
- Punya kepribadian: hangat, humoris, campuran Bahasa Indonesia + dialek Minang
- Context-aware: tahu karakter sedang di dekat objek apa
- Implementasi: Gemini API dengan system prompt karakter Mak Itam

**Urang Awak Passport:**

- Sistem stempel digital — setiap area/objek yang dikunjungi memberikan stempel unik
- Disimpan di localStorage
- Semua stempel terkumpul → unlock sertifikat "Urang Awak Honorary" yang bisa didownload

**Tech detail:**

- Gunakan Tiled Map Editor untuk desain map, export ke JSON
- Tileset: pixel art bergaya Minang (bisa gunakan asset gratis dari itch.io)
- Phaser.js di-embed dalam Next.js menggunakan dynamic import (no SSR): `dynamic(() => import('../components/PhaserGame'), { ssr: false })`
- Game canvas mengisi full viewport

---

### 3. 🎵 Studio — Virtual Instrument

**Route:** `/studio`

**Flow:**

1. User pilih alat musik: Talempong / Saluang / Gandang
2. Tampil UI keyboard virtual + info singkat alat musik
3. Tekan keyboard → bunyi keluar

**Mekanik audio:**

- Key mapping ke skala pentatonik Minang (bukan mayor biasa) — ini yang membuat apapun dimainkan terdengar "Minang"
- Tone.js Sampler dengan audio sample asli (.ogg format untuk efisiensi)
- Visualizer waveform real-time menggunakan Web Audio API AnalyserNode

**Dendang Generator (fitur tambahan):**

- Tombol Rekam → catat timestamp setiap not selama 4-8 detik
- Tombol Play Loop → Tone.js Transport loop presisi
- Tombol Tambah Iringan → pilih pattern iringan pre-composed (gondang/saluang) yang cocok
- Tombol Download → MediaRecorder API export ke .wav

**Sumber audio sample:**

- Prioritas: freesound.org dengan lisensi CC0
- Fallback: synthesize dengan Tone.js oscillator (metalik untuk talempong)
- Format: .ogg dengan fallback .mp3

**Key mapping default (Talempong):**

```
A S D F G H J K
Do Re Mi Fa Sol La Si Do²
```

---

### 4. 🍛 Dapur — Kuliner Minang

**Route:** `/dapur`

**Dua fitur utama:**

**A. Ensiklopedia Kuliner (10-15 item)**
Setiap kuliner punya halaman detail di `/dapur/[slug]` dengan:

- Hero photo
- Deskripsi rasa
- Sejarah & asal-usul
- Resep lengkap (bahan + cara membuat)
- Di mana menemukannya di Bukittinggi (link ke Peta)

Konten disimpan sebagai MDX files di `/content/kuliner/`.

Daftar kuliner yang dikurasi (10-15):
Rendang, Sate Padang, Dendeng Batokok, Gulai Itiak, Nasi Kapau, Soto Padang, Teh Talua, Kue Putu Piring, Kerupuk Sanjai, Lamang Tapai, Sala Lauak, Pinyaram, Bareh Rendang, Bubur Kampiun, Katupek Gulai Paku

**B. Sumbar-ify AI (Make Your Own Dish)**

- Input: teks bebas bahan-bahan yang dimiliki user
- Filter opsional: level kepedasan (1-5), jenis acara (sehari-hari / kenduri / sarapan)
- Output: resep lengkap ala Minang dari Gemini API
- Implementasi: POST ke `/api/sumbarify` → Gemini API call

**System prompt Sumbar-ify:**

```
Kamu adalah juru masak Minangkabau yang berpengalaman. Berdasarkan bahan-bahan yang diberikan,
buatkan resep masakan yang di-"Sumbar-ify" — artinya gunakan teknik, bumbu, dan filosofi
memasak Minangkabau. Sertakan: nama masakan (yang kreatif), bahan tambahan yang direkomendasikan,
langkah memasak, dan cerita singkat mengapa masakan ini "ala Minang".
Jawab dalam Bahasa Indonesia. Format: JSON.
```

---

### 5. 💬 Curhat — Petatah-Petitih AI

**Route:** `/curhat`

**Flow:**

1. User ketik situasi/curhat di textarea
2. Pilih kategori opsional: Karir, Hubungan, Keluarga, Merantau, Overthinking, Pendidikan
3. Klik "Tanya ke Mamak AI"
4. Muncul: pepatah Minang + terjemahan + penjelasan kontekstual
5. Tombol: Pepatah Lain / Buat Kartu / Bagikan

**System prompt Mamak AI:**

```
Kamu adalah seorang "mamak" (paman dari pihak ibu dalam adat Minangkabau) yang bijaksana dan humoris.
Kamu menguasai ratusan petatah-petitih Minangkabau beserta maknanya yang dalam.
Gaya bicaramu: hangat, sedikit jenaka, selalu relevan dengan kehidupan modern.
Jawab HANYA dalam format JSON:
{
  "pepatah": "<pepatah asli dalam Bahasa Minang>",
  "terjemahan": "<terjemahan literal Indonesia>",
  "penjelasan": "<150-200 kata, hubungkan ke situasi user secara personal>",
  "kategori": "<karir|hubungan|keluarga|merantau|overthinking|pendidikan>"
}
Gunakan pepatah yang AUTENTIK dari tradisi Minangkabau, jangan mengarang.
```

**Shareable card:**

- Gunakan html2canvas untuk convert div card ke PNG
- Design card: dark background dengan ornamen Minang, pepatah, terjemahan, URL website
- Web Share API untuk share langsung ke WhatsApp/Instagram

---

### 6. 📍 Peta — Bukittinggi Interaktif

**Route:** `/peta`

**Fitur:**

- Leaflet.js centered di koordinat Bukittinggi (-0.3059, 100.3691)
- Custom marker icons per kategori (Sejarah, Kuliner, Wisata, Modern)
- Klik marker → popup dengan nama, foto thumbnail, deskripsi singkat, tombol "Lihat Detail"
- Filter toggle per kategori
- Ghost City mode: overlay peta historis Bukittinggi 1920-an (sebagai image overlay Leaflet)

**Data lokasi** disimpan di `/data/locations.json`:

```json
{
	"id": "jam-gadang",
	"name": "Jam Gadang",
	"category": "sejarah",
	"lat": -0.3047,
	"lng": 100.3693,
	"description": "...",
	"image": "/images/locations/jam-gadang.jpg",
	"detailLink": "/kampuang"
}
```

---

## Arsitektur File

```
mainkobukittinggi/
├── app/
│   ├── page.tsx                    # Beranda
│   ├── kampuang/page.tsx           # 2D World
│   ├── studio/page.tsx             # Virtual Instrument
│   ├── dapur/
│   │   ├── page.tsx                # Kuliner list
│   │   └── [slug]/page.tsx         # Detail kuliner
│   ├── curhat/page.tsx             # Petatah-Petitih
│   ├── peta/page.tsx               # Peta interaktif
│   └── api/
│       ├── sumbarify/route.ts      # Gemini API - resep
│       └── curhat/route.ts         # Gemini API - pepatah
├── components/
│   ├── beranda/
│   │   ├── NgaraiCanvas.tsx        # Generative hero
│   │   ├── JamGadangClock.tsx      # Scroll-driven jam
│   │   └── ThenNowSlider.tsx       # Photo comparison
│   ├── kampuang/
│   │   ├── PhaserGame.tsx          # Phaser wrapper (no SSR)
│   │   └── MakItamChat.tsx         # NPC AI dialogue
│   ├── studio/
│   │   ├── InstrumentSelector.tsx
│   │   ├── KeyboardUI.tsx
│   │   └── Waveform.tsx
│   ├── dapur/
│   │   ├── KulinerGrid.tsx
│   │   ├── KulinerCard.tsx
│   │   └── SumbarifyForm.tsx
│   ├── curhat/
│   │   ├── CurhatForm.tsx
│   │   └── PetatahCard.tsx         # Shareable card
│   └── peta/
│       └── BukittinggiMap.tsx
├── content/
│   └── kuliner/                    # MDX files per kuliner
├── data/
│   ├── locations.json              # Koordinat peta
│   ├── petatah.json                # Koleksi pepatah autentik
│   └── instruments.json            # Config alat musik
├── public/
│   ├── audio/                      # Sample .ogg alat musik
│   ├── images/
│   │   ├── then-now/               # Foto historis vs modern
│   │   ├── kuliner/                # Food photography
│   │   └── locations/              # Foto landmark
│   └── game/                       # Tiled map + tileset assets
└── CLAUDE.md                       # File ini
```

---

## API Routes

### POST `/api/sumbarify`

```typescript
// Request
{ ingredients: string, spiceLevel?: number, occasion?: string }
// Response
{ name: string, additionalIngredients: string[], steps: string[], story: string }
```

### POST `/api/curhat`

```typescript
// Request
{ situation: string, category?: string }
// Response
{ pepatah: string, terjemahan: string, penjelasan: string, kategori: string }
```

---

## Keputusan Desain Penting

1. **Phaser.js di Next.js** → SELALU gunakan `dynamic import` dengan `{ ssr: false }`. Phaser mengakses `window` object, akan error jika di-render server-side.

2. **Skala pentatonik Minang** → Bukan skala mayor barat. Not: Do - Re - Mi - Sol - La (tidak ada Fa dan Si). Ini yang membuat musik terdengar autentik Minang.

3. **Gemini API calls** → SEMUA request ke Gemini API dilakukan dari server-side route (`/api/...`), BUKAN dari client-side langsung. Ini untuk keamanan API key.

4. **Konten kuliner** → Simpan sebagai MDX di `/content/kuliner/` agar mudah diedit tanpa menyentuh kode. Gunakan next-mdx-remote untuk render.

5. **Leaflet.js di Next.js** → Sama seperti Phaser, gunakan dynamic import dengan `{ ssr: false }` untuk komponen peta.

6. **Audio files** → Gunakan format .ogg sebagai primary, .mp3 sebagai fallback. Simpan di `/public/audio/`. Preload saat komponen Studio mount.

7. **localStorage untuk Passport** → Urang Awak Passport state disimpan di localStorage. Key: `urang-awak-passport`. Cek availability sebelum akses.

---

## Urutan Prioritas Pengerjaan (MoSCoW)

### Must Have (untuk submisi)

- [ ] Beranda dengan scroll animation + Jam Gadang clock
- [ ] Kampuang: Phaser world dengan minimal 5 objek interaktif + 4 pintu portal
- [ ] Studio: minimal 1 alat musik (Talempong) playable
- [ ] Dapur: list kuliner + minimal 5 detail halaman + Sumbar-ify AI
- [ ] Curhat: Petatah-Petitih AI + shareable card
- [ ] Peta: Leaflet dengan minimal 10 pin lokasi

### Should Have

- [ ] Ngarai Living Canvas (generative hero)
- [ ] Then & Now photo slider
- [ ] Dendang Generator (rekam + loop)
- [ ] Ghost City overlay di Peta
- [ ] NPC Mak Itam di Kampuang
- [ ] Urang Awak Passport

### Could Have

- [ ] Download audio dari Studio
- [ ] Multiplayer Dendang Basamo (WebSocket)
- [ ] Voice interaction (Web Speech API)
- [ ] Tenun Generator

### Won't Have (untuk kompetisi ini)

- [ ] User authentication / login
- [ ] Database (semua konten static/MDX)
- [ ] CMS admin panel

---

## Catatan Konten

- **Bahasa:** Bilingual Indonesia + sedikit Bahasa Minang dengan tooltip terjemahan
- **Tone:** Hangat, bangga, tidak menggurui. Nuansa "diajak kenalan dengan kota" bukan "diceramahi sejarah"
- **Foto:** Butuh foto berkualitas tinggi untuk: kuliner (hero shots), landmark (then & now pairs), karakter game
- **Audio:** Cari talempong samples di freesound.org search: "talempong" "minang" "west sumatra gamelan"
- **Petatah-petitih:** Kumpulkan 50-100 pepatah autentik sebagai dataset untuk Gemini API

---

## Environment Variables

```env
# Gemini API — daftar gratis di https://aistudio.google.com/apikey
GEMINI_API_KEY=              # JANGAN commit ke repo, masukkan ke .env.local

NEXT_PUBLIC_MAP_CENTER_LAT=-0.3059
NEXT_PUBLIC_MAP_CENTER_LNG=100.3691
```

## Cara Integrasi Gemini API

Install SDK:

```bash
npm install @google/generative-ai
```

Contoh penggunaan di server-side route (`/app/api/curhat/route.ts`):

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash",
	systemInstruction: "System prompt di sini...",
});

export async function POST(req: Request) {
	const { situation, category } = await req.json();
	const result = await model.generateContent(situation);
	const text = result.response.text();
	return Response.json(JSON.parse(text));
}
```

**Free tier Gemini 2.0 Flash (per Mei 2026):**

- 1.000.000 token per menit
- 1.500 request per hari
- Cukup untuk traffic kompetisi — praktis gratis
