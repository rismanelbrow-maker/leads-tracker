-- Tabel referensi nasabah inaktif (data historis, hanya dibaca oleh aplikasi).
-- Jalankan di Supabase SQL Editor, lalu import supabase/customers_inactive.csv
-- lewat Table Editor > customers_inactive > Insert > Import data from CSV.
-- Tabel "leads" TIDAK diubah oleh migrasi ini — data ini murni tambahan.

create table if not exists customers_inactive (
  id uuid primary key default gen_random_uuid(),
  cif text,
  nama text not null,
  produk_terakhir text,
  tgl_kredit_terakhir text,
  alamat text,
  telpon text,
  hp text,
  umur text,
  jenis_kelamin text,
  pendidikan text,
  pekerjaan text,
  sumber_dana text,
  nama_perusahaan text,
  agama text,
  kelurahan text,
  kecamatan text,
  kabupaten text,
  provinsi text,
  created_at timestamptz not null default now()
);

alter table customers_inactive enable row level security;

-- Aplikasi hanya perlu membaca data ini (untuk daftar & follow up).
create policy "public_select_customers_inactive" on customers_inactive
  for select using (true);
