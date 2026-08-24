# Pegadaian Mikro & Emas Leads Tracker — Versi Live (Supabase)

Project ini adalah versi "hidup" dari aplikasi Leads Tracker, terhubung ke
database Supabase sungguhan sehingga bisa diakses oleh seluruh tim dari
mana saja, bukan hanya di dalam chat Claude.

## Langkah 1 — Buat project Supabase
1. Daftar/login di https://supabase.com
2. Klik "New project", beri nama bebas, pilih region **Singapore** (paling
   dekat & cepat), buat password database (simpan baik-baik).
3. Setelah project selesai dibuat, buka menu **Settings > API**.
   Catat dua nilai ini:
   - **Project URL**
   - **anon public key**

## Langkah 2 — Buat tabel database
1. Di Supabase, buka menu **SQL Editor > New query**.
2. Salin seluruh isi file `supabase/schema.sql`, tempel, lalu klik **Run**.
3. Tabel `leads` akan otomatis terbuat.

## Langkah 3 — Import 459 data leads yang sudah ada
1. Buka menu **Table Editor**, pilih tabel `leads`.
2. Klik tombol **Insert > Import data from CSV**.
3. Unggah file `supabase/seed_leads.csv`.
4. Pastikan pemetaan kolom otomatis sudah sesuai nama kolomnya, lalu import.

## Langkah 4 — Konfigurasi project
1. Salin file `.env.example` menjadi `.env`
2. Isi dengan Project URL & anon key dari Langkah 1:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxx
   ```

## Langkah 5 — Coba jalankan di komputer (opsional tapi disarankan)
Perlu Node.js sudah terpasang (https://nodejs.org), lalu jalankan di terminal:
```
npm install
npm run dev
```
Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

## Langkah 6 — Deploy ke Vercel (gratis, dapat link publik)
1. Unggah folder project ini ke GitHub (buat repo baru, drag & drop foldernya
   lewat github.com kalau belum familiar dengan Git).
2. Buka https://vercel.com, daftar/login dengan akun GitHub.
3. Klik **Add New > Project**, pilih repo yang baru diunggah.
4. Di bagian **Environment Variables**, tambahkan dua variabel yang sama
   seperti isi file `.env` (VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY).
5. Klik **Deploy**. Setelah selesai (~1-2 menit), Anda dapat link publik
   yang bisa dibuka & dipakai seluruh tim dari HP maupun komputer.

## Catatan keamanan
Saat ini siapa pun yang punya link bisa membuka & mengisi data (tidak ada
sistem login). Password Dashboard Admin di kode aplikasi hanya penghalang
tampilan, bukan keamanan sungguhan. Kalau nanti perlu login per pemasar dan
hak akses berlapis, itu perlu ditambahkan lewat Supabase Auth — tinggal
bilang kalau mau dibantu langkah berikutnya.
