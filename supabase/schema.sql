-- Jalankan seluruh isi file ini di Supabase SQL Editor (Project > SQL Editor > New query)

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  tanggal date not null default current_date,
  sumber text not null default 'Nasabah Aktif',
  nama text not null,
  phone text not null,
  produk text not null,
  keterangan text not null default 'Berminat',
  pemasar text not null,
  unit text not null,
  status text not null default 'NEW',
  catatan text default '',
  created_at timestamptz not null default now()
);

-- Row Level Security: aktifkan lalu izinkan akses baca/tulis via anon key.
-- Cocok untuk tim internal kecil tanpa sistem login. Kalau nanti butuh
-- keamanan lebih ketat (login per pemasar), tambahkan Supabase Auth
-- dan ganti policy ini agar hanya user yang login yang bisa insert/update.
alter table leads enable row level security;

create policy "public_select_leads" on leads
  for select using (true);

create policy "public_insert_leads" on leads
  for insert with check (true);

create policy "public_update_leads" on leads
  for update using (true);
