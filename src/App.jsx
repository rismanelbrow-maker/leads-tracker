import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList
} from "recharts";
import {
  Users, TrendingUp, CheckCircle2, Clock, Search, Plus, Download,
  ArrowRight, LayoutDashboard, ClipboardList, AlertCircle, Lock,
  List, Coins, Gem, Trophy, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, History, Layers, MoreVertical, FileText, FileDown, Calculator, Database
} from "lucide-react";
import { supabase } from "./supabaseClient";

// Ganti password admin di sini. Ini hanya penghalang sisi-tampilan (bukan
// keamanan penuh) karena aplikasi ini berjalan sepenuhnya di sisi klien.
const ADMIN_PASSWORD = "pegadaian2026";

const DANANTARA_LOGO = "data:image/png;base64,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";
const PEGADAIAN_LOGO = "data:image/png;base64,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";

const SUMBER_OPTIONS = [
  "Nasabah Baru (Canvasing)", "Nasabah Baru (Literasi/Seminar)", "Referral",
  "Nasabah Aktif", "Nasabah Lunas", "Nasabah Inaktif"
];
const PRODUK_OPTIONS = [
  "ARRUM BPKB", "ARRUM MULTIGUNA", "ARRUM EXPRESS LOAN KUR", "AMANAH",
  "RAHN TASJILY TANAH", "ARRUM HAJI", "ARRUM SAFAR",
  "MULIA SYARIAH ULTIMATE", "MULIA TABUNGAN EMAS", "EMASKU ULTIMATE SYARIAH"
];
const KETERANGAN_OPTIONS = ["Berminat", "Belum Berminat", "Tidak Berminat"];
const UNIT_OPTIONS = ["CPS Daan Mogot", "UPS Sumur Bor", "UPS Citra Niaga", "UPS Semanan", "UPS Poris"];
const STATUS_OPTIONS = ["NEW", "CONTACTED", "SURVEYED", "APPROVED", "REJECTED", "DISBURSED"];
const PAGE_SIZE_OPTIONS = [1, 5, 10, 50, 100];

const STATUS_STYLE = {
  NEW: { bg: "#E6F1FB", text: "#0C447C" },
  CONTACTED: { bg: "#FAEEDA", text: "#854F0B" },
  SURVEYED: { bg: "#EEEDFE", text: "#3C3489" },
  APPROVED: { bg: "#E1F5EE", text: "#085041" },
  REJECTED: { bg: "#FCEBEB", text: "#791F1F" },
  DISBURSED: { bg: "#EAF3DE", text: "#27500A" },
};

function categorize(produk) {
  if (["EMASKU ULTIMATE SYARIAH", "MULIA SYARIAH ULTIMATE", "MULIA TABUNGAN EMAS"].includes(produk)) return "Investasi Emas";
  if (["ARRUM HAJI", "ARRUM SAFAR"].includes(produk)) return "Gadai Angsuran";
  return "Non-Gadai (Mikro)";
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function Field({ label, required, children }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#3d3d3a" }}>
        {label}{required && <span style={{ color: "#A32D2D" }}> *</span>}
      </span>
      <div style={{ marginTop: 4 }}>{children}</div>
    </label>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #D3D1C7",
  fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", background: "#fff", color: "#2C2C2A"
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.NEW;
  return (
    <span style={{ background: s.bg, color: s.text, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999 }}>
      {status}
    </span>
  );
}

function KpiCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 20, borderLeft: `4px solid ${color}`, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</span>
        {icon}
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#0A5C36", margin: "6px 0 2px" }}>{value}</div>
      <div style={{ fontSize: 12, color: "#888780" }}>{sub}</div>
    </div>
  );
}

function NewLeadForm({ onSubmit }) {
  const blank = { sumber: SUMBER_OPTIONS[0], nama: "", phone: "", produk: PRODUK_OPTIONS[0], keterangan: KETERANGAN_OPTIONS[0], pemasar: "", unit: UNIT_OPTIONS[0], catatan: "" };
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.phone.trim() || !form.pemasar.trim()) {
      setError("Mohon isi seluruh kolom wajib (*) sebelum mengirim data.");
      setSuccess(null);
      return;
    }
    setError("");
    const kategori = categorize(form.produk);
    const status = form.keterangan === "Berminat" ? "NEW" : "REJECTED";
    const lead = {
      id: Date.now().toString(),
      tanggal: todayStr(),
      ...form,
      catatan: `${todayStr()}: ${form.catatan.trim() || "Data diinput pertama kali oleh pemasar."}`,
      status,
    };
    onSubmit(lead);
    setSuccess({ nama: form.nama, kategori, status });
    setForm(blank);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <div>
          <Field label="Sumber prospek" required>
            <select style={inputStyle} value={form.sumber} onChange={set("sumber")}>
              {SUMBER_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Nama prospek nasabah" required>
            <input style={inputStyle} value={form.nama} onChange={set("nama")} placeholder="Nama lengkap" />
          </Field>
          <Field label="Nomor HP (WhatsApp)" required>
            <input style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="Contoh: 08123456789" />
          </Field>
          <Field label="Unit kerja" required>
            <select style={inputStyle} value={form.unit} onChange={set("unit")}>
              {UNIT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <div>
          <Field label="Produk yang ditawarkan" required>
            <select style={inputStyle} value={form.produk} onChange={set("produk")}>
              {PRODUK_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Keterangan awal" required>
            <select style={inputStyle} value={form.keterangan} onChange={set("keterangan")}>
              {KETERANGAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Nama pemasar" required>
            <input style={inputStyle} value={form.pemasar} onChange={set("pemasar")} placeholder="Nama Anda (BPO Sales / Frontliner)" />
          </Field>
        </div>
      </div>

      <Field label="Catatan tambahan / hambatan awal">
        <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.catatan} onChange={set("catatan")} placeholder="Tuliskan catatan tindak lanjut awal..." />
      </Field>

      {error && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#A32D2D", fontSize: 13, marginBottom: 12 }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div style={{ background: "#EAF3DE", color: "#27500A", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 12 }}>
          Sukses! Prospek atas nama <strong>{success.nama}</strong> direkam ke kategori <strong>{success.kategori}</strong> dengan status awal <strong>{success.status}</strong>.
        </div>
      )}
      <button type="submit" style={{ display: "flex", alignItems: "center", gap: 6, background: "#0A5C36", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
        <Plus size={16} /> Kirim data prospek
      </button>
    </form>
  );
}

function UpdateLeadPanel({ leads, onUpdate, onOpenSimulasi }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [ket, setKet] = useState("Berminat");
  const [status, setStatus] = useState("NEW");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return leads.filter((l) => l.nama.toLowerCase().includes(q) || l.phone.includes(q));
  }, [query, leads]);

  const selected = leads.find((l) => l.id === selectedId);

  useEffect(() => {
    if (selected) { setKet(selected.keterangan); setStatus(selected.status); setNote(""); setSaved(false); }
  }, [selectedId]);

  const handleSave = (e) => {
    e.preventDefault();
    const stamp = todayStr();
    const appended = note.trim() ? `${selected.catatan}\n${stamp}: ${note.trim()}` : selected.catatan;
    onUpdate(selected.id, { keterangan: ket, status, catatan: appended });
    setSaved(true);
    setNote("");
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <Field label="Masukkan nomor HP / nama nasabah">
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#888780" }} />
          <input style={{ ...inputStyle, paddingLeft: 34 }} value={query} onChange={(e) => { setQuery(e.target.value); setSelectedId(null); }} placeholder="Ketik nomor HP atau nama..." />
        </div>
      </Field>

      {query.trim() && results.length === 0 && (
        <div style={{ color: "#854F0B", fontSize: 13 }}>Data nasabah tidak ditemukan.</div>
      )}

      {results.length > 0 && !selected && (
        <div style={{ border: "1px solid #D3D1C7", borderRadius: 8, overflow: "hidden" }}>
          {results.map((l) => (
            <div key={l.id} onClick={() => setSelectedId(l.id)} style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #EFEEE8", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14 }}>{l.nama} <span style={{ color: "#888780" }}>· {l.phone}</span></span>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ marginTop: 16 }}>
          <div style={{ background: "#F1EFE8", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong style={{ fontSize: 15 }}>{selected.nama}</strong>
              <StatusBadge status={selected.status} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", fontSize: 13, color: "#5F5E5A" }}>
              <div><strong>Sumber:</strong> {selected.sumber}</div>
              <div><strong>Produk:</strong> {selected.produk}</div>
              <div><strong>HP:</strong> {selected.phone}</div>
              <div><strong>Kategori:</strong> {categorize(selected.produk)}</div>
              <div><strong>Pemasar:</strong> {selected.pemasar} ({selected.unit})</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#5F5E5A", whiteSpace: "pre-line", background: "#fff", borderRadius: 8, padding: 10 }}>
              {selected.catatan}
            </div>
            {onOpenSimulasi && (
              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => onOpenSimulasi(selected)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "#E8F5E9", border: "1px solid #A5D6A7", color: "#1B5E20",
                    borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  <Calculator size={15} /> Hitung Simulasi Angsuran ({selected.produk})
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <Field label="Keterangan terbaru">
                <select style={inputStyle} value={ket} onChange={(e) => setKet(e.target.value)}>
                  {KETERANGAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Status follow-up terbaru">
                <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Tambahkan catatan perkembangan baru">
              <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tulis progress terbaru di sini..." />
            </Field>
            {saved && <div style={{ color: "#27500A", fontSize: 13, marginBottom: 10 }}>Progress berhasil diperbarui.</div>}
            <button type="submit" style={{ background: "#0A5C36", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Simpan perubahan progress
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function CategoryPanel({ leads, kategori, chartColor, onUpdate, onOpenSimulasi }) {
  const filtered = leads.filter((l) => categorize(l.produk) === kategori);
  const statusCounts = STATUS_OPTIONS.map((s) => ({ name: s, jumlah: filtered.filter((l) => l.status === s).length })).filter((d) => d.jumlah > 0);
  const prodMap = {};
  filtered.forEach((l) => { prodMap[l.produk] = (prodMap[l.produk] || 0) + 1; });
  const prodData = Object.entries(prodMap).map(([name, value]) => ({ name, value }));
  const pieColors = ["#0A5C36", "#1D9E75", "#5DCAA5", "#A37F15", "#EF9F27", "#FAC775", "#7F77DD"];

  if (filtered.length === 0) return <div style={{ color: "#888780", fontSize: 14, padding: "20px 0" }}>Belum ada rujukan untuk kategori ini.</div>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Status prospek</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statusCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="jumlah" fill={chartColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Porsi minat produk</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={prodData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} label={{ fontSize: 11 }}>
                {prodData.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <AllLeadsPanel leads={filtered} onUpdate={onUpdate} hideKategori onOpenSimulasi={onOpenSimulasi} />
    </div>
  );
}

const CATEGORY_ORDER = ["Non-Gadai (Mikro)", "Gadai Angsuran", "Investasi Emas"];
const CATEGORY_RAMPS = {
  "Non-Gadai (Mikro)": { dark: "#085041", mid: "#5DCAA5", light: "#C0DD97", base: "#0A5C36", cardBg: "#EAF3DE", cardBorder: "#639922" },
  "Gadai Angsuran": { dark: "#633806", mid: "#EF9F27", light: "#FAC775", base: "#A37F15", cardBg: "#FAEEDA", cardBorder: "#BA7517" },
  "Investasi Emas": { dark: "#712B13", mid: "#F0997B", light: "#FAECE7", base: "#D85A30", cardBg: "#FAECE7", cardBorder: "#D85A30" },
};

function statusBucket(l) {
  if (l.status === "DISBURSED") return "closing";
  if (l.status === "REJECTED") return "tidak";
  return "pending";
}

function CategoryComparison({ leads, onNavigate }) {
  const perCategory = CATEGORY_ORDER.map((kategori) => {
    const catLeads = leads.filter((l) => categorize(l.produk) === kategori);
    const total = catLeads.length;
    const closing = catLeads.filter((l) => statusBucket(l) === "closing").length;
    const pending = catLeads.filter((l) => statusBucket(l) === "pending").length;
    const tidak = catLeads.filter((l) => statusBucket(l) === "tidak").length;
    const pct = total ? ((closing / total) * 100).toFixed(1) : "0.0";
    const driverCounts = {};
    catLeads.forEach((l) => { driverCounts[l.produk] = (driverCounts[l.produk] || 0) + 1; });
    const driver = Object.entries(driverCounts).sort((a, b) => b[1] - a[1])[0];
    const unitCounts = {};
    catLeads.forEach((l) => {
      unitCounts[l.unit] = unitCounts[l.unit] || { unit: l.unit, closing: 0, pending: 0, tidak: 0 };
      unitCounts[l.unit][statusBucket(l)] += 1;
    });
    const unitData = Object.values(unitCounts).sort((a, b) => (b.closing + b.pending + b.tidak) - (a.closing + a.pending + a.tidak));
    const statusData = [
      { name: "Closing", full: "Berminat / Closing", jumlah: closing },
      { name: "Follow up", full: "Pending / Follow up", jumlah: pending },
      { name: "Tunda", full: "Tidak berminat / Tunda", jumlah: tidak },
    ];
    return { kategori, total, closing, pct, driver: driver ? driver[0] : "-", unitData, statusData };
  });

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Perbandingan efektivitas per kategori produk</div>
      <div style={{ fontSize: 11.5, color: "#888780", marginBottom: 10 }}>Klik kartu kategori untuk membuka detail lengkapnya</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
        {perCategory.map((c) => {
          const r = CATEGORY_RAMPS[c.kategori];
          return (
            <div
              key={c.kategori}
              onClick={() => onNavigate && onNavigate(c.kategori)}
              title="Klik untuk lihat detail"
              style={{ background: r.cardBg, border: `1px solid ${r.cardBorder}`, borderRadius: 10, padding: 14, cursor: onNavigate ? "pointer" : "default" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: r.dark }}>{c.kategori.toUpperCase()}</div>
                {onNavigate && <ArrowRight size={14} color={r.dark} />}
              </div>
              <div style={{ fontSize: 12, color: r.dark, lineHeight: 1.7 }}>
                <div>Total leads: <strong>{c.total} prospek</strong></div>
                <div>Berminat/closing: <strong>{c.closing} ({c.pct}%)</strong></div>
                <div>Produk unggulan: <strong>{c.driver}</strong></div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
        {perCategory.map((c) => {
          const r = CATEGORY_RAMPS[c.kategori];
          return (
            <div key={c.kategori} style={{ background: "#fff", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 8, color: r.base }}>Status leads — {c.kategori}</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={c.statusData} margin={{ bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
                  <XAxis dataKey="name" tick={{ fontSize: 10.5 }} interval={0} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} width={26} />
                  <Tooltip formatter={(value, _n, props) => [value, props.payload.full]} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                  <Bar
                    dataKey="jumlah"
                    radius={[4, 4, 0, 0]}
                    cursor={onNavigate ? "pointer" : "default"}
                    onClick={() => onNavigate && onNavigate(c.kategori)}
                  >
                    {c.statusData.map((_, i) => <Cell key={i} fill={[r.dark, r.mid, r.light][i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {perCategory.map((c) => {
          const r = CATEGORY_RAMPS[c.kategori];
          if (c.unitData.length === 0) return (
            <div key={c.kategori} style={{ background: "#fff", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", fontSize: 12, color: "#888780" }}>
              Belum ada data unit untuk {c.kategori}.
            </div>
          );
          return (
            <div key={c.kategori} style={{ background: "#fff", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 8, color: r.base }}>Hasil per unit — {c.kategori}</div>
              <ResponsiveContainer width="100%" height={Math.max(150, c.unitData.length * 40)}>
                <BarChart data={c.unitData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="unit" width={90} tick={{ fontSize: 9.5 }} />
                  <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                  <Bar dataKey="closing" stackId="a" fill={r.dark} cursor={onNavigate ? "pointer" : "default"} onClick={() => onNavigate && onNavigate(c.kategori)} />
                  <Bar dataKey="pending" stackId="a" fill={r.mid} cursor={onNavigate ? "pointer" : "default"} onClick={() => onNavigate && onNavigate(c.kategori)} />
                  <Bar dataKey="tidak" stackId="a" fill={r.light} radius={[0, 4, 4, 0]} cursor={onNavigate ? "pointer" : "default"} onClick={() => onNavigate && onNavigate(c.kategori)} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function DashboardOverview({ leads, onNavigate }) {
  const byDate = {};
  leads.forEach((l) => { byDate[l.tanggal] = (byDate[l.tanggal] || 0) + 1; });
  const trendData = Object.entries(byDate).sort((a, b) => a[0].localeCompare(b[0])).map(([tanggal, jumlah]) => ({ tanggal, jumlah }));

  const catCounts = {};
  leads.forEach((l) => { const c = categorize(l.produk); catCounts[c] = (catCounts[c] || 0) + 1; });
  const catData = Object.entries(catCounts).map(([name, value]) => ({ name, value }));
  const catColors = { "Non-Gadai (Mikro)": "#1D9E75", "Gadai Angsuran": "#A37F15", "Investasi Emas": "#EF9F27" };

  const statusData = STATUS_OPTIONS.map((s) => ({ name: s, jumlah: leads.filter((l) => l.status === s).length })).filter((d) => d.jumlah > 0);

  const sumberCounts = {};
  leads.forEach((l) => { sumberCounts[l.sumber] = (sumberCounts[l.sumber] || 0) + 1; });
  const sumberData = Object.entries(sumberCounts).map(([name, value]) => ({ name, value }));
  const sumberColors = ["#378ADD", "#7F77DD", "#D4537E", "#1D9E75", "#EF9F27", "#639922"];

  return (
    <div>
      <CategoryComparison leads={leads} onNavigate={onNavigate} />
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 24 }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Tren leads masuk per tanggal</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={trendData} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
            <XAxis
              dataKey="tanggal"
              tick={{ fontSize: 10 }}
              angle={-35}
              textAnchor="end"
              height={45}
              interval="preserveStartEnd"
              tickFormatter={(d) => (d && d.length >= 10 ? d.slice(5) : d)}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="jumlah" fill="#0A5C36" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Distribusi kategori produk</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={catData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="42%"
              innerRadius={38}
              outerRadius={66}
              cursor={onNavigate ? "pointer" : "default"}
              onClick={(d) => onNavigate && onNavigate(d.name)}
            >
              {catData.map((d, i) => <Cell key={i} fill={catColors[d.name] || "#888780"} />)}
            </Pie>
            <Legend verticalAlign="bottom" height={44} wrapperStyle={{ fontSize: 11 }} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Distribusi status keseluruhan</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={statusData} margin={{ bottom: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
            <XAxis dataKey="name" tick={{ fontSize: 9.5 }} angle={-20} textAnchor="end" height={38} interval={0} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="jumlah" fill="#378ADD" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Distribusi sumber prospek</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={sumberData} dataKey="value" nameKey="name" cx="50%" cy="42%" innerRadius={38} outerRadius={66}>
              {sumberData.map((_, i) => <Cell key={i} fill={sumberColors[i % sumberColors.length]} />)}
            </Pie>
            <Legend verticalAlign="bottom" height={44} wrapperStyle={{ fontSize: 10.5 }} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
}

function FilterDropdown({ label, fieldKey, options, selected, onChange, sortState, onSort, variant }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOptions = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  const toggle = (opt) => {
    const next = new Set(selected);
    if (next.has(opt)) next.delete(opt); else next.add(opt);
    onChange(next);
  };
  const clear = () => onChange(new Set());
  const selectAll = () => onChange(new Set(options));
  const count = selected.size;
  const isAsc = sortState && sortState.key === fieldKey && sortState.dir === "asc";
  const isDesc = sortState && sortState.key === fieldKey && sortState.dir === "desc";
  const isSortActive = isAsc || isDesc;
  const isActive = count > 0 || isSortActive;
  const isHeader = variant === "header";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={isHeader ? {
        display: "flex", alignItems: "center", gap: 5, background: "transparent",
        color: isActive ? "#0A5C36" : "#5F5E5A", border: "none", padding: 0,
        fontSize: "inherit", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
      } : {
        display: "flex", alignItems: "center", gap: 6, background: isActive ? "#0A5C36" : "#fff",
        color: isActive ? "#fff" : "#3d3d3a", border: `1px solid ${isActive ? "#0A5C36" : "#D3D1C7"}`,
        borderRadius: 8, padding: "8px 12px", fontSize: 12.5, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
      }}>
        {isAsc && <ArrowUp size={12} />}{isDesc && <ArrowDown size={12} />}
        {label}{count > 0 ? ` (${count})` : ""}
        {isHeader && <ChevronRight size={11} style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.1s", opacity: 0.6 }} />}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50, background: "#fff",
          border: "1px solid #D3D1C7", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
          minWidth: 220, maxWidth: 280, padding: 10,
        }}>
          {onSort && (
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              <button
                onClick={() => onSort(fieldKey, isAsc ? null : "asc")}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  padding: "6px 6px", borderRadius: 6, cursor: "pointer", fontSize: 11.5,
                  border: `1px solid ${isAsc ? "#0A5C36" : "#D3D1C7"}`, background: isAsc ? "#EAF3DE" : "#fff", color: isAsc ? "#0A5C36" : "#3d3d3a",
                }}
              >
                <ArrowUp size={12} /> Urutkan naik
              </button>
              <button
                onClick={() => onSort(fieldKey, isDesc ? null : "desc")}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  padding: "6px 6px", borderRadius: 6, cursor: "pointer", fontSize: 11.5,
                  border: `1px solid ${isDesc ? "#0A5C36" : "#D3D1C7"}`, background: isDesc ? "#EAF3DE" : "#fff", color: isDesc ? "#0A5C36" : "#3d3d3a",
                }}
              >
                <ArrowDown size={12} /> Urutkan turun
              </button>
            </div>
          )}
          {options.length > 8 && (
            <input
              autoFocus
              style={{ ...inputStyle, marginBottom: 8, fontSize: 12.5, padding: "6px 10px" }}
              placeholder={`Cari ${label.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <button onClick={selectAll} style={{ background: "none", border: "none", color: "#0A5C36", fontSize: 11.5, cursor: "pointer", padding: 0 }}>Pilih semua</button>
            <button onClick={clear} style={{ background: "none", border: "none", color: "#888780", fontSize: 11.5, cursor: "pointer", padding: 0 }}>Kosongkan</button>
          </div>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {filteredOptions.length === 0 ? (
              <div style={{ fontSize: 12, color: "#888780", padding: "6px 2px" }}>Tidak ada opsi.</div>
            ) : filteredOptions.map((opt) => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 2px", fontSize: 12.5, cursor: "pointer" }}>
                <input type="checkbox" checked={selected.has(opt)} onChange={() => toggle(opt)} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const EMPTY_FILTERS = { tanggal: new Set(), nama: new Set(), produk: new Set(), pemasar: new Set(), kategori: new Set(), unit: new Set(), status: new Set() };

function ExportMenu({ onExportPng, onExportCsv, onExportPdf }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="Opsi lainnya"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, cursor: "pointer", color: "#3d3d3a" }}
      >
        <MoreVertical size={16} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 50, background: "#fff",
          border: "1px solid #D3D1C7", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.14)", minWidth: 200, padding: 6,
        }}>
          {onExportPng && (
            <button
              onClick={() => { onExportPng(); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "8px 10px", background: "transparent", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#3d3d3a" }}
            >
              <Download size={14} /> Ekspor gambar (PNG)
            </button>
          )}
          {onExportPdf && (
            <button
              onClick={() => { onExportPdf(); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "8px 10px", background: "transparent", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#3d3d3a" }}
            >
              <FileDown size={14} /> Unduh PDF
            </button>
          )}
          {onExportCsv && (
            <button
              onClick={() => { onExportCsv(); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "8px 10px", background: "transparent", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#3d3d3a" }}
            >
              <FileText size={14} /> Ekspor CSV
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function LeadActionMenu({ lead, onFollowUp, onSimulasi }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        title="Pilihan Aksi"
        style={{
          background: open ? "#E5E3DA" : "#F8F9FA",
          border: "1px solid #DCD4C0",
          borderRadius: 6,
          padding: "4px 6px",
          cursor: "pointer",
          color: "#3d3d3a",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s ease",
        }}
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 4px)",
            zIndex: 60,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            border: "1px solid #E5E3DA",
            minWidth: 155,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onFollowUp(lead);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "7px 10px",
              border: "none",
              background: "transparent",
              borderRadius: 6,
              fontSize: 12.5,
              fontWeight: 500,
              color: "#2C2C2A",
              cursor: "pointer",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F3EF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ClipboardList size={14} color="#5F5E5A" />
            <span>Follow up</span>
          </button>

          {onSimulasi && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onSimulasi(lead);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "7px 10px",
                border: "none",
                background: "transparent",
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 500,
                color: "#0A5C36",
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E8F5E9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Calculator size={14} color="#0A5C36" />
              <span>Hitung Simulasi</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function AllLeadsPanel({ leads, onUpdate, hideKategori, onOpenSimulasi }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortState, setSortState] = useState({ key: "tanggal", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [selectedId, setSelectedId] = useState(null);
  const [ket, setKet] = useState("Berminat");
  const [status, setStatus] = useState("NEW");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const tableRef = useRef(null);

  const options = useMemo(() => ({
    tanggal: [...new Set(leads.map((l) => l.tanggal))].sort((a, b) => b.localeCompare(a)),
    nama: [...new Set(leads.map((l) => l.nama))].sort(),
    produk: [...new Set(leads.map((l) => l.produk))].sort(),
    pemasar: [...new Set(leads.map((l) => l.pemasar))].sort(),
    kategori: [...new Set(leads.map((l) => categorize(l.produk)))].sort(),
    unit: [...new Set(leads.map((l) => l.unit))].sort(),
    status: STATUS_OPTIONS,
  }), [leads]);

  const setFilter = (key) => (set) => setFilters((f) => ({ ...f, [key]: set }));
  const resetFilters = () => setFilters(EMPTY_FILTERS);
  const activeCount = Object.values(filters).filter((s) => s.size > 0).length;
  const handleSort = (key, dir) => setSortState(dir ? { key, dir } : { key: null, dir: null });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return leads.filter((l) => {
      const matchQuery = !q || l.nama.toLowerCase().includes(q) || l.phone.includes(q) || l.pemasar.toLowerCase().includes(q);
      const kategori = categorize(l.produk);
      const matchField = (key, value) => filters[key].size === 0 || filters[key].has(value);
      return matchQuery
        && matchField("tanggal", l.tanggal)
        && matchField("nama", l.nama)
        && matchField("produk", l.produk)
        && matchField("pemasar", l.pemasar)
        && matchField("kategori", kategori)
        && matchField("unit", l.unit)
        && matchField("status", l.status);
    });
  }, [query, filters, leads]);

  const sorted = useMemo(() => {
    if (!sortState.key) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = sortState.key === "kategori" ? categorize(a.produk) : a[sortState.key];
      const bv = sortState.key === "kategori" ? categorize(b.produk) : b[sortState.key];
      const cmp = String(av).localeCompare(String(bv), "id");
      return sortState.dir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortState]);

  useEffect(() => { setPage(1); }, [query, filters, sortState, pageSize]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const selected = leads.find((l) => l.id === selectedId);

  const openEdit = (lead) => {
    setSelectedId(lead.id); setKet(lead.keterangan); setStatus(lead.status); setNote(""); setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const stamp = todayStr();
    const appended = note.trim() ? `${selected.catatan}\n${stamp}: ${note.trim()}` : selected.catatan;
    onUpdate(selected.id, { keterangan: ket, status, catatan: appended });
    setSaved(true);
    setNote("");
  };

  const exportPng = () => {
    const cols = [
      { key: "tanggal", label: "Tanggal", width: 82 },
      { key: "nama", label: "Nama", width: 140 },
      { key: "produk", label: "Produk", width: 180 },
      ...(hideKategori ? [] : [{ key: "kategori", label: "Kategori", width: 120 }]),
      { key: "keterangan", label: "Keterangan", width: 110 },
      { key: "pemasar", label: "Pemasar", width: 110 },
      { key: "unit", label: "Unit", width: 100 },
      { key: "status", label: "Status", width: 95 },
    ];
    const padding = 24;
    const rowH = 28;
    const headerH = 34;
    const titleH = 66;
    const tableWidth = cols.reduce((a, c) => a + c.width, 0);
    const canvasWidth = tableWidth + padding * 2;
    const canvasHeight = titleH + headerH + Math.max(sorted.length, 1) * rowH + padding + 20;

    const canvas = document.createElement("canvas");
    const scale = 2; // render tajam (retina)
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#0A5C36";
    ctx.font = "bold 17px Arial, sans-serif";
    ctx.fillText("Laporan Daftar Prospek — Pegadaian Mikro & Emas", padding, 30);
    ctx.fillStyle = "#5F5E5A";
    ctx.font = "12px Arial, sans-serif";
    const now = new Date();
    ctx.fillText(`Dicetak ${now.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })} pukul ${now.toLocaleTimeString("id-ID")} — menampilkan ${sorted.length} dari ${leads.length} prospek`, padding, 50);

    let y = titleH;
    ctx.fillStyle = "#F8F9FA";
    ctx.fillRect(padding, y, tableWidth, headerH);
    ctx.fillStyle = "#3d3d3a";
    ctx.font = "bold 11.5px Arial, sans-serif";
    let x = padding;
    cols.forEach((c) => {
      ctx.fillText(c.label, x + 8, y + headerH / 2 + 4);
      x += c.width;
    });
    y += headerH;

    ctx.font = "11px Arial, sans-serif";
    if (sorted.length === 0) {
      ctx.fillStyle = "#888780";
      ctx.fillText("Tidak ada data untuk filter yang dipilih.", padding + 8, y + rowH / 2 + 4);
      y += rowH;
    } else {
      sorted.forEach((l, i) => {
        if (i % 2 === 1) {
          ctx.fillStyle = "#FAFAF8";
          ctx.fillRect(padding, y, tableWidth, rowH);
        }
        ctx.fillStyle = "#2C2C2A";
        const kategori = categorize(l.produk);
        const vals = hideKategori
          ? [l.tanggal, l.nama, l.produk, l.keterangan, l.pemasar, l.unit, l.status]
          : [l.tanggal, l.nama, l.produk, kategori, l.keterangan, l.pemasar, l.unit, l.status];
        let cx = padding;
        cols.forEach((c, ci) => {
          let text = String(vals[ci] ?? "");
          const maxChars = Math.max(4, Math.floor((c.width - 12) / 5.6));
          if (text.length > maxChars) text = text.slice(0, maxChars - 1) + "…";
          ctx.fillText(text, cx + 8, y + rowH / 2 + 4);
          cx += c.width;
        });
        y += rowH;
      });
    }

    ctx.strokeStyle = "#E5E3DA";
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, titleH, tableWidth, headerH + Math.max(sorted.length, 1) * rowH);

    const link = document.createElement("a");
    link.download = `daftar-prospek-${todayStr()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const exportCsv = () => {
    const headers = hideKategori
      ? ["tanggal", "nama", "produk", "keterangan", "pemasar", "unit", "status"]
      : ["tanggal", "nama", "produk", "kategori", "keterangan", "pemasar", "unit", "status"];
    const csvRows = sorted.map((l) => {
      const vals = hideKategori
        ? [l.tanggal, l.nama, l.produk, l.keterangan, l.pemasar, l.unit, l.status]
        : [l.tanggal, l.nama, l.produk, categorize(l.produk), l.keterangan, l.pemasar, l.unit, l.status];
      return vals.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",");
    });
    const csv = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `daftar-prospek-${todayStr()}.csv`; link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ position: "relative", maxWidth: 320, marginBottom: 10 }}>
        <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#888780" }} />
        <input style={{ ...inputStyle, paddingLeft: 34 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama, HP, atau pemasar..." />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 12, color: "#888780" }}>
          Menampilkan {sorted.length} dari {leads.length} prospek
          {activeCount > 0 && (
            <button onClick={resetFilters} style={{ background: "none", border: "none", color: "#A32D2D", fontSize: 12, fontWeight: 500, cursor: "pointer", marginLeft: 10 }}>
              Reset filter ({activeCount})
            </button>
          )}
        </div>
        <ExportMenu onExportPng={exportPng} onExportCsv={exportCsv} />
      </div>

      <div className="admin-table-wrap" style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto", marginBottom: 12, minHeight: 220 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#888780", background: "#F8F9FA" }}>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Tanggal" fieldKey="tanggal" options={options.tanggal} selected={filters.tanggal} onChange={setFilter("tanggal")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Nama" fieldKey="nama" options={options.nama} selected={filters.nama} onChange={setFilter("nama")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Produk" fieldKey="produk" options={options.produk} selected={filters.produk} onChange={setFilter("produk")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              {!hideKategori && (
                <th style={{ padding: "8px 12px" }}>
                  <FilterDropdown label="Kategori" fieldKey="kategori" options={options.kategori} selected={filters.kategori} onChange={setFilter("kategori")} sortState={sortState} onSort={handleSort} variant="header" />
                </th>
              )}
              <th style={{ padding: "8px 12px" }}>Keterangan</th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Pemasar" fieldKey="pemasar" options={options.pemasar} selected={filters.pemasar} onChange={setFilter("pemasar")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Unit kerja" fieldKey="unit" options={options.unit} selected={filters.unit} onChange={setFilter("unit")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Status" fieldKey="status" options={options.status} selected={filters.status} onChange={setFilter("status")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px", width: 44, textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={hideKategori ? 8 : 9} style={{ padding: 20, textAlign: "center", color: "#888780" }}>Tidak ada prospek yang cocok.</td></tr>
            ) : paged.map((l) => (
              <tr key={l.id} style={{ borderTop: "1px solid #F1EFE8" }}>
                <td style={{ padding: "8px 12px" }}>{l.tanggal}</td>
                <td style={{ padding: "8px 12px" }}>{l.nama}</td>
                <td style={{ padding: "8px 12px" }}>{l.produk}</td>
                {!hideKategori && <td style={{ padding: "8px 12px" }}>{categorize(l.produk)}</td>}
                <td style={{ padding: "8px 12px" }}>{l.keterangan}</td>
                <td style={{ padding: "8px 12px" }}>{l.pemasar}</td>
                <td style={{ padding: "8px 12px" }}>{l.unit}</td>
                <td style={{ padding: "8px 12px" }}><StatusBadge status={l.status} /></td>
                <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                  <LeadActionMenu lead={l} onFollowUp={openEdit} onSimulasi={onOpenSimulasi} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#5F5E5A" }}>
          Tampilkan
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ ...inputStyle, width: "auto", padding: "5px 8px", fontSize: 12.5 }}>
            {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          per halaman
        </div>
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{ background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, cursor: currentPage <= 1 ? "not-allowed" : "pointer", color: currentPage <= 1 ? "#C7C5BC" : "#3d3d3a" }}
            >
              Sebelumnya
            </button>
            <span style={{ fontSize: 12.5, color: "#5F5E5A" }}>Halaman {currentPage} dari {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{ background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, cursor: currentPage >= totalPages ? "not-allowed" : "pointer", color: currentPage >= totalPages ? "#C7C5BC" : "#3d3d3a" }}
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div
          onClick={() => setSelectedId(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,23,20,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 10px 40px rgba(0,0,0,0.25)", maxWidth: 560, width: "100%", maxHeight: "90vh", overflow: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#2C2C2A" }}>{selected.nama}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {onOpenSimulasi && (
                  <button
                    type="button"
                    onClick={() => { setSelectedId(null); onOpenSimulasi(selected); }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: "#E8F5E9", border: "1px solid #A5D6A7", color: "#1B5E20",
                      borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                    }}
                  >
                    <Calculator size={13} /> Hitung Simulasi
                  </button>
                )}
                <button onClick={() => setSelectedId(null)} style={{ background: "none", border: "none", color: "#888780", cursor: "pointer", fontSize: 13 }}>Tutup</button>
              </div>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#5F5E5A", marginBottom: 10 }}>No. HP: {selected.phone}</div>
            <div style={{ fontSize: 12, color: "#5F5E5A", whiteSpace: "pre-line", background: "#F8F9FA", borderRadius: 8, padding: 10, marginBottom: 14 }}>
              {selected.catatan}
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                <Field label="Keterangan terbaru">
                  <select style={inputStyle} value={ket} onChange={(e) => setKet(e.target.value)}>
                    {KETERANGAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Status follow-up terbaru">
                  <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
                    {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Tambahkan catatan perkembangan baru">
                <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tulis progress terbaru di sini..." />
              </Field>
              {saved && <div style={{ color: "#27500A", fontSize: 13, marginBottom: 10 }}>Progress berhasil diperbarui.</div>}
              <button type="submit" style={{ background: "#0A5C36", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                Simpan perubahan progress
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function normalizePemasarName(name) {
  return (name || "").trim().toLowerCase().replace(/\s+/g, " ");
}
function titleCasePemasarName(key) {
  return key.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

function LeaderboardPanel({ leads }) {
  const byUnit = {};
  const byPemasar = {};
  leads.forEach((l) => {
    byUnit[l.unit] = (byUnit[l.unit] || 0) + 1;
    const key = normalizePemasarName(l.pemasar);
    byPemasar[key] = (byPemasar[key] || 0) + 1;
  });
  const unitData = Object.entries(byUnit).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
  const pemasarData = Object.entries(byPemasar).map(([key, total]) => ({ name: titleCasePemasarName(key), total })).sort((a, b) => b.total - a.total);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Kontribusi leads per unit kerja</div>
        <ResponsiveContainer width="100%" height={Math.max(180, unitData.length * 42)}>
          <BarChart data={unitData} layout="vertical" margin={{ left: 20, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="total" fill="#0A5C36" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="total" position="right" style={{ fontSize: 11.5, fontWeight: 600, fill: "#3d3d3a" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Kontribusi leads per pemasar</div>
        <ResponsiveContainer width="100%" height={Math.max(180, pemasarData.length * 42)}>
          <BarChart data={pemasarData} layout="vertical" margin={{ left: 20, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="total" fill="#A37F15" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="total" position="right" style={{ fontSize: 11.5, fontWeight: 600, fill: "#3d3d3a" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function parseFollowUps(leads) {
  const rows = [];
  leads.forEach((l) => {
    const kategori = categorize(l.produk);
    const lines = (l.catatan || "").split("\n").map((s) => s.trim()).filter(Boolean);
    // Baris pertama adalah catatan saat prospek pertama kali diinput pemasar —
    // itu bukan follow up, jadi cukup muncul di Daftar Prospek. Hanya catatan
    // susulan (update pemasar / follow up admin) yang dianggap "hasil follow up".
    const followUpLines = lines.slice(1);
    followUpLines.forEach((line, idx) => {
      const m = line.match(/^(\d{4}-\d{2}-\d{2}):\s*(.*)$/);
      rows.push({
        id: `${l.id}-${idx}`,
        tanggal: m ? m[1] : l.tanggal,
        nama: l.nama,
        produk: l.produk,
        kategori,
        unit: l.unit,
        keterangan: l.keterangan,
        hasil: m ? m[2] : line,
        status: l.status,
      });
    });
  });
  return rows;
}

const FOLLOWUP_EMPTY_FILTERS = { tanggal: new Set(), nama: new Set(), produk: new Set(), unit: new Set(), keterangan: new Set(), status: new Set() };

function FollowUpPanel({ leads }) {
  const rows = useMemo(() => parseFollowUps(leads), [leads]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(FOLLOWUP_EMPTY_FILTERS);
  const [sortState, setSortState] = useState({ key: "tanggal", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const options = useMemo(() => ({
    tanggal: [...new Set(rows.map((r) => r.tanggal))].sort((a, b) => b.localeCompare(a)),
    nama: [...new Set(rows.map((r) => r.nama))].sort(),
    produk: [...new Set(rows.map((r) => r.produk))].sort(),
    unit: [...new Set(rows.map((r) => r.unit))].sort(),
    keterangan: KETERANGAN_OPTIONS,
    status: STATUS_OPTIONS,
  }), [rows]);

  const setFilter = (key) => (set) => setFilters((f) => ({ ...f, [key]: set }));
  const resetFilters = () => setFilters(FOLLOWUP_EMPTY_FILTERS);
  const activeCount = Object.values(filters).filter((s) => s.size > 0).length;
  const handleSort = (key, dir) => setSortState(dir ? { key, dir } : { key: null, dir: null });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((r) => {
      const matchQuery = !q || r.nama.toLowerCase().includes(q) || r.hasil.toLowerCase().includes(q);
      const matchField = (key, value) => filters[key].size === 0 || filters[key].has(value);
      return matchQuery
        && matchField("tanggal", r.tanggal)
        && matchField("nama", r.nama)
        && matchField("produk", r.produk)
        && matchField("unit", r.unit)
        && matchField("keterangan", r.keterangan)
        && matchField("status", r.status);
    });
  }, [query, filters, rows]);

  const sorted = useMemo(() => {
    if (!sortState.key) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const cmp = String(a[sortState.key]).localeCompare(String(b[sortState.key]), "id");
      return sortState.dir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortState]);

  useEffect(() => { setPage(1); }, [query, filters, sortState, pageSize]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportPng = () => {
    const cols = [
      { key: "tanggal", label: "Tanggal follow up", width: 105 },
      { key: "nama", label: "Nama", width: 130 },
      { key: "produk", label: "Produk", width: 160 },
      { key: "unit", label: "Unit kerja", width: 105 },
      { key: "keterangan", label: "Keterangan", width: 100 },
      { key: "hasil", label: "Hasil follow up", width: 230 },
      { key: "status", label: "Status", width: 90 },
    ];
    const padding = 24;
    const rowH = 28;
    const headerH = 34;
    const titleH = 66;
    const tableWidth = cols.reduce((a, c) => a + c.width, 0);
    const canvasWidth = tableWidth + padding * 2;
    const canvasHeight = titleH + headerH + Math.max(sorted.length, 1) * rowH + padding + 20;

    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#0A5C36";
    ctx.font = "bold 17px Arial, sans-serif";
    ctx.fillText("Laporan Hasil Follow Up — Pegadaian Mikro & Emas", padding, 30);
    ctx.fillStyle = "#5F5E5A";
    ctx.font = "12px Arial, sans-serif";
    const now = new Date();
    ctx.fillText(`Dicetak ${now.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })} pukul ${now.toLocaleTimeString("id-ID")} — menampilkan ${sorted.length} dari ${rows.length} catatan`, padding, 50);

    let y = titleH;
    ctx.fillStyle = "#F8F9FA";
    ctx.fillRect(padding, y, tableWidth, headerH);
    ctx.fillStyle = "#3d3d3a";
    ctx.font = "bold 11.5px Arial, sans-serif";
    let x = padding;
    cols.forEach((c) => {
      ctx.fillText(c.label, x + 8, y + headerH / 2 + 4);
      x += c.width;
    });
    y += headerH;

    ctx.font = "11px Arial, sans-serif";
    if (sorted.length === 0) {
      ctx.fillStyle = "#888780";
      ctx.fillText("Tidak ada data untuk filter yang dipilih.", padding + 8, y + rowH / 2 + 4);
      y += rowH;
    } else {
      sorted.forEach((r, i) => {
        if (i % 2 === 1) {
          ctx.fillStyle = "#FAFAF8";
          ctx.fillRect(padding, y, tableWidth, rowH);
        }
        ctx.fillStyle = "#2C2C2A";
        const vals = [r.tanggal, r.nama, r.produk, r.unit, r.keterangan, r.hasil, r.status];
        let cx = padding;
        cols.forEach((c, ci) => {
          let text = String(vals[ci] ?? "");
          const maxChars = Math.max(4, Math.floor((c.width - 12) / 5.6));
          if (text.length > maxChars) text = text.slice(0, maxChars - 1) + "…";
          ctx.fillText(text, cx + 8, y + rowH / 2 + 4);
          cx += c.width;
        });
        y += rowH;
      });
    }

    ctx.strokeStyle = "#E5E3DA";
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, titleH, tableWidth, headerH + Math.max(sorted.length, 1) * rowH);

    const link = document.createElement("a");
    link.download = `hasil-follow-up-${todayStr()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const exportCsv = () => {
    const headers = ["tanggal_follow_up", "nama", "produk", "unit_kerja", "keterangan", "hasil_follow_up", "status"];
    const rows_ = sorted.map((r) => [r.tanggal, r.nama, r.produk, r.unit, r.keterangan, r.hasil, r.status]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows_].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `hasil-follow-up-${todayStr()}.csv`; link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ position: "relative", maxWidth: 320, marginBottom: 10 }}>
        <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#888780" }} />
        <input style={{ ...inputStyle, paddingLeft: 34 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama atau isi hasil follow up..." />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 12, color: "#888780" }}>
          Menampilkan {sorted.length} dari {rows.length} catatan follow up
          {activeCount > 0 && (
            <button onClick={resetFilters} style={{ background: "none", border: "none", color: "#A32D2D", fontSize: 12, fontWeight: 500, cursor: "pointer", marginLeft: 10 }}>
              Reset filter ({activeCount})
            </button>
          )}
        </div>
        <ExportMenu onExportPng={exportPng} onExportCsv={exportCsv} />
      </div>

      <div className="admin-table-wrap" style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto", marginBottom: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#888780", background: "#F8F9FA" }}>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Tanggal follow up" fieldKey="tanggal" options={options.tanggal} selected={filters.tanggal} onChange={setFilter("tanggal")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Nama" fieldKey="nama" options={options.nama} selected={filters.nama} onChange={setFilter("nama")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Produk" fieldKey="produk" options={options.produk} selected={filters.produk} onChange={setFilter("produk")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Unit kerja" fieldKey="unit" options={options.unit} selected={filters.unit} onChange={setFilter("unit")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Keterangan" fieldKey="keterangan" options={options.keterangan} selected={filters.keterangan} onChange={setFilter("keterangan")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
              <th style={{ padding: "8px 12px", minWidth: 220 }}>Hasil follow up</th>
              <th style={{ padding: "8px 12px" }}>
                <FilterDropdown label="Status" fieldKey="status" options={options.status} selected={filters.status} onChange={setFilter("status")} sortState={sortState} onSort={handleSort} variant="header" />
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 20, textAlign: "center", color: "#888780" }}>Tidak ada catatan follow up yang cocok.</td></tr>
            ) : paged.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #F1EFE8" }}>
                <td style={{ padding: "8px 12px", whiteSpace: "nowrap" }}>{r.tanggal}</td>
                <td style={{ padding: "8px 12px" }}>{r.nama}</td>
                <td style={{ padding: "8px 12px" }}>{r.produk}</td>
                <td style={{ padding: "8px 12px" }}>{r.unit}</td>
                <td style={{ padding: "8px 12px" }}>{r.keterangan}</td>
                <td style={{ padding: "8px 12px" }}>{r.hasil}</td>
                <td style={{ padding: "8px 12px" }}><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#5F5E5A" }}>
          Tampilkan
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ ...inputStyle, width: "auto", padding: "5px 8px", fontSize: 12.5 }}>
            {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          per halaman
        </div>
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{ background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, cursor: currentPage <= 1 ? "not-allowed" : "pointer", color: currentPage <= 1 ? "#C7C5BC" : "#3d3d3a" }}
            >
              Sebelumnya
            </button>
            <span style={{ fontSize: 12.5, color: "#5F5E5A" }}>Halaman {currentPage} dari {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{ background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, cursor: currentPage >= totalPages ? "not-allowed" : "pointer", color: currentPage >= totalPages ? "#C7C5BC" : "#3d3d3a" }}
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTanggalPanjang(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function buildReportData(leads) {
  const total = leads.length;
  const closing = leads.filter((l) => l.status === "DISBURSED").length;
  const activePipeline = leads.filter((l) => !["DISBURSED", "REJECTED"].includes(l.status)).length;
  const conversion = total ? ((closing / total) * 100).toFixed(1) : "0.0";

  const categoryRows = CATEGORY_ORDER.map((kategori) => {
    const catLeads = leads.filter((l) => categorize(l.produk) === kategori);
    const catTotal = catLeads.length;
    const catClosing = catLeads.filter((l) => statusBucket(l) === "closing").length;
    const pct = catTotal ? ((catClosing / catTotal) * 100).toFixed(1) : "0.0";
    const driverCounts = {};
    catLeads.forEach((l) => { driverCounts[l.produk] = (driverCounts[l.produk] || 0) + 1; });
    const driver = Object.entries(driverCounts).sort((a, b) => b[1] - a[1])[0];
    return { kategori, total: catTotal, closing: catClosing, pct, driver: driver ? driver[0] : "-" };
  });

  const statusRows = STATUS_OPTIONS.map((s) => ({ status: s, jumlah: leads.filter((l) => l.status === s).length })).filter((d) => d.jumlah > 0);

  const pemasarCounts = {};
  leads.forEach((l) => { const k = normalizePemasarName(l.pemasar); pemasarCounts[k] = (pemasarCounts[k] || 0) + 1; });
  const pemasarRows = Object.entries(pemasarCounts).map(([k, jumlah]) => ({ nama: titleCasePemasarName(k), jumlah })).sort((a, b) => b.jumlah - a.jumlah).slice(0, 10);

  const unitCounts = {};
  leads.forEach((l) => { unitCounts[l.unit] = (unitCounts[l.unit] || 0) + 1; });
  const unitRows = Object.entries(unitCounts).map(([unit, jumlah]) => ({ unit, jumlah })).sort((a, b) => b.jumlah - a.jumlah);

  const sumberCounts = {};
  leads.forEach((l) => { sumberCounts[l.sumber] = (sumberCounts[l.sumber] || 0) + 1; });
  const sumberRows = Object.entries(sumberCounts).map(([sumber, jumlah]) => ({ sumber, jumlah })).sort((a, b) => b.jumlah - a.jumlah);

  const dateCounts = {};
  leads.forEach((l) => { dateCounts[l.tanggal] = (dateCounts[l.tanggal] || 0) + 1; });
  const dateRows = Object.entries(dateCounts).map(([tanggal, jumlah]) => ({ tanggal, jumlah })).sort((a, b) => a.tanggal.localeCompare(b.tanggal));

  return { total, closing, activePipeline, conversion, categoryRows, statusRows, pemasarRows, unitRows, sumberRows, dateRows };
}

function buildReportHtml({ fromStr, toStr, data }) {
  const genAt = new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });
  const tableStyle = 'style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:22px;"';
  const thStyle = 'style="text-align:left;padding:6px 10px;background:#F8F9FA;color:#5F5E5A;border-bottom:1px solid #E5E3DA;"';
  const tdStyle = 'style="padding:6px 10px;border-bottom:1px solid #F1EFE8;"';

  const rowsHtml = (rows, cols) => rows.map((r) => `<tr>${cols.map((c) => `<td ${tdStyle}>${r[c]}</td>`).join("")}</tr>`).join("");

  const barChartHtml = (rows, labelKey, valueKey, color) => {
    if (rows.length === 0) return "";
    const max = Math.max(1, ...rows.map((r) => r[valueKey]));
    return `<div style="margin-bottom:12px;">${rows.map((r) => {
      const pct = Math.max((r[valueKey] / max) * 100, 3);
      return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
        <div style="width:130px;font-size:10.5px;color:#5F5E5A;text-align:right;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r[labelKey]}</div>
        <div style="flex:1;background:#F1EFE8;border-radius:4px;overflow:hidden;height:15px;">
          <div style="width:${pct}%;background:${color};height:100%;border-radius:4px;"></div>
        </div>
        <div style="width:30px;font-size:10.5px;color:#3d3d3a;font-weight:700;">${r[valueKey]}</div>
      </div>`;
    }).join("")}</div>`;
  };

  return `<!doctype html>
<html lang="id"><head><meta charset="utf-8" />
<title>Laporan Leads Tracker</title>
<style>
  @page { margin: 20mm 16mm; }
  body { font-family: Arial, Helvetica, sans-serif; color: #2C2C2A; margin: 0; padding: 24px; }
  h1 { color: #0A5C36; font-size: 20px; margin: 0 0 2px; }
  .sub { color: #5F5E5A; font-size: 12px; margin-bottom: 18px; }
  .kpi { display: flex; gap: 12px; margin-bottom: 22px; }
  .kpi div { flex: 1; border: 1px solid #E5E3DA; border-radius: 8px; padding: 10px 12px; }
  .kpi .label { font-size: 10.5px; color: #888780; text-transform: uppercase; }
  .kpi .value { font-size: 20px; font-weight: 700; color: #0A5C36; margin-top: 2px; }
  h2 { font-size: 14px; color: #3d3d3a; border-bottom: 2px solid #0A5C36; padding-bottom: 4px; margin: 22px 0 10px; page-break-after: avoid; }
  table { page-break-inside: avoid; }
</style>
</head>
<body>
  <h1>Laporan — Pegadaian Mikro &amp; Emas Leads Tracker</h1>
  <div class="sub">Periode: ${formatTanggalPanjang(fromStr)} s/d ${formatTanggalPanjang(toStr)} &nbsp;•&nbsp; Dicetak: ${genAt}</div>

  <div class="kpi">
    <div><div class="label">Total leads</div><div class="value">${data.total}</div></div>
    <div><div class="label">Leads cair</div><div class="value">${data.closing}</div></div>
    <div><div class="label">Konversi</div><div class="value">${data.conversion}%</div></div>
    <div><div class="label">Pipeline aktif</div><div class="value">${data.activePipeline}</div></div>
  </div>

  <h2>Leads masuk per tanggal</h2>
  ${barChartHtml(data.dateRows, "tanggal", "jumlah", "#0A5C36")}
  <table ${tableStyle}>
    <tr><th ${thStyle}>Tanggal</th><th ${thStyle}>Jumlah leads</th></tr>
    ${rowsHtml(data.dateRows, ["tanggal", "jumlah"])}
  </table>

  <h2>Perbandingan kategori produk</h2>
  ${barChartHtml(data.categoryRows, "kategori", "total", "#0A5C36")}
  <table ${tableStyle}>
    <tr><th ${thStyle}>Kategori</th><th ${thStyle}>Total</th><th ${thStyle}>Closing</th><th ${thStyle}>%</th><th ${thStyle}>Produk unggulan</th></tr>
    ${rowsHtml(data.categoryRows, ["kategori", "total", "closing", "pct", "driver"])}
  </table>

  <h2>Distribusi status leads</h2>
  ${barChartHtml(data.statusRows, "status", "jumlah", "#378ADD")}
  <table ${tableStyle}>
    <tr><th ${thStyle}>Status</th><th ${thStyle}>Jumlah</th></tr>
    ${rowsHtml(data.statusRows, ["status", "jumlah"])}
  </table>

  <h2>Leaderboard pemasar (top 10)</h2>
  ${barChartHtml(data.pemasarRows, "nama", "jumlah", "#A37F15")}
  <table ${tableStyle}>
    <tr><th ${thStyle}>Pemasar</th><th ${thStyle}>Jumlah leads</th></tr>
    ${rowsHtml(data.pemasarRows, ["nama", "jumlah"])}
  </table>

  <h2>Kontribusi per unit kerja</h2>
  ${barChartHtml(data.unitRows, "unit", "jumlah", "#534AB7")}
  <table ${tableStyle}>
    <tr><th ${thStyle}>Unit kerja</th><th ${thStyle}>Jumlah leads</th></tr>
    ${rowsHtml(data.unitRows, ["unit", "jumlah"])}
  </table>

  <h2>Distribusi sumber prospek</h2>
  ${barChartHtml(data.sumberRows, "sumber", "jumlah", "#0C8599")}
  <table ${tableStyle}>
    <tr><th ${thStyle}>Sumber</th><th ${thStyle}>Jumlah</th></tr>
    ${rowsHtml(data.sumberRows, ["sumber", "jumlah"])}
  </table>
</body></html>`;
}

function startOfWeek(d) {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return monday;
}

function ReportPanel({ leads }) {
  const todayStrNow = todayStr();
  const [fromStr, setFromStr] = useState(() => startOfWeek(new Date()).toISOString().slice(0, 10));
  const [toStr, setToStr] = useState(todayStrNow);

  const filteredLeads = useMemo(() => leads.filter((l) => l.tanggal >= fromStr && l.tanggal <= toStr), [leads, fromStr, toStr]);
  const data = useMemo(() => buildReportData(filteredLeads), [filteredLeads]);

  const handleDownload = () => {
    const html = buildReportHtml({ fromStr, toStr, data });
    const win = window.open("", "_blank");
    if (!win) { alert("Popup diblokir browser. Izinkan popup untuk situs ini agar bisa mengunduh laporan."); return; }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
    setTimeout(() => { win.focus(); win.print(); }, 400);
  };

  const handleDownloadPng = () => {
    const barSections = [
      { title: "Leads masuk per tanggal", rows: data.dateRows, labelKey: "tanggal", valueKey: "jumlah", color: "#0A5C36" },
      { title: "Leaderboard pemasar (top 10)", rows: data.pemasarRows, labelKey: "nama", valueKey: "jumlah", color: "#A37F15" },
      { title: "Kontribusi per unit kerja", rows: data.unitRows, labelKey: "unit", valueKey: "jumlah", color: "#534AB7" },
      { title: "Distribusi sumber prospek", rows: data.sumberRows, labelKey: "sumber", valueKey: "jumlah", color: "#0C8599" },
    ];

    const width = 640;
    const padding = 24;
    const rowH = 22;
    const sectionTitleH = 26;
    const sectionGap = 16;
    const headerH = 60;
    const kpiH = 76;
    const pieRowH = 190;

    let sectionsHeight = 0;
    barSections.forEach((s) => { sectionsHeight += sectionTitleH + Math.max(s.rows.length, 1) * rowH + sectionGap; });

    const canvasWidth = width + padding * 2;
    const canvasHeight = headerH + kpiH + pieRowH + sectionsHeight + padding;

    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#0A5C36";
    ctx.font = "bold 18px Arial, sans-serif";
    ctx.fillText(`Laporan — Pegadaian Mikro & Emas`, padding, 28);
    ctx.fillStyle = "#5F5E5A";
    ctx.font = "12px Arial, sans-serif";
    const genAt = new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });
    ctx.fillText(`Periode: ${formatTanggalPanjang(fromStr)} s/d ${formatTanggalPanjang(toStr)}  •  Dicetak: ${genAt}`, padding, 46);

    const kpis = [
      { label: "Total leads", value: String(data.total) },
      { label: "Leads cair", value: String(data.closing) },
      { label: "Konversi", value: `${data.conversion}%` },
      { label: "Pipeline aktif", value: String(data.activePipeline) },
    ];
    const kpiBoxW = (width - 3 * 12) / 4;
    let kx = padding;
    const kpiY = headerH + 8;
    kpis.forEach((k) => {
      ctx.strokeStyle = "#E5E3DA";
      ctx.lineWidth = 1;
      ctx.strokeRect(kx, kpiY, kpiBoxW, 56);
      ctx.fillStyle = "#888780";
      ctx.font = "10px Arial, sans-serif";
      ctx.fillText(k.label.toUpperCase(), kx + 10, kpiY + 20);
      ctx.fillStyle = "#0A5C36";
      ctx.font = "bold 18px Arial, sans-serif";
      ctx.fillText(k.value, kx + 10, kpiY + 42);
      kx += kpiBoxW + 12;
    });

    // --- Baris diagram pie: kategori produk & distribusi status ---
    const drawPieSection = (px, py, pw, title, rows, labelKey, valueKey, colors) => {
      ctx.fillStyle = "#3d3d3a";
      ctx.font = "bold 13px Arial, sans-serif";
      ctx.fillText(title, px, py + 14);
      ctx.strokeStyle = "#0A5C36";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py + 20);
      ctx.lineTo(px + pw, py + 20);
      ctx.stroke();

      const total = rows.reduce((a, r) => a + r[valueKey], 0);
      const radius = 52;
      const cx = px + radius + 4;
      const cy = py + 20 + radius + 14;

      if (rows.length === 0 || total === 0) {
        ctx.fillStyle = "#888780";
        ctx.font = "11px Arial, sans-serif";
        ctx.fillText("Tidak ada data.", px, py + 44);
        return;
      }

      let startAngle = -Math.PI / 2;
      rows.forEach((r, i) => {
        const angle = (r[valueKey] / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        startAngle += angle;
      });
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      let ly = py + 34;
      const legendX = px + radius * 2 + 22;
      rows.forEach((r, i) => {
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(legendX, ly - 8, 10, 10);
        ctx.fillStyle = "#3d3d3a";
        ctx.font = "10.5px Arial, sans-serif";
        const pct = ((r[valueKey] / total) * 100).toFixed(0);
        let label = String(r[labelKey]);
        if (label.length > 20) label = label.slice(0, 19) + "…";
        ctx.fillText(`${label} — ${r[valueKey]} (${pct}%)`, legendX + 16, ly);
        ly += 16;
      });
    };

    const pieY = headerH + kpiH;
    const pieColW = (width - 20) / 2;
    drawPieSection(padding, pieY, pieColW, "Perbandingan kategori produk", data.categoryRows, "kategori", "total", ["#0A5C36", "#A37F15", "#D85A30"]);
    drawPieSection(padding + pieColW + 20, pieY, pieColW, "Distribusi status leads", data.statusRows, "status", "jumlah", ["#0A5C36", "#1D9E75", "#378ADD", "#A37F15", "#EF9F27", "#A32D2D"]);

    // --- Diagram batang untuk sisanya ---
    let y = headerH + kpiH + pieRowH;
    barSections.forEach((s) => {
      ctx.fillStyle = "#3d3d3a";
      ctx.font = "bold 13px Arial, sans-serif";
      ctx.fillText(s.title, padding, y + 14);
      ctx.strokeStyle = "#0A5C36";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, y + 20);
      ctx.lineTo(padding + width, y + 20);
      ctx.stroke();
      y += sectionTitleH;

      if (s.rows.length === 0) {
        ctx.fillStyle = "#888780";
        ctx.font = "11px Arial, sans-serif";
        ctx.fillText("Tidak ada data.", padding, y + 14);
        y += rowH;
      } else {
        const max = Math.max(1, ...s.rows.map((r) => r[s.valueKey]));
        const labelW = 150;
        const valueW = 40;
        const barMaxW = width - labelW - valueW - 10;
        s.rows.forEach((r) => {
          const barW = Math.max((r[s.valueKey] / max) * barMaxW, 3);
          ctx.fillStyle = "#5F5E5A";
          ctx.font = "10.5px Arial, sans-serif";
          let label = String(r[s.labelKey]);
          if (label.length > 24) label = label.slice(0, 23) + "…";
          ctx.textAlign = "right";
          ctx.fillText(label, padding + labelW - 8, y + 14);
          ctx.textAlign = "left";
          ctx.fillStyle = "#F1EFE8";
          ctx.fillRect(padding + labelW, y + 4, barMaxW, 13);
          ctx.fillStyle = s.color;
          ctx.fillRect(padding + labelW, y + 4, barW, 13);
          ctx.fillStyle = "#3d3d3a";
          ctx.font = "bold 10.5px Arial, sans-serif";
          ctx.fillText(String(r[s.valueKey]), padding + labelW + barMaxW + 8, y + 14);
          y += rowH;
        });
      }
      y += sectionGap;
    });

    const link = document.createElement("a");
    link.download = `laporan-${fromStr}-sd-${toStr}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 11.5, color: "#888780", marginBottom: 4 }}>Dari tanggal</div>
            <input type="date" value={fromStr} max={toStr} onChange={(e) => setFromStr(e.target.value)} style={{ ...inputStyle, padding: "7px 10px" }} />
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "#888780", marginBottom: 4 }}>Sampai tanggal</div>
            <input type="date" value={toStr} min={fromStr} max={todayStrNow} onChange={(e) => setToStr(e.target.value)} style={{ ...inputStyle, padding: "7px 10px" }} />
          </div>
        </div>
        <ExportMenu onExportPng={handleDownloadPng} onExportPdf={handleDownload} />
      </div>

      <div style={{ fontSize: 12, color: "#888780", marginBottom: 16 }}>
        Periode: {formatTanggalPanjang(fromStr)} s/d {formatTanggalPanjang(toStr)} — {data.total} leads tercakup. Tombol unduh akan membuka dialog cetak (pilih "Simpan sebagai PDF") atau menyimpan langsung sebagai gambar PNG.
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Leads masuk per tanggal</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.dateRows} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
            <XAxis dataKey="tanggal" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" height={45} interval="preserveStartEnd" tickFormatter={(d) => (d && d.length >= 10 ? d.slice(5) : d)} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="jumlah" fill="#0A5C36" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Perbandingan kategori produk</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.categoryRows} margin={{ bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
              <XAxis dataKey="kategori" tick={{ fontSize: 9.5 }} interval={0} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={26} />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="total" fill="#0A5C36" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="total" position="top" style={{ fontSize: 11, fill: "#3d3d3a" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Leaderboard pemasar (top 10)</div>
          <ResponsiveContainer width="100%" height={Math.max(180, data.pemasarRows.length * 26)}>
            <BarChart data={data.pemasarRows} layout="vertical" margin={{ left: 10, right: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="nama" width={90} tick={{ fontSize: 10 }} />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="jumlah" fill="#A37F15" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="jumlah" position="right" style={{ fontSize: 10.5, fill: "#3d3d3a", fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Distribusi status leads</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={data.statusRows} dataKey="jumlah" nameKey="status" cx="50%" cy="42%" innerRadius={36} outerRadius={62}>
                {data.statusRows.map((_, i) => <Cell key={i} fill={["#0A5C36", "#1D9E75", "#378ADD", "#A37F15", "#EF9F27", "#A32D2D"][i % 6]} />)}
              </Pie>
              <Legend verticalAlign="bottom" height={40} wrapperStyle={{ fontSize: 10.5 }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Kontribusi per unit kerja</div>
          <ResponsiveContainer width="100%" height={Math.max(180, data.unitRows.length * 30)}>
            <BarChart data={data.unitRows} layout="vertical" margin={{ left: 10, right: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFEEE8" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="unit" width={90} tick={{ fontSize: 10 }} />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="jumlah" fill="#534AB7" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="jumlah" position="right" style={{ fontSize: 10.5, fill: "#3d3d3a", fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


function AdminDashboard({ leads, onUpdate, onOpenSimulasi }) {
  const [tab, setTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const totalLeads = leads.length;
  const disbursed = leads.filter((l) => l.status === "DISBURSED").length;
  const activePipeline = leads.filter((l) => !["DISBURSED", "REJECTED"].includes(l.status)).length;
  const conversion = totalLeads ? ((disbursed / totalLeads) * 100).toFixed(1) : "0.0";

  const tabs = [
    { key: "Dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#378ADD" },
    { key: "Semua Prospek", label: "Daftar prospek", icon: List, color: "#7F77DD" },
    { key: "Non-Gadai (Mikro)", label: "Mikro (non-gadai)", icon: Users, color: "#1D9E75" },
    { key: "Gadai Angsuran", label: "Gadai angsuran", icon: Coins, color: "#A37F15" },
    { key: "Investasi Emas", label: "Investasi emas", icon: Gem, color: "#EF9F27" },
    { key: "Leaderboard", label: "Leaderboard pemasar", icon: Trophy, color: "#534AB7" },
    { key: "Hasil Follow Up", label: "Hasil follow up", icon: History, color: "#0C8599" },
    { key: "Laporan", label: "Laporan", icon: FileDown, color: "#B3436B" },
  ];
  const activeTab = tabs.find((t) => t.key === tab);
  const CATEGORY_KEYS = ["Non-Gadai (Mikro)", "Gadai Angsuran", "Investasi Emas"];
  const preGroupTabs = tabs.filter((t) => ["Dashboard", "Semua Prospek"].includes(t.key));
  const categoryTabs = tabs.filter((t) => CATEGORY_KEYS.includes(t.key));
  const postGroupTabs = tabs.filter((t) => ["Leaderboard", "Hasil Follow Up", "Laporan"].includes(t.key));
  const [productMenuOpen, setProductMenuOpen] = useState(true);

  const renderTabButton = (t, indent) => {
    const Icon = t.icon;
    const active = tab === t.key;
    return (
      <button key={t.key} onClick={() => setTab(t.key)} title={t.label} style={{
        display: "flex", alignItems: "center", gap: sidebarOpen ? 10 : 0, justifyContent: sidebarOpen ? "flex-start" : "center",
        width: "100%", textAlign: "left",
        padding: sidebarOpen ? `10px 12px 10px ${indent ? 30 : 12}px` : "10px 0",
        borderRadius: 8, border: "none", cursor: "pointer", fontSize: indent && sidebarOpen ? 13 : 13.5, fontWeight: 500,
        marginBottom: 2, background: active ? t.color : "transparent", color: active ? "#fff" : "#3d3d3a",
      }}>
        <Icon size={indent ? 14 : 16} />
        {sidebarOpen && t.label}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", gap: sidebarOpen ? 24 : 14, alignItems: "flex-start" }}>
      <div style={{ width: sidebarOpen ? 220 : 56, transition: "width 0.15s ease", flexShrink: 0, background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: 10, position: "sticky", top: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "space-between" : "center", padding: "6px 4px 10px" }}>
          {sidebarOpen && <div style={{ fontSize: 11, fontWeight: 600, color: "#888780", textTransform: "uppercase", letterSpacing: 0.4 }}>Menu</div>}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Sembunyikan menu" : "Tampilkan menu"}
            style={{ background: "#F1EFE8", border: "none", borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#3d3d3a", flexShrink: 0 }}
          >
            {sidebarOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
          </button>
        </div>

        {preGroupTabs.map((t) => renderTabButton(t, false))}

        <button
          onClick={() => setProductMenuOpen((o) => !o)}
          title="Jenis Produk"
          style={{
            display: "flex", alignItems: "center", gap: sidebarOpen ? 10 : 0, justifyContent: sidebarOpen ? "space-between" : "center",
            width: "100%", textAlign: "left", padding: sidebarOpen ? "10px 12px" : "10px 0",
            borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 500,
            marginBottom: 2, background: CATEGORY_KEYS.includes(tab) ? "#F1EFE8" : "transparent", color: "#3d3d3a",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Layers size={16} />
            {sidebarOpen && "Jenis Produk"}
          </span>
          {sidebarOpen && (
            <ChevronRight size={13} style={{ transform: productMenuOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s", opacity: 0.6, flexShrink: 0 }} />
          )}
        </button>
        {(!sidebarOpen || productMenuOpen) && categoryTabs.map((t) => renderTabButton(t, true))}

        {postGroupTabs.map((t) => renderTabButton(t, false))}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {tab === "Dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            <KpiCard icon={<Users size={16} color="#0A5C36" />} label="Total leads masuk" value={totalLeads} sub="Semua kategori produk" color="#0A5C36" />
            <KpiCard icon={<CheckCircle2 size={16} color="#1D9E75" />} label="Leads berhasil cair" value={disbursed} sub="Status: DISBURSED" color="#1D9E75" />
            <KpiCard icon={<TrendingUp size={16} color="#A37F15" />} label="Rasio konversi" value={`${conversion}%`} sub="Leads cair vs total leads" color="#A37F15" />
            <KpiCard icon={<Clock size={16} color="#378ADD" />} label="Prospek active pipeline" value={activePipeline} sub="Masih dalam tindak lanjut" color="#378ADD" />
          </div>
        )}

        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14 }}>{activeTab.label}</div>

        {tab === "Dashboard" ? (
          <DashboardOverview leads={leads} onNavigate={setTab} />
        ) : tab === "Semua Prospek" ? (
          <AllLeadsPanel leads={leads} onUpdate={onUpdate} onOpenSimulasi={onOpenSimulasi} />
        ) : tab === "Leaderboard" ? (
          <LeaderboardPanel leads={leads} />
        ) : tab === "Hasil Follow Up" ? (
          <FollowUpPanel leads={leads} />
        ) : tab === "Laporan" ? (
          <ReportPanel leads={leads} />
        ) : (
          <CategoryPanel leads={leads} kategori={tab} chartColor={activeTab.color} onUpdate={onUpdate} onOpenSimulasi={onOpenSimulasi} />
        )}
      </div>
    </div>
  );
}

function AdminGate({ onUnlock }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      setError("");
      onUnlock();
    } else {
      setError("Password salah. Coba lagi.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 12, padding: 32, width: "100%", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "#EAF3DE", margin: "0 auto 14px" }}>
          <Lock size={20} color="#0A5C36" />
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, textAlign: "center", marginBottom: 4 }}>Dashboard admin terkunci</div>
        <div style={{ fontSize: 13, color: "#888780", textAlign: "center", marginBottom: 18 }}>Masukkan password untuk melanjutkan.</div>
        <input
          type="password"
          autoFocus
          style={inputStyle}
          value={pwd}
          onChange={(e) => { setPwd(e.target.value); setError(""); }}
          placeholder="Password"
        />
        {error && (
          <div style={{ display: "flex", gap: 6, alignItems: "center", color: "#A32D2D", fontSize: 13, marginTop: 8 }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <button type="submit" style={{ width: "100%", marginTop: 16, background: "#0A5C36", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          Masuk
        </button>
      </form>
    </div>
  );
}

const SIMULASI_TENORS = [12, 18, 24, 36];
const SIMULASI_TLO_RATE = { 12: 0.018, 18: 0.0261, 24: 0.0342, 36: 0.0486 };
const SIMULASI_IJK_RATE = {
  eksternal: { 12: 0.00766, 18: 0.00926, 24: 0.01301, 36: 0.0183 },
  internal: { 12: 0.00225, 18: 0.00379, 24: 0.00456, 36: 0.0064 },
};
const SIMULASI_ADMINISTRASI = 100000;
const SIMULASI_SEWA_MODAL = { eksternal: 0.0117, internal: 0.00581 };
const SIMULASI_DISKON_UJRAH_RATE = 0.0056;
const SIMULASI_NOTARIS_FIDUSIA_TABLE = [
  { min: 1000, jenis: "Warmeking", biaya: 65000 },
  { min: 50000001, jenis: "Fidusia", biaya: 450000 },
  { min: 75000001, jenis: "Fidusia", biaya: 525000 },
  { min: 100000001, jenis: "Fidusia", biaya: 800000 },
  { min: 150000001, jenis: "Fidusia", biaya: 1025000 },
  { min: 200000001, jenis: "Fidusia", biaya: 1225000 },
];

function lookupNotarisFidusia(uangPinjaman) {
  let result = null;
  for (const row of SIMULASI_NOTARIS_FIDUSIA_TABLE) {
    if (row.min <= uangPinjaman) result = row; else break;
  }
  return result || { jenis: "-", biaya: 0 };
}

// --- Tabel & konfigurasi bersama untuk Arrum BPKB & Arrum Multiguna ---

const DISKON_MUNAH_AKAD_TABLE = [
  { min: 0, rate: 0.9943 },
  { min: 0.005, rate: 0.9871 },
  { min: 0.01, rate: 0.98 },
  { min: 0.015, rate: 0.9729 },
  { min: 0.02, rate: 0.9657 },
  { min: 0.025, rate: 0.9586 },
  { min: 0.03, rate: 0.9514 },
  { min: 0.035, rate: 0.9443 },
  { min: 0.04, rate: 0.9371 },
  { min: 0.045, rate: 0.93 },
  { min: 0.05, rate: 0.9229 },
  { min: 0.055, rate: 0.9157 },
  { min: 0.06, rate: 0.9086 },
  { min: 0.065, rate: 0.9014 },
  { min: 0.07, rate: 0.8943 },
  { min: 0.075, rate: 0.8871 },
  { min: 0.08, rate: 0.88 },
  { min: 0.085, rate: 0.8729 },
  { min: 0.09, rate: 0.8657 },
  { min: 0.095, rate: 0.8586 },
  { min: 0.1, rate: 0.8514 },
  { min: 0.105, rate: 0.8443 },
  { min: 0.11, rate: 0.8371 },
  { min: 0.115, rate: 0.83 },
  { min: 0.12, rate: 0.8229 },
  { min: 0.125, rate: 0.8157 },
  { min: 0.13, rate: 0.8086 },
  { min: 0.135, rate: 0.8014 },
  { min: 0.14, rate: 0.7943 },
  { min: 0.145, rate: 0.7871 },
  { min: 0.15, rate: 0.78 },
  { min: 0.155, rate: 0.7729 },
  { min: 0.16, rate: 0.7657 },
  { min: 0.165, rate: 0.7586 },
  { min: 0.17, rate: 0.7514 },
  { min: 0.175, rate: 0.7443 },
  { min: 0.18, rate: 0.7371 },
  { min: 0.185, rate: 0.73 },
  { min: 0.19, rate: 0.7229 },
  { min: 0.195, rate: 0.7157 },
  { min: 0.2, rate: 0.7086 },
  { min: 0.205, rate: 0.7014 },
  { min: 0.21, rate: 0.6943 },
  { min: 0.215, rate: 0.6871 },
  { min: 0.22, rate: 0.68 },
  { min: 0.225, rate: 0.6729 },
  { min: 0.23, rate: 0.6657 },
  { min: 0.235, rate: 0.6586 },
  { min: 0.24, rate: 0.6514 },
  { min: 0.245, rate: 0.6443 },
  { min: 0.25, rate: 0.6371 },
  { min: 0.255, rate: 0.63 },
  { min: 0.26, rate: 0.6229 },
  { min: 0.265, rate: 0.6157 },
  { min: 0.27, rate: 0.6086 },
  { min: 0.275, rate: 0.6014 },
  { min: 0.28, rate: 0.5943 },
  { min: 0.285, rate: 0.5871 },
  { min: 0.29, rate: 0.58 },
  { min: 0.295, rate: 0.5729 },
  { min: 0.3, rate: 0.5657 },
  { min: 0.305, rate: 0.5586 },
  { min: 0.31, rate: 0.5514 },
  { min: 0.315, rate: 0.5443 },
  { min: 0.32, rate: 0.5371 },
  { min: 0.325, rate: 0.53 },
  { min: 0.33, rate: 0.5229 },
  { min: 0.335, rate: 0.5157 },
  { min: 0.34, rate: 0.5086 },
  { min: 0.345, rate: 0.5014 },
  { min: 0.35, rate: 0.4943 },
  { min: 0.355, rate: 0.4871 },
  { min: 0.36, rate: 0.48 },
  { min: 0.365, rate: 0.4729 },
  { min: 0.37, rate: 0.4657 },
  { min: 0.375, rate: 0.4586 },
  { min: 0.38, rate: 0.4514 },
  { min: 0.385, rate: 0.4443 },
  { min: 0.39, rate: 0.4371 },
  { min: 0.395, rate: 0.43 },
  { min: 0.4, rate: 0.4229 },
  { min: 0.405, rate: 0.4157 },
  { min: 0.41, rate: 0.4086 },
  { min: 0.415, rate: 0.4014 },
  { min: 0.42, rate: 0.3943 },
  { min: 0.425, rate: 0.3871 },
  { min: 0.43, rate: 0.38 },
  { min: 0.435, rate: 0.3729 },
  { min: 0.44, rate: 0.3657 },
  { min: 0.445, rate: 0.3586 },
  { min: 0.45, rate: 0.3514 },
  { min: 0.455, rate: 0.3443 },
  { min: 0.46, rate: 0.3371 },
  { min: 0.465, rate: 0.33 },
  { min: 0.47, rate: 0.3229 },
  { min: 0.475, rate: 0.3157 },
  { min: 0.48, rate: 0.3086 },
  { min: 0.485, rate: 0.3014 },
  { min: 0.49, rate: 0.2943 },
  { min: 0.495, rate: 0.2871 },
  { min: 0.5, rate: 0.28 },
  { min: 0.505, rate: 0.2729 },
  { min: 0.51, rate: 0.2657 },
  { min: 0.515, rate: 0.2586 },
  { min: 0.52, rate: 0.2514 },
  { min: 0.525, rate: 0.2443 },
  { min: 0.53, rate: 0.2371 },
  { min: 0.535, rate: 0.23 },
  { min: 0.54, rate: 0.2229 },
  { min: 0.545, rate: 0.2157 },
  { min: 0.55, rate: 0.2086 },
  { min: 0.555, rate: 0.2014 },
  { min: 0.56, rate: 0.1943 },
  { min: 0.565, rate: 0.1871 },
  { min: 0.57, rate: 0.18 },
  { min: 0.575, rate: 0.1729 },
  { min: 0.58, rate: 0.1657 },
  { min: 0.585, rate: 0.1586 },
  { min: 0.59, rate: 0.1514 },
  { min: 0.595, rate: 0.1443 },
  { min: 0.6, rate: 0.1371 },
  { min: 0.605, rate: 0.13 },
  { min: 0.61, rate: 0.1229 },
  { min: 0.615, rate: 0.1157 },
  { min: 0.62, rate: 0.1086 },
  { min: 0.625, rate: 0.1014 },
  { min: 0.63, rate: 0.0943 },
  { min: 0.635, rate: 0.0871 },
  { min: 0.64, rate: 0.08 },
  { min: 0.645, rate: 0.0729 },
  { min: 0.65, rate: 0.0657 },
  { min: 0.655, rate: 0.0586 },
  { min: 0.66, rate: 0.0514 },
  { min: 0.665, rate: 0.0443 },
  { min: 0.67, rate: 0.0371 },
  { min: 0.675, rate: 0.03 },
  { min: 0.68, rate: 0.0229 },
  { min: 0.685, rate: 0.0157 },
  { min: 0.69, rate: 0.0086 },
  { min: 0.695, rate: 0 },
  { min: 0.7001, rate: 0 }
];

function lookupDiskonMunahAkad(rasio) {
  if (rasio < 0) return 0;
  let result = 0;
  for (const row of DISKON_MUNAH_AKAD_TABLE) {
    if (row.min <= rasio) result = row.rate; else break;
  }
  return result;
}

const DISKON_MUNAH_TABLE = [
  { min: 0.01, rate: 0.985 }, { min: 0.015, rate: 0.9714 }, { min: 0.025, rate: 0.96 },
  { min: 0.035, rate: 0.94 }, { min: 0.045, rate: 0.93 }, { min: 0.055, rate: 0.91 },
  { min: 0.065, rate: 0.9 }, { min: 0.075, rate: 0.88 }, { min: 0.095, rate: 0.845 },
  { min: 0.115, rate: 0.815 }, { min: 0.135, rate: 0.785 }, { min: 0.155, rate: 0.76 },
  { min: 0.175, rate: 0.73 }, { min: 0.195, rate: 0.7 }, { min: 0.215, rate: 0.67 },
  { min: 0.235, rate: 0.63 }, { min: 0.265, rate: 0.585 }, { min: 0.295, rate: 0.54 },
  { min: 0.325, rate: 0.5 }, { min: 0.355, rate: 0.46 }, { min: 0.385, rate: 0.415 },
  { min: 0.415, rate: 0.37 }, { min: 0.445, rate: 0.33 }, { min: 0.475, rate: 0.285 },
  { min: 0.505, rate: 0.24 }, { min: 0.535, rate: 0.19 }, { min: 0.575, rate: 0.13 },
  { min: 0.615, rate: 0.07 }, { min: 0.655, rate: 0.015 }, { min: 0.695, rate: 0 },
];

function lookupDiskonMunah(rasio) {
  if (rasio < 0.01) return 0.985;
  let result = 0;
  for (const row of DISKON_MUNAH_TABLE) {
    if (row.min <= rasio) result = row.rate; else break;
  }
  return result;
}

const TARIF_MUNAH_TIERING_TABLE = [
  { min: 1, rate: 0.0105 },
  { min: 10000001, rate: 0.00875 },
  { min: 50000001, rate: 0.00805 },
];

function lookupTarifMunahTiering(uangPinjaman) {
  let result = 0.00805;
  for (const row of TARIF_MUNAH_TIERING_TABLE) {
    if (row.min <= uangPinjaman) result = row.rate; else break;
  }
  return result;
}

function roundUpTo(value, negDigits) {
  const factor = Math.pow(10, -negDigits);
  return Math.ceil((value || 0) / factor) * factor;
}

const AGUNAN_PRODUCTS = {
  arrum_bpkb: {
    label: "Arrum BPKB / Mikro",
    titleLong: "SIMULASI PENCAIRAN & ANGSURAN - PEGADAIAN ARRUM BPKB / MIKRO",
    subLabel: "",
    unitKerja: "",
    allTenors: [12, 18, 24, 36, 48, 60],
    asuransiKendaraan: { 12: 0.00375, 18: 0.00438, 24: 0.00531, 36: 0.00662, 48: 0.00796, 60: 0.00924 },
    asuransiJiwa: { 12: 0.01125, 18: 0.01314, 24: 0.01593, 36: 0.01987, 48: 0.02389, 60: 0.02775 },
    asuransiJiwaLabel: "Asuransi Jiwa (Takaful Akhyar)",
    roundTo: -3,
    tarifPemeliharaan: () => 0.007,
    tarifPemeliharaanLabel: "0,7% x Taksiran / Bulan (Standar)",
    kemampuanBayar: (ctx, tenor) => (2 * ctx.rpc * tenor) / (4.5 * (1 + 0.007 * tenor)),
  },
  arrum_multiguna: {
    label: "Arrum Multiguna",
    titleLong: "SIMULASI PENCAIRAN & ANGSURAN - PEGADAIAN ARRUM MULTIGUNA",
    subLabel: "Maksimal Plafon Rp 100 Juta & Tenor s.d. 36 Bulan",
    unitKerja: "",
    allTenors: [12, 18, 24, 36],
    asuransiKendaraan: { 12: 0.00375, 18: 0.00438, 24: 0.00531, 36: 0.00662 },
    asuransiJiwa: { 12: 0.0113, 18: 0.0143, 24: 0.0193, 36: 0.0238 },
    asuransiJiwaLabel: "Asuransi Jiwa Multiguna (Rate Baru 2026)",
    roundTo: -2,
    tarifPemeliharaan: (up) => lookupTarifMunahTiering(up),
    tarifPemeliharaanLabel: "Tiering sesuai UP (0,805% - 1,05%)",
    kemampuanBayar: (ctx, tenor) => tenor * (ctx.rpc * 0.5 - ctx.taksiran * ctx.tarifPemeliharaan * (1 - ctx.diskonMunah)),
  },
};

function computeAgunanSimulasi(productKey, { rpc, taksiran, up }) {
  const cfg = AGUNAN_PRODUCTS[productKey] || AGUNAN_PRODUCTS.arrum_bpkb;
  const isMultiguna = productKey === "arrum_multiguna";
  const plafonLtv = isMultiguna ? Math.min(taksiran * 0.7, 100000000) : taksiran * 0.7;
  const rasio = taksiran ? up / taksiran : 0;

  // Diskon & Biaya Mu'nah Akad
  let diskonMunahAkad = 0;
  let munahAkad = 0;
  if (!isMultiguna) {
    if (up > 100000000) {
      diskonMunahAkad = 0;
      munahAkad = 250000;
    } else {
      diskonMunahAkad = lookupDiskonMunahAkad(rasio);
      munahAkad = (taksiran * 0.007) * (1 - diskonMunahAkad);
    }
  } else {
    diskonMunahAkad = 0;
    munahAkad = taksiran * 0.007;
  }

  // Diskon & Tarif Mu'nah Pemeliharaan
  const diskonMunahPemeliharaan = lookupDiskonMunah(rasio);
  const tarifPemeliharaan = cfg.tarifPemeliharaan(up);
  const munahKotor = taksiran * tarifPemeliharaan;
  const potonganDiskon = munahKotor * diskonMunahPemeliharaan;
  const munahBersih = munahKotor - potonganDiskon;

  const notarisInfo = lookupNotarisFidusia(up);
  const tenors = cfg.allTenors;

  const perTenor = tenors.map((tenor) => {
    const isAvailable = !isMultiguna
      ? (tenor <= 36 || up > 100000000)
      : (up >= 1000000 && up <= 100000000);

    if (!isAvailable) {
      return {
        tenor,
        isAvailable: false,
        up: null,
        munahAkad: null,
        notaris: null,
        asuransiKendaraan: null,
        asuransiJiwa: null,
        totalPotongan: null,
        pencairanBersih: null,
        tarifPemeliharaan: null,
        munahKotor: null,
        potonganDiskon: null,
        munahBersih: null,
        angsuranPokok: null,
        totalAngsuran: null,
        kaliAngsuran: null,
        dbr: null,
        layak: false,
        statusDbr: !isMultiguna
          ? "N/A (UP <= 100Jt)"
          : (up > 100000000 ? "MELEBIHI PLAFON MULTIGUNA (MAKS. 100JT)" : "DI BAWAH MINIMAL PRODUK (MIN. 1JT)"),
        plafonAgunan: null,
        kemampuanBayar: null,
        pinjamanRekomendasi: null,
        memenuhi: false,
        statusRekomendasi: !isMultiguna
          ? "TENOR TIDAK TERSEDIA (UP <= 100Jt)"
          : (up > 100000000 ? "MELEBIHI PLAFON MULTIGUNA (MAKS. 100JT)" : "DI BAWAH MINIMAL PRODUK (MIN. 1JT)"),
      };
    }

    const asuransiKendaraan = up * (cfg.asuransiKendaraan[tenor] || 0);
    const asuransiJiwa = up * (cfg.asuransiJiwa[tenor] || 0);
    const totalPotongan = munahAkad + notarisInfo.biaya + asuransiKendaraan + asuransiJiwa;
    const pencairanBersih = up - totalPotongan;
    const angsuranPokok = tenor ? up / tenor : 0;
    const totalAngsuran = roundUpTo(munahBersih + angsuranPokok, cfg.roundTo);
    const kaliAngsuran = totalAngsuran && rpc ? rpc / totalAngsuran : 0;
    const dbr = rpc ? totalAngsuran / rpc : 0;
    const layak = dbr <= 0.40;
    const statusDbr = layak ? "LAYAK (OK)" : "MELEBIHI LIMIT";

    const kemampuanBayar = cfg.kemampuanBayar({ rpc, taksiran, up, tarifPemeliharaan, diskonMunah: diskonMunahPemeliharaan }, tenor);
    const pinjamanRekomendasi = isMultiguna
      ? Math.min(plafonLtv, kemampuanBayar, 100000000)
      : Math.min(plafonLtv, kemampuanBayar);
    const memenuhi = up <= pinjamanRekomendasi;
    const statusRekomendasi = memenuhi ? "MEMENUHI REKOMENDASI" : "MELEBIHI REKOMENDASI";

    return {
      tenor,
      isAvailable: true,
      up,
      asuransiKendaraan,
      asuransiJiwa,
      notaris: notarisInfo.biaya,
      munahAkad,
      totalPotongan,
      pencairanBersih,
      tarifPemeliharaan,
      munahKotor,
      potonganDiskon,
      angsuranPokok,
      munahBersih,
      totalAngsuran,
      kaliAngsuran,
      dbr,
      layak,
      statusDbr,
      plafonAgunan: plafonLtv,
      kemampuanBayar,
      pinjamanRekomendasi,
      memenuhi,
      statusRekomendasi,
    };
  });

  return {
    plafonLtv,
    rasio,
    diskonMunahAkad,
    munahAkad,
    diskonMunahPemeliharaan,
    tarifPemeliharaan,
    munahKotor,
    potonganDiskon,
    munahBersih,
    notarisInfo,
    perTenor,
  };
}

function formatRupiah(n) {
  if (n === null || n === undefined || isNaN(n)) return "-";
  return "Rp " + Math.round(n || 0).toLocaleString("id-ID");
}

const simLabelStyle = {
  display: "block",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: 12.5,
  color: "#3F5A54",
  marginBottom: 6,
};

const simFieldStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #DCD4C0",
  borderRadius: 6,
  background: "#F1E4BD",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: 15,
  color: "#16302C",
  boxSizing: "border-box",
};

const simMetricCardStyle = {
  background: "#F6F3EA",
  border: "1px solid #DCD4C0",
  borderRadius: 8,
  padding: "12px 14px",
};

const simMetricKStyle = {
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: 10.5,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#3F5A54",
};

const simMetricVStyle = {
  fontSize: 16.5,
  fontWeight: 700,
  color: "#123530",
  marginTop: 3,
};

function simThStyle(align) {
  return {
    textAlign: align,
    padding: "10px 10px",
    color: "#3F5A54",
    fontWeight: 600,
    fontSize: 11.5,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    borderBottom: "2px solid #123530",
  };
}

const simTotalRowStyle = {
  fontWeight: 700,
  color: "#123530",
  borderTop: "1px solid #3F5A54",
};

const simAngsuranRowStyle = {
  fontWeight: 700,
  color: "#2F6F4F",
  background: "#EEF6F0",
};

const SIMULASI_TABLE_ROWS = [
  { key: "tlo", label: "TLO (Harga OTR)" },
  { key: "ijk", label: "IJK (Uang Pinjaman)" },
  { key: "administrasi", label: "Administrasi" },
  { key: "notaris", label: "Notaris/Fidusia" },
  { key: "totalDpAdmin", label: "Total DP dan Admin", total: true },
  { key: "angsuran", label: "Angsuran / Bulan", highlight: true },
];

function computeSimulasi(mode, hargaOtr, uangPinjamanInput) {
  const otr = Number(hargaOtr) || 0;
  const uangPinjaman = Number(uangPinjamanInput) || 0;

  const dpKendaraan = otr - uangPinjaman;
  const rasio = otr ? Math.round((uangPinjaman / otr * 100) * 100) / 100 : 0;
  const diskonUjrah = rasio === 90 ? 0 : SIMULASI_DISKON_UJRAH_RATE;
  const notarisInfo = lookupNotarisFidusia(uangPinjaman);
  const sewaModalRate = SIMULASI_SEWA_MODAL[mode];
  const ijkRates = SIMULASI_IJK_RATE[mode];

  const perTenor = SIMULASI_TENORS.map((tenor) => {
    const tlo = otr * SIMULASI_TLO_RATE[tenor];
    const ijk = uangPinjaman * ijkRates[tenor];
    const totalDpAdmin = dpKendaraan + tlo + ijk + SIMULASI_ADMINISTRASI + notarisInfo.biaya;
    const angsuranRaw = (tenor ? uangPinjaman / tenor : 0) + (otr * sewaModalRate * (1 - diskonUjrah));
    const angsuran = Math.ceil(angsuranRaw / 1000) * 1000;
    return { tenor, tlo, ijk, administrasi: SIMULASI_ADMINISTRASI, notaris: notarisInfo.biaya, totalDpAdmin, angsuran };
  });

  return { uangPinjaman, dpKendaraan, rasio, diskonUjrah, notarisInfo, perTenor };
}

function suggestedInternalUP(hargaOtr) {
  const otr = Number(hargaOtr) || 0;
  const alt90 = otr - otr * 0.1;
  return Math.floor(alt90 / 100000) * 100000;
}

function AmanahCalculator({ prefill }) {
  const [mode, setModeRaw] = useState("eksternal");
  const [namaMotor, setNamaMotor] = useState(prefill?.nama ? `Unit prospek ${prefill.nama}` : "");
  const [hargaOtr, setHargaOtr] = useState("");
  const [uangPinjamanInput, setUangPinjamanInput] = useState("");

  const otrNum = Number(hargaOtr) || 0;
  const suggestedUP = suggestedInternalUP(otrNum);
  const result = useMemo(() => computeSimulasi(mode, otrNum, uangPinjamanInput), [mode, otrNum, uangPinjamanInput]);

  const setMode = (m) => {
    setModeRaw(m);
    if (m === "internal") setUangPinjamanInput(String(suggestedInternalUP(otrNum)));
  };

  const handleDownloadPng = () => {
    const width = 480;
    const padding = 24;
    const rowH = 26;
    const headerH = 100;
    const canvasHeight = headerH + 40 + result.perTenor.length * rowH + 60;
    const canvasWidth = width + padding * 2;

    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#0A5C36";
    ctx.font = "bold 16px Arial, sans-serif";
    ctx.fillText("Ringkasan Simulasi Amanah", padding, 28);
    ctx.fillStyle = "#5F5E5A";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText(`Untuk: ${namaMotor || "-"}`, padding, 48);
    ctx.fillText(`Harga OTR: ${formatRupiah(otrNum)}  •  Uang Pinjaman: ${formatRupiah(result.uangPinjaman)}`, padding, 66);
    ctx.fillText(`Dicetak: ${new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}`, padding, 84);

    let y = headerH;
    ctx.fillStyle = "#F8F9FA";
    ctx.fillRect(padding, y, width, 28);
    ctx.fillStyle = "#3d3d3a";
    ctx.font = "bold 11px Arial, sans-serif";
    const cols = ["Tenor", "Total DP & Admin", "Angsuran/Bulan"];
    const colW = width / 3;
    cols.forEach((c, i) => ctx.fillText(c, padding + i * colW + 8, y + 18));
    y += 28;

    ctx.font = "11px Arial, sans-serif";
    result.perTenor.forEach((r, i) => {
      if (i % 2 === 1) { ctx.fillStyle = "#FAFAF8"; ctx.fillRect(padding, y, width, rowH); }
      ctx.fillStyle = "#2C2C2A";
      ctx.fillText(`${r.tenor} bulan`, padding + 8, y + 17);
      ctx.fillText(formatRupiah(r.totalDpAdmin), padding + colW + 8, y + 17);
      ctx.fillStyle = "#0A5C36";
      ctx.font = "bold 11px Arial, sans-serif";
      ctx.fillText(formatRupiah(r.angsuran), padding + colW * 2 + 8, y + 17);
      ctx.font = "11px Arial, sans-serif";
      y += rowH;
    });

    ctx.strokeStyle = "#E5E3DA";
    ctx.strokeRect(padding, headerH, width, 28 + result.perTenor.length * rowH);
    ctx.fillStyle = "#888780";
    ctx.font = "9.5px Arial, sans-serif";
    ctx.fillText("Simulasi bersifat sementara, dapat berubah mengikuti ketentuan tarif/approval yang berlaku.", padding, y + 18);

    const link = document.createElement("a");
    link.download = `simulasi-amanah-${namaMotor ? namaMotor.replace(/\s+/g, "-").toLowerCase() : "produk"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadPdf = () => {
    const rowsHtml = result.perTenor.map((r) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #F1EFE8;">${r.tenor} bulan</td>
        <td style="padding:8px 10px;border-bottom:1px solid #F1EFE8;">${formatRupiah(r.totalDpAdmin)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #F1EFE8;font-weight:700;color:#0A5C36;">${formatRupiah(r.angsuran)}</td>
      </tr>`).join("");

    const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8" /><title>Simulasi Amanah</title>
<style>
  @page { margin: 20mm 16mm; }
  body { font-family: Arial, Helvetica, sans-serif; color: #2C2C2A; margin: 0; padding: 24px; }
  h1 { color: #0A5C36; font-size: 19px; margin: 0 0 6px; }
  .sub { color: #5F5E5A; font-size: 12px; margin-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
  th { text-align: left; padding: 8px 10px; background: #F8F9FA; color: #5F5E5A; border-bottom: 1px solid #E5E3DA; }
  .note { margin-top: 16px; font-size: 11px; color: #888780; }
</style></head>
<body>
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0A5C36; padding-bottom: 12px; margin-bottom: 14px;">
    <div>
      <h1 style="color: #0A5C36; font-size: 19px; margin: 0 0 2px;">PEGADAIAN SYARIAH</h1>
      <div class="sub">Ringkasan Simulasi Pembiayaan Amanah</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <img src="${DANANTARA_LOGO}" alt="Logo Danantara Indonesia" style="height: 28px; width: auto; object-fit: contain;" />
      <img src="${PEGADAIAN_LOGO}" alt="Logo Pegadaian Syariah" style="height: 36px; width: auto; object-fit: contain;" />
    </div>
  </div>
  <div class="sub">Nama Motor: ${escapeHtml(namaMotor || "-")}</div>
  <div class="sub">Harga Motor / OTR: ${formatRupiah(otrNum)}</div>
  <div class="sub">Uang Pinjaman: ${formatRupiah(result.uangPinjaman)}</div>
  <table>
    <tr><th>Tenor</th><th>Total DP &amp; Admin</th><th>Angsuran / Bulan</th></tr>
    ${rowsHtml}
  </table>
  <div class="note">Catatan: rincian ini bersifat simulasi dan dapat berubah mengikuti ketentuan tarif/approval yang berlaku.</div>
</body></html>`;

    const win = window.open("", "_blank");
    if (!win) { alert("Popup diblokir browser. Izinkan popup untuk situs ini agar bisa mengunduh."); return; }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
    setTimeout(() => { win.focus(); win.print(); }, 400);
  };

  return (
    <div className="simulator-panel" style={{ fontFamily: "Georgia, 'Iowan Old Style', serif", color: "#16302C" }}>
      <div className="simulator-header" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, borderBottom: "2px solid #123530", paddingBottom: 14, marginBottom: 22, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 27, fontWeight: 700, color: "#123530", letterSpacing: 0.2 }}>Simulasi Amanah</div>
          <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: "#3F5A54", marginTop: 2 }}>Kalkulator simulasi pembiayaan motor</div>
        </div>
        <div style={{ display: "inline-flex", background: "#fff", border: "1px solid #DCD4C0", borderRadius: 999, padding: 3, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          <button onClick={() => setMode("eksternal")} style={{ border: "none", background: mode === "eksternal" ? "#1F4D43" : "transparent", color: mode === "eksternal" ? "#fff" : "#3F5A54", padding: "8px 16px", borderRadius: 999, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Nasabah Eksternal</button>
          <button onClick={() => setMode("internal")} style={{ border: "none", background: mode === "internal" ? "#1F4D43" : "transparent", color: mode === "internal" ? "#fff" : "#3F5A54", padding: "8px 16px", borderRadius: 999, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Nasabah Internal</button>
        </div>
      </div>

      <div className="simulator-data-card" style={{ background: "#fff", border: "1px solid #DCD4C0", borderRadius: 10, padding: 22, marginBottom: 20 }}>
        <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#B5872B", marginBottom: 16, fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 }}>Data Kendaraan</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "span 2" }}>
            <label style={simLabelStyle}>Nama Motor</label>
            <input style={simFieldStyle} value={namaMotor} onChange={(e) => setNamaMotor(e.target.value)} placeholder="Contoh: BEAT SPORTY DELUXE" />
          </div>
          <div>
            <label style={simLabelStyle}>Harga Motor / OTR (Rp)</label>
            <input type="number" style={simFieldStyle} value={hargaOtr} onChange={(e) => setHargaOtr(e.target.value)} placeholder="Contoh: 58500000" />
          </div>
          <div>
            <label style={simLabelStyle}>Uang Pinjaman (Rp)</label>
            <input type="number" style={simFieldStyle} value={uangPinjamanInput} onChange={(e) => setUangPinjamanInput(e.target.value)} placeholder="Contoh: 52650000" />
            <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: "#3F5A54", marginTop: 5 }}>
              Saran otomatis (DP 10%, dibulatkan ke bawah): {formatRupiah(suggestedUP)}.{" "}
              <button
                onClick={() => setUangPinjamanInput(String(suggestedUP))}
                style={{ border: "none", background: "none", color: "#1F4D43", cursor: "pointer", fontSize: 11, textDecoration: "underline", padding: 0, fontFamily: "inherit" }}
              >
                Gunakan saran
              </button>
            </div>
          </div>
        </div>

        <div className="simulator-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 18 }}>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>DP Kendaraan</div>
            <div style={simMetricVStyle}>{formatRupiah(result.dpKendaraan)}</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Rasio UP / OTR</div>
            <div style={simMetricVStyle}>{result.rasio.toFixed(2)}%</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Diskon Ujrah</div>
            <div style={simMetricVStyle}>{(result.diskonUjrah * 100).toFixed(2)}%</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Biaya {result.notarisInfo.jenis}</div>
            <div style={simMetricVStyle}>{formatRupiah(result.notarisInfo.biaya)}</div>
          </div>
        </div>
      </div>

      <div className="simulator-result-card" style={{ background: "#fff", border: "1px solid #DCD4C0", borderRadius: 10, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#B5872B", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 }}>Simulasi Angsuran per Tenor</div>
          <ExportMenu onExportPng={handleDownloadPng} onExportPdf={handleDownloadPdf} />
        </div>
        <div className="simulator-table-wrap" style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13.5 }}>
            <thead>
              <tr>
                <th style={simThStyle("left")}>Komponen</th>
                {result.perTenor.map((r) => <th key={r.tenor} style={simThStyle("right")}>{r.tenor} bln</th>)}
              </tr>
            </thead>
            <tbody>
              {SIMULASI_TABLE_ROWS.map((row) => (
                <tr key={row.key} style={row.total ? simTotalRowStyle : row.highlight ? simAngsuranRowStyle : { borderBottom: "1px solid #DCD4C0" }}>
                  <td style={{ padding: "10px 10px", textAlign: "left", fontWeight: row.total || row.highlight ? 700 : 400 }}>{row.label}</td>
                  {result.perTenor.map((r) => <td key={r.tenor} style={{ padding: "10px 10px", textAlign: "right" }}>{formatRupiah(r[row.key])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#3F5A54", marginTop: 14, paddingTop: 12, borderTop: "1px dashed #DCD4C0" }}>
          Catatan: hasil bersifat simulasi dan dapat berubah mengikuti ketentuan tarif/approval yang berlaku.
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <button
            onClick={handleDownloadPdf}
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13.5, fontWeight: 600, padding: "10px 18px", borderRadius: 6, border: "1px solid #1F4D43", background: "#1F4D43", color: "#fff", cursor: "pointer" }}
          >
            Cetak Ringkasan untuk Nasabah
          </button>
        </div>
      </div>
    </div>
  );
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function AgunanCalculator({ productKey, prefill }) {
  const cfg = AGUNAN_PRODUCTS[productKey] || AGUNAN_PRODUCTS.arrum_bpkb;
  const isMultiguna = productKey === "arrum_multiguna";

  const [nama, setNama] = useState(prefill?.nama || "");
  const [rpc, setRpc] = useState(prefill?.rpc ? String(prefill.rpc) : "");
  const [taksiran, setTaksiran] = useState(prefill?.taksiran ? String(prefill.taksiran) : "");
  const [up, setUp] = useState(prefill?.up ? String(prefill.up) : "");
  const [copiedWa, setCopiedWa] = useState(false);

  useEffect(() => {
    if (prefill?.nama) setNama(prefill.nama);
    if (prefill?.rpc) setRpc(String(prefill.rpc));
    if (prefill?.taksiran) setTaksiran(String(prefill.taksiran));
    if (prefill?.up) setUp(String(prefill.up));
  }, [prefill]);

  const rpcNum = Number(rpc) || 0;
  const taksiranNum = Number(taksiran) || 0;
  const upNum = Number(up) || 0;

  const rawSuggestedUP = taksiranNum * 0.7;
  const maxCap = isMultiguna ? 100000000 : Infinity;
  const suggestedUP = Math.floor(Math.min(rawSuggestedUP, maxCap) / 100000) * 100000;

  const result = useMemo(
    () => computeAgunanSimulasi(productKey, { rpc: rpcNum, taksiran: taksiranNum, up: upNum }),
    [productKey, rpcNum, taksiranNum, upNum]
  );

  const handleReset = () => {
    setNama("");
    setRpc("");
    setTaksiran("");
    setUp("");
  };

  // 2. Baris-baris komponen pencairan bersih
  const pencairanRows = [
    { key: "up", label: "Uang Pinjaman / Marhun Bih (UP)", get: (r) => r.up },
    { key: "munahAkad", label: "Biaya Administrasi / Mu'nah Akad", get: (r) => r.munahAkad },
    { key: "notaris", label: `Biaya Notaris / Legalisasi / Fidusia (${result.notarisInfo.jenis})`, get: (r) => r.notaris },
    { key: "asuransiKendaraan", label: `Biaya Asuransi Kendaraan (${isMultiguna ? "Arrum" : "Arrum BPKB"})`, get: (r) => r.asuransiKendaraan },
    { key: "asuransiJiwa", label: cfg.asuransiJiwaLabel, get: (r) => r.asuransiJiwa },
    { key: "totalPotongan", label: "Total Biaya Potongan Pencairan", get: (r) => r.totalPotongan, total: true },
    { key: "pencairanBersih", label: "PENCAIRAN BERSIH DITERIMA NASABAH (NET)", get: (r) => r.pencairanBersih, highlight: true },
  ];

  // 3. Baris-baris rincian angsuran bulanan
  const angsuranRows = [
    { key: "tarifPemeliharaan", label: isMultiguna ? "Tarif Mu'nah Pemeliharaan Tiering (%)" : "Tarif Mu'nah Pemeliharaan Standar (%)", get: (r) => r.isAvailable ? (r.tarifPemeliharaan * 100).toFixed(2) + "%" : "-", isRaw: true },
    { key: "munahKotor", label: "Mu'nah Pemeliharaan Kotor / Bulan (Sebelum Diskon)", get: (r) => r.munahKotor },
    { key: "potonganDiskon", label: "Potongan Diskon Mu'nah Pemeliharaan / Bulan (Rp)", get: (r) => r.potonganDiskon },
    { key: "munahBersih", label: "Mu'nah Pemeliharaan BERSIH / Bulan (Setelah Diskon)", get: (r) => r.munahBersih },
    { key: "angsuranPokok", label: "Angsuran Pokok / Bulan (Rp)", get: (r) => r.angsuranPokok },
    { key: "totalAngsuran", label: isMultiguna ? "TOTAL ANGSURAN PER BULAN (ROUNDUP 100)" : "TOTAL ANGSURAN PER BULAN (ROUNDUP 1000)", get: (r) => r.totalAngsuran, highlight: true },
  ];

  // Baris untuk lembar cetak nasabah (Sheet 3)
  const customerRows = [
    { label: "Uang Pinjaman / Marhun Bih (UP)", get: (r) => r.up },
    { label: "Total Biaya Potongan Pencairan", get: (r) => r.totalPotongan },
    { label: "PENCAIRAN BERSIH DITERIMA (NET)", get: (r) => r.pencairanBersih, strong: true },
    { label: "Angsuran Pokok / Bulan", get: (r) => r.angsuranPokok },
    { label: "Mu'nah Pemeliharaan Bersih / Bulan", get: (r) => r.munahBersih },
    { label: "TOTAL ANGSURAN PER BULAN", get: (r) => r.totalAngsuran, strong: true },
  ];

  const tanggalCetak = () => new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });

  const handleCopyWa = () => {
    const activeTenors = result.perTenor.filter((r) => r.isAvailable);
    const text = `*SIMULASI PENCAIRAN & ANGSURAN NASABAH*
*PEGADAIAN SYARIAH*
_${cfg.titleLong}_${cfg.subLabel ? `\n_${cfg.subLabel}_` : ""}
--------------------------------------------------
*Nama Calon Rahin:* ${nama || "-"}
*Pendapatan Bersih (RPC):* ${formatRupiah(rpcNum)}
*Nilai Taksiran Agunan:* ${formatRupiah(taksiranNum)}
*Uang Pinjaman (UP):* ${formatRupiah(upNum)}
*Maksimal Plafon LTV 70%:* ${formatRupiah(result.plafonLtv)}
*Diskon Mu'nah Akad:* ${(result.diskonMunahAkad * 100).toFixed(2)}%
*Biaya Mu'nah Akad:* ${formatRupiah(result.munahAkad)}
*Biaya ${result.notarisInfo.jenis}:* ${formatRupiah(result.notarisInfo.biaya)}

*RINGKASAN ESTIMASI PENCAIRAN BERSIH & ANGSURAN:*
${activeTenors.map((r) => `• *Tenor ${r.tenor} Bulan:*
   - Total Biaya Potongan: ${formatRupiah(r.totalPotongan)}
   - Pencairan Bersih (NET): ${formatRupiah(r.pencairanBersih)}
   - Angsuran Pokok: ${formatRupiah(r.angsuranPokok)}/bln
   - Mu'nah Pemeliharaan Bersih: ${formatRupiah(r.munahBersih)}/bln
   - *TOTAL ANGSURAN: ${formatRupiah(r.totalAngsuran)}/bln*
   - Status DBR (Maks. 40% RPC): ${r.statusDbr}
   - Status Plafon Rekomendasi: ${r.statusRekomendasi}`).join("\n\n")}

_Catatan: Hasil rincian di atas bersifat simulasi sementara dan dapat berubah mengikuti ketentuan/approval resmi yang berlaku di Pegadaian Syariah._`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 3000);
    }
  };

  const handleDownloadPng = () => {
    const tenorCount = result.perTenor.length;
    const labelW = 240;
    const colW = 95;
    const padding = 24;
    const rowH = 28;
    const width = labelW + colW * tenorCount;
    const canvasWidth = width + padding * 2;
    const canvasHeight = 160 + 34 + customerRows.length * rowH + 60;

    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#123530";
    ctx.font = "bold 16px Georgia, serif";
    ctx.fillText("PEGADAIAN SYARIAH", padding, 30);
    ctx.font = "12.5px Arial, sans-serif";
    ctx.fillStyle = "#3F5A54";
    ctx.fillText(`Simulasi Pencairan & Angsuran Nasabah - ${cfg.label}`, padding, 48);
    if (cfg.subLabel) {
      ctx.font = "10.5px Arial, sans-serif";
      ctx.fillStyle = "#6F837D";
      ctx.fillText(cfg.subLabel, padding, 64);
    }

    ctx.font = "11.5px Arial, sans-serif";
    ctx.fillStyle = "#16302C";
    ctx.fillText(`Nama Calon Rahin (Nasabah): ${nama || "-"}`, padding, 88);
    ctx.fillText(`Nilai Taksiran Agunan / Kendaraan: ${formatRupiah(taksiranNum)}`, padding, 106);
    ctx.fillText(`Uang Pinjaman Disetujui (Marhun Bih): ${formatRupiah(upNum)}`, padding, 124);
    ctx.fillText(`Tanggal Simulasi Cetak: ${tanggalCetak()}`, padding, 142);

    let y = 160;
    ctx.fillStyle = "#F6F3EA";
    ctx.fillRect(padding, y, width, 30);
    ctx.fillStyle = "#3F5A54";
    ctx.font = "bold 11px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Rincian Komponen / Tenor", padding + 8, y + 19);
    ctx.textAlign = "right";
    result.perTenor.forEach((r, i) => {
      ctx.fillText(`${r.tenor} Bulan`, padding + labelW + colW * (i + 1) - 8, y + 19);
    });
    y += 30;

    customerRows.forEach((row) => {
      if (row.strong) {
        ctx.fillStyle = "#EEF6F0";
        ctx.fillRect(padding, y, width, rowH);
      }
      ctx.strokeStyle = "#DCD4C0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, y + rowH);
      ctx.lineTo(padding + width, y + rowH);
      ctx.stroke();
      ctx.fillStyle = row.strong ? "#2F6F4F" : "#16302C";
      ctx.font = `${row.strong ? "bold " : ""}11px Arial, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(row.label, padding + 8, y + 18);
      ctx.textAlign = "right";
      result.perTenor.forEach((r, i) => {
        const valText = r.isAvailable ? formatRupiah(row.get(r)) : "-";
        ctx.fillText(valText, padding + labelW + colW * (i + 1) - 8, y + 18);
      });
      y += rowH;
    });

    ctx.textAlign = "left";
    ctx.fillStyle = "#3F5A54";
    ctx.font = "10px Arial, sans-serif";
    ctx.fillText("Catatan: rincian ini bersifat simulasi dan dapat berubah mengikuti ketentuan tarif/approval yang berlaku.", padding, y + 26);

    const link = document.createElement("a");
    link.download = `simulasi-${productKey}-${nama ? nama.replace(/\s+/g, "_").toLowerCase() : "nasabah"}-${todayStr()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadPdf = () => {
    const headCells = result.perTenor.map((r) => `<th>${r.tenor} Bulan</th>`).join("");
    const bodyRows = customerRows
      .map((row) => {
        const cells = result.perTenor.map((r) => `<td>${r.isAvailable ? formatRupiah(row.get(r)) : "-"}</td>`).join("");
        return `<tr class="${row.strong ? "strong" : ""}"><td>${escapeHtml(row.label)}</td>${cells}</tr>`;
      })
      .join("");

    const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8" />
<title>Simulasi ${escapeHtml(cfg.label)}</title>
<style>
  @page { margin: 16mm 14mm; }
  body { font-family: Georgia, 'Iowan Old Style', serif; color: #16302C; padding: 12px; }
  h1 { font-size: 18px; color: #123530; margin: 0 0 2px; }
  .sub { font-family: Arial, sans-serif; font-size: 11.5px; color: #3F5A54; margin-bottom: 2px; }
  .ketentuan { font-family: Arial, sans-serif; font-size: 10px; color: #6F837D; margin-bottom: 12px; }
  h2 { font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #B5872B; margin: 16px 0 6px; }
  table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 11.5px; }
  th { text-align: right; padding: 7px 8px; color: #3F5A54; font-size: 11px; border-bottom: 2px solid #123530; }
  th:first-child, td:first-child { text-align: left; }
  td { text-align: right; padding: 7px 8px; border-bottom: 1px solid #DCD4C0; }
  tr.strong td { font-weight: 700; color: #2F6F4F; background: #EEF6F0; }
  .note { font-family: Arial, sans-serif; font-size: 10.5px; color: #3F5A54; margin-top: 14px; padding-top: 8px; border-top: 1px dashed #DCD4C0; }
</style></head>
<body>
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #123530; padding-bottom: 12px; margin-bottom: 14px;">
    <div>
      <h1 style="margin: 0; font-size: 19px; color: #123530;">PEGADAIAN SYARIAH</h1>
      <div class="sub" style="margin-top: 2px;">Simulasi Pencairan &amp; Angsuran Nasabah - ${escapeHtml(cfg.label)}</div>
      ${cfg.subLabel ? `<div class="ketentuan" style="margin: 2px 0 0;">${escapeHtml(cfg.subLabel)}</div>` : ""}
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <img src="${DANANTARA_LOGO}" alt="Logo Danantara Indonesia" style="height: 28px; width: auto; object-fit: contain;" />
      <img src="${PEGADAIAN_LOGO}" alt="Logo Pegadaian Syariah" style="height: 36px; width: auto; object-fit: contain;" />
    </div>
  </div>
  
  <h2>I. Informasi Calon Rahin (Nasabah) &amp; Agunan</h2>
  <div class="sub">Nama Calon Rahin (Nasabah): <strong>${escapeHtml(nama || "-")}</strong></div>
  <div class="sub">Nilai Taksiran Agunan / Kendaraan: <strong>${formatRupiah(taksiranNum)}</strong></div>
  <div class="sub">Uang Pinjaman Disetujui (Marhun Bih): <strong>${formatRupiah(upNum)}</strong></div>
  <div class="sub">Tanggal Simulasi Cetak: ${tanggalCetak()}</div>

  <h2>II. Ringkasan Estimasi Pencairan Bersih &amp; Angsuran Bulanan</h2>
  <table>
    <thead>
      <tr><th>Rincian Komponen / Tenor</th>${headCells}</tr>
    </thead>
    <tbody>
      ${bodyRows}
    </tbody>
  </table>
  <div class="note">Catatan: rincian ini bersifat simulasi dan dapat berubah mengikuti ketentuan tarif/approval yang berlaku di Pegadaian Syariah.</div>
</body></html>`;

    const win = window.open("", "_blank");
    if (!win) { alert("Popup diblokir browser. Izinkan popup untuk situs ini agar bisa mengunduh."); return; }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
    setTimeout(() => { win.focus(); win.print(); }, 400);
  };

  const overLtv = taksiranNum > 0 && upNum > result.plafonLtv;
  const overCapMultiguna = isMultiguna && upNum > 100000000;
  const underMinMultiguna = isMultiguna && upNum > 0 && upNum < 1000000;

  return (
    <div className="simulator-panel" style={{ fontFamily: "Georgia, 'Iowan Old Style', serif", color: "#16302C" }}>
      <div className="simulator-header" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, borderBottom: "2px solid #123530", paddingBottom: 14, marginBottom: 22, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#123530", letterSpacing: 0.2 }}>Simulasi {cfg.label}</span>
            {cfg.unitKerja ? (
              <span style={{ background: "#E8F5E9", color: "#1B5E20", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 999, border: "1px solid #C8E6C9" }}>
                {cfg.unitKerja}
              </span>
            ) : null}
          </div>
          {cfg.subLabel ? (
            <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12.5, color: "#3F5A54", marginTop: 3 }}>
              {cfg.subLabel}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={handleReset}
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12.5, fontWeight: 500,
              padding: "7px 14px", borderRadius: 6, border: "1px solid #DCD4C0", background: "#fff", color: "#5F5E5A", cursor: "pointer"
            }}
          >
            Reset Form
          </button>
        </div>
      </div>

      {/* 1. Parameter Input Simulasi */}
      <div className="simulator-data-card" style={{ background: "#fff", border: "1px solid #DCD4C0", borderRadius: 10, padding: 22, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#B5872B", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 }}>
            1. Parameter Input Simulasi Nasabah &amp; Agunan
          </div>
          {prefill?.nama && (
            <span style={{ fontSize: 11.5, background: "#E8F5E9", color: "#1B5E20", padding: "2px 8px", borderRadius: 4, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
              Terkait Lead: {prefill.nama}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "span 2" }}>
            <label style={simLabelStyle}>Nama Calon Rahin (Nasabah)</label>
            <input style={simFieldStyle} value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Bapak Ahmad" />
          </div>
          <div>
            <label style={simLabelStyle}>Pendapatan Bersih Bulanan / RPC (Rp)</label>
            <input type="number" style={simFieldStyle} value={rpc} onChange={(e) => setRpc(e.target.value)} placeholder="Contoh: 15000000" />
            <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: "#5F5E5A", marginTop: 4 }}>
              Digunakan untuk analisis kemampuan bayar &amp; rasio DBR (maks. 40%).
            </div>
          </div>
          <div>
            <label style={simLabelStyle}>Nilai Taksiran Agunan / Kendaraan (Rp)</label>
            <input type="number" style={simFieldStyle} value={taksiran} onChange={(e) => setTaksiran(e.target.value)} placeholder="Contoh: 100000000" />
            <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: "#5F5E5A", marginTop: 4 }}>
              Dasar perhitungan plafon LTV 70% dan Mu'nah Pemeliharaan.
            </div>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={simLabelStyle}>Uang Pinjaman / Marhun Bih (UP) (Rp)</label>
            <input type="number" style={simFieldStyle} value={up} onChange={(e) => setUp(e.target.value)} placeholder="Contoh: 70000000" />
            <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11.5, color: "#3F5A54", marginTop: 5 }}>
              Maksimal Plafon LTV 70%: <strong>{formatRupiah(result.plafonLtv)}</strong>.{" "}
              {taksiranNum > 0 && (
                <button
                  type="button"
                  onClick={() => setUp(String(suggestedUP))}
                  style={{ border: "none", background: "none", color: "#1F4D43", cursor: "pointer", fontSize: 11.5, textDecoration: "underline", padding: 0, fontWeight: 600, fontFamily: "inherit" }}
                >
                  Gunakan rekomendasi plafon ({formatRupiah(suggestedUP)})
                </button>
              )}
            </div>
            {overLtv && (
              <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#A32D2D", marginTop: 5, fontWeight: 600 }}>
                Peringatan: Uang pinjaman melebihi batas plafon LTV 70% ({formatRupiah(result.plafonLtv)}).
              </div>
            )}
            {overCapMultiguna && (
              <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#A32D2D", marginTop: 5, fontWeight: 600 }}>
                Peringatan: Arrum Multiguna memiliki batas maksimal pinjaman Rp 100.000.000.
              </div>
            )}
            {underMinMultiguna && (
              <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#A32D2D", marginTop: 5, fontWeight: 600 }}>
                Peringatan: Uang pinjaman di bawah minimal produk Arrum Multiguna (Min. Rp 1.000.000).
              </div>
            )}
          </div>
        </div>

        {/* 6 Metric Cards sesuai parameter SE 2026 */}
        <div className="simulator-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 20 }}>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Maksimal Plafon LTV 70%</div>
            <div style={simMetricVStyle}>{formatRupiah(result.plafonLtv)}</div>
            <div style={{ fontSize: 11, color: "#6F837D", marginTop: 2 }}>{isMultiguna ? "LTV 70% (Maks. 100 Jt)" : "70% dari nilai taksiran"}</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Rasio UP terhadap Taksiran</div>
            <div style={simMetricVStyle}>{(result.rasio * 100).toFixed(2)}%</div>
            <div style={{ fontSize: 11, color: "#6F837D", marginTop: 2 }}>Dasar tiering diskon mu'nah</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Diskon Mu'nah Akad</div>
            <div style={simMetricVStyle}>{(result.diskonMunahAkad * 100).toFixed(2)}%</div>
            <div style={{ fontSize: 11, color: "#6F837D", marginTop: 2 }}>Biaya akad: {formatRupiah(result.munahAkad)}</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Biaya Mu'nah Akad</div>
            <div style={simMetricVStyle}>{formatRupiah(result.munahAkad)}</div>
            <div style={{ fontSize: 11, color: "#6F837D", marginTop: 2 }}>{upNum > 100000000 && !isMultiguna ? "Tarif flat UP > 100 Jt" : "Setelah potongan diskon"}</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Diskon Mu'nah Pemeliharaan</div>
            <div style={simMetricVStyle}>{(result.diskonMunahPemeliharaan * 100).toFixed(2)}%</div>
            <div style={{ fontSize: 11, color: "#6F837D", marginTop: 2 }}>{cfg.tarifPemeliharaanLabel}</div>
          </div>
          <div style={simMetricCardStyle}>
            <div style={simMetricKStyle}>Biaya {result.notarisInfo.jenis}</div>
            <div style={simMetricVStyle}>{formatRupiah(result.notarisInfo.biaya)}</div>
            <div style={{ fontSize: 11, color: "#6F837D", marginTop: 2 }}>Pengikatan jaminan resmi</div>
          </div>
        </div>
      </div>

      {/* 2. Matriks Proyeksi Pencairan Bersih per Tenor */}
      <div className="simulator-result-card" style={{ background: "#fff", border: "1px solid #DCD4C0", borderRadius: 10, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#B5872B", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 }}>
              2. Matriks Proyeksi Pencairan Bersih per Tenor
            </div>
            <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#5F5E5A", marginTop: 2 }}>
              {!isMultiguna ? "Tenor 12 s.d. 60 Bulan (Tenor 48 & 60 bulan berlaku untuk UP > Rp 100 Juta)" : "Tenor 12 s.d. 36 Bulan (Maksimal 36 Bulan)"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={handleCopyWa}
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12.5, fontWeight: 600,
                padding: "8px 14px", borderRadius: 6, border: "1px solid #25D366", background: copiedWa ? "#25D366" : "#E8F5E9",
                color: copiedWa ? "#fff" : "#1B5E20", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6
              }}
            >
              {copiedWa ? "Tersalin ke Clipboard!" : "Salin Format WhatsApp"}
            </button>
            <ExportMenu onExportPng={handleDownloadPng} onExportPdf={handleDownloadPdf} />
          </div>
        </div>

        <div className="simulator-table-wrap" style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={simThStyle("left")}>Komponen Biaya / Tenor</th>
                {result.perTenor.map((r) => <th key={r.tenor} style={simThStyle("right")}>{r.tenor} Bulan</th>)}
              </tr>
            </thead>
            <tbody>
              {pencairanRows.map((row) => (
                <tr key={row.key} style={row.total ? simTotalRowStyle : row.highlight ? simAngsuranRowStyle : { borderBottom: "1px solid #DCD4C0" }}>
                  <td style={{ padding: "9px 10px", textAlign: "left", fontWeight: row.total || row.highlight ? 700 : 400 }}>{row.label}</td>
                  {result.perTenor.map((r) => {
                    const val = row.isRaw ? row.get(r) : r.isAvailable ? formatRupiah(row.get(r)) : "-";
                    return (
                      <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right" }}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Rincian Angsuran Bulanan & Potongan Diskon Mu'nah Pemeliharaan */}
      <div className="simulator-result-card" style={{ background: "#fff", border: "1px solid #DCD4C0", borderRadius: 10, padding: 22, marginTop: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#B5872B", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 }}>
            3. Rincian Angsuran Bulanan &amp; Potongan Diskon Mu'nah Pemeliharaan
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#5F5E5A", marginTop: 2 }}>
            Perhitungan angsuran bulanan, mu'nah pemeliharaan bersih, dan evaluasi kelayakan DBR nasabah
          </div>
        </div>

        <div className="simulator-table-wrap" style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={simThStyle("left")}>Komponen Angsuran / Tenor</th>
                {result.perTenor.map((r) => <th key={r.tenor} style={simThStyle("right")}>{r.tenor} Bulan</th>)}
              </tr>
            </thead>
            <tbody>
              {angsuranRows.map((row) => (
                <tr key={row.key} style={row.total ? simTotalRowStyle : row.highlight ? simAngsuranRowStyle : { borderBottom: "1px solid #DCD4C0" }}>
                  <td style={{ padding: "9px 10px", textAlign: "left", fontWeight: row.total || row.highlight ? 700 : 400 }}>{row.label}</td>
                  {result.perTenor.map((r) => {
                    const val = row.isRaw ? row.get(r) : r.isAvailable ? formatRupiah(row.get(r)) : "-";
                    return (
                      <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right" }}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ borderBottom: "1px solid #DCD4C0" }}>
                <td style={{ padding: "9px 10px", textAlign: "left" }}>Pendapatan Bersih Bulanan (x Kali Angsuran)</td>
                {result.perTenor.map((r) => (
                  <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right" }}>
                    {!r.isAvailable ? "-" : rpcNum && r.kaliAngsuran ? `${r.kaliAngsuran.toFixed(2)}x` : "-"}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: "1px solid #DCD4C0" }}>
                <td style={{ padding: "9px 10px", textAlign: "left" }}>Rasio DBR (Beban Angsuran / RPC)</td>
                {result.perTenor.map((r) => (
                  <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right" }}>
                    {!r.isAvailable ? "-" : rpcNum && r.dbr ? `${(r.dbr * 100).toFixed(2)}%` : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: "9px 10px", textAlign: "left", fontWeight: 700 }}>Status Kelayakan DBR (Maks. 40% RPC)</td>
                {result.perTenor.map((r) => {
                  let color = "#5F5E5A";
                  if (r.isAvailable && rpcNum) {
                    color = r.layak ? "#2F6F4F" : "#A32D2D";
                  }
                  return (
                    <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right", fontWeight: 700, fontSize: 11.5, color }}>
                      {!r.isAvailable ? r.statusDbr : !rpcNum ? "-" : r.statusDbr}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#3F5A54", marginTop: 14, paddingTop: 12, borderTop: "1px dashed #DCD4C0" }}>
          Catatan: Rincian perhitungan angsuran telah dibulatkan ke atas ({isMultiguna ? "Roundup Rp 100" : "Roundup Rp 1.000"}) sesuai ketentuan Juklak.
        </div>
      </div>

      {/* 4. Analisis Pinjaman Rekomendasi Maksimal */}
      <div className="simulator-result-card" style={{ background: "#fff", border: "1px solid #DCD4C0", borderRadius: 10, padding: 22, marginTop: 20 }}>
        <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#B5872B", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700, marginBottom: 4 }}>
          4. Analisis Pinjaman Rekomendasi Maksimal (Plafon Rekomendasi)
        </div>
        <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#5F5E5A", marginBottom: 14 }}>
          {isMultiguna
            ? "Plafon rekomendasi adalah nilai terkecil antara Plafon LTV (70% taksiran agunan, Maks. 100 Jt) dan Plafon Kemampuan Membayar (RPC)."
            : "Plafon rekomendasi adalah nilai terkecil antara Plafon LTV (70% taksiran agunan) dan Plafon Kemampuan Membayar (RPC)."}
        </div>

        <div className="simulator-table-wrap" style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={simThStyle("left")}>Komponen Rekomendasi / Tenor</th>
                {result.perTenor.map((r) => <th key={r.tenor} style={simThStyle("right")}>{r.tenor} Bulan</th>)}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #DCD4C0" }}>
                <td style={{ padding: "9px 10px", textAlign: "left", color: "#16302C" }}>
                  {isMultiguna ? "Plafon Maksimal Agunan (LTV 70% Taksiran, Maks. 100Jt)" : "Plafon Maksimal Agunan (LTV 70% Taksiran)"}
                </td>
                {result.perTenor.map((r) => (
                  <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right", color: "#16302C" }}>
                    {r.isAvailable ? formatRupiah(result.plafonLtv) : "-"}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: "1px solid #DCD4C0" }}>
                <td style={{ padding: "9px 10px", textAlign: "left", color: "#16302C" }}>Plafon Maksimal Kemampuan Membayar (RPC)</td>
                {result.perTenor.map((r) => (
                  <td key={r.tenor} style={{ padding: "9px 10px", textAlign: "right", color: "#16302C" }}>
                    {!r.isAvailable ? "-" : rpcNum ? formatRupiah(r.kemampuanBayar) : "-"}
                  </td>
                ))}
              </tr>
              <tr style={{ ...simTotalRowStyle, background: "#E2F0D9", borderTop: "1.5px solid #2F6F4F", borderBottom: "1.5px solid #2F6F4F" }}>
                <td style={{ padding: "10px 10px", textAlign: "left", fontWeight: 700, color: "#16302C" }}>
                  {isMultiguna ? "PINJAMAN REKOMENDASI MAKSIMAL (TERKECIL LTV/RPC/100JT)" : "PINJAMAN REKOMENDASI MAKSIMAL (TERKECIL LTV/RPC)"}
                </td>
                {result.perTenor.map((r) => (
                  <td key={r.tenor} style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, color: "#1E5E2C" }}>
                    {!r.isAvailable ? "-" : rpcNum ? formatRupiah(r.pinjamanRekomendasi) : formatRupiah(result.plafonLtv)}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: "10px 10px", textAlign: "left", fontWeight: 700, color: "#16302C" }}>Status Pengajuan UP (vs Plafon Rekomendasi)</td>
                {result.perTenor.map((r) => {
                  let color = "#5F5E5A";
                  if (r.isAvailable && rpcNum && upNum > 0) {
                    color = r.memenuhi ? "#1E5E2C" : "#A32D2D";
                  }
                  return (
                    <td key={r.tenor} style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, fontSize: 12, color }}>
                      {!r.isAvailable ? r.statusRekomendasi : !rpcNum || !upNum ? "-" : r.statusRekomendasi}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button
            onClick={handleDownloadPdf}
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13.5, fontWeight: 600, padding: "10px 18px", borderRadius: 6, border: "1px solid #1F4D43", background: "#1F4D43", color: "#fff", cursor: "pointer" }}
          >
            Cetak Ringkasan untuk Nasabah
          </button>
          <button
            onClick={handleCopyWa}
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13.5, fontWeight: 600, padding: "10px 18px", borderRadius: 6, border: "1px solid #25D366", background: "#E8F5E9", color: "#1B5E20", cursor: "pointer" }}
          >
            {copiedWa ? "Tersalin ke Clipboard!" : "Salin Pesan WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SimulasiProdukPanel({ prefill }) {
  const [product, setProduct] = useState(prefill?.product || "arrum_bpkb");
  const tabs = [
    { key: "arrum_bpkb", label: "Arrum BPKB / Mikro" },
    { key: "arrum_multiguna", label: "Arrum Multiguna" },
    { key: "amanah", label: "Amanah" },
  ];

  useEffect(() => {
    if (prefill?.product) {
      setProduct(prefill.product);
    }
  }, [prefill]);

  return (
    <div>
      <div className="simulator-product-tabs" style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        {tabs.map((t) => {
          const active = product === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setProduct(t.key)}
              style={{ padding: "9px 18px", borderRadius: 999, border: `1px solid ${active ? "#1F4D43" : "#DCD4C0"}`, background: active ? "#1F4D43" : "#fff", color: active ? "#fff" : "#3F5A54", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {product === "amanah" ? <AmanahCalculator prefill={prefill} /> : <AgunanCalculator productKey={product} prefill={prefill} />}
    </div>
  );
}


const MOBILE_CSS = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; min-height: 100%; width: 100%; }
  body { overflow-x: hidden; background: #F8F9FA; }
  .mobile-app { min-height: 100vh; min-height: 100dvh; }
  .mobile-app button, .mobile-app input, .mobile-app select, .mobile-app textarea { -webkit-tap-highlight-color: transparent; }
  .mobile-header { position: relative; }
  .mobile-header-logos { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .mobile-header-title { font-size: 17px; font-weight: 700; }
  .mobile-header-subtitle { font-size: 12px; color: #C9E4D6; }
  .desktop-main-nav { display: flex; gap: 8px; }
  .mobile-content { max-width: 1180px; margin: 0 auto; padding: 28px 24px 60px; }
  .portal-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
  .simulator-panel { width: 100%; }
  .simulator-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .simulator-data-card { overflow: hidden; }
  .simulator-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 18px; }
  .simulator-result-card { overflow: hidden; }
  .simulator-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .simulator-table-wrap table { min-width: 650px; }
  .admin-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .admin-table-wrap table { min-width: 850px; }
  .mobile-bottom-nav { display: none; }
  .data-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .data-table-wrap table { min-width: 600px; }
  .inactive-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }

  @media (max-width: 768px) {
    .mobile-app { padding-bottom: 78px; }
    .mobile-header {
      padding: 10px 14px 12px !important;
      position: sticky; top: 0; z-index: 50;
      box-shadow: 0 2px 12px rgba(0,0,0,.12);
    }
    .mobile-header-logos { margin-bottom: 8px !important; }
    .mobile-header-logos img:first-child { height: 22px !important; max-width: 45%; }
    .mobile-header-logos img:last-child { height: 27px !important; max-width: 45%; }
    .mobile-header-title { font-size: 15px !important; line-height: 1.25; }
    .mobile-header-subtitle { font-size: 10.5px !important; margin-top: 3px; }
    .desktop-main-nav { display: none !important; }
    .mobile-content { max-width: none !important; width: 100%; padding: 16px 12px 20px !important; }

    .portal-tabs {
      display: grid !important; grid-template-columns: 1fr 1fr;
      gap: 8px !important; margin-bottom: 16px !important;
    }
    .portal-tabs button {
      width: 100%; min-height: 42px;
      padding: 9px 8px !important; font-size: 12px !important;
    }

    .mobile-app form { max-width: none !important; width: 100%; }
    .mobile-app form > div:first-child { grid-template-columns: 1fr !important; gap: 0 !important; }
    .mobile-app form > div:first-child > div { width: 100%; }
    .mobile-app label { font-size: 12px; }
    .mobile-app input, .mobile-app select, .mobile-app textarea {
      width: 100%; font-size: 16px !important; min-height: 46px;
      border-radius: 10px !important;
    }
    .mobile-app textarea { min-height: 92px !important; }
    .mobile-app form button[type="submit"] {
      width: 100%; min-height: 48px; justify-content: center;
      border-radius: 10px !important; font-size: 14px !important;
    }

    .simulator-panel { font-family: "Helvetica Neue", Arial, sans-serif !important; }
    .simulator-header {
      display: block !important; border-bottom-width: 1px !important;
      padding-bottom: 12px !important; margin-bottom: 14px !important;
    }
    .simulator-header > div:first-child { margin-bottom: 10px; }
    .simulator-header > div:first-child > div:first-child { font-size: 22px !important; }
    .simulator-header > div:first-child > div:last-child { font-size: 11px !important; }
    .simulator-header > div:last-child {
      width: 100%; display: grid !important; grid-template-columns: 1fr 1fr;
    }
    .simulator-header > div:last-child button {
      width: 100%; min-height: 42px; padding: 10px 6px !important; font-size: 12px !important;
    }
    .simulator-data-card, .simulator-result-card {
      padding: 15px !important; border-radius: 14px !important; margin-bottom: 12px !important;
    }
    .simulator-data-card > div:nth-child(2) { grid-template-columns: 1fr !important; gap: 0 !important; }
    .simulator-data-card > div:nth-child(2) > div { grid-column: auto !important; }
    .simulator-data-card input { font-size: 16px !important; min-height: 48px; }
    .simulator-metrics { grid-template-columns: 1fr 1fr !important; gap: 8px !important; margin-top: 12px !important; }
    .simulator-metrics > div { min-width: 0; padding: 12px !important; }
    .simulator-metrics > div > div:last-child { font-size: 14px !important; word-break: break-word; }
    .simulator-table-wrap { margin: 0 -2px; overflow-x: auto !important; }
    .simulator-table-wrap table { min-width: 620px; font-size: 12px !important; }
    .simulator-result-card > div:last-child { display: block !important; }
    .simulator-result-card > div:last-child button {
      width: 100%; min-height: 46px; border-radius: 9px !important;
    }

    .admin-table-wrap { margin: 0 -4px; overflow-x: auto !important; }
    .admin-table-wrap table { min-width: 850px; }
    .data-table-wrap { margin: 0 -4px; overflow-x: auto !important; }
    .data-table-wrap table { min-width: 560px; font-size: 11.5px !important; }
    .inactive-info-grid { grid-template-columns: 1fr !important; gap: 3px 0 !important; }
    .simulator-product-tabs { display: grid !important; grid-template-columns: repeat(3, 1fr); gap: 6px !important; }
    .simulator-product-tabs button { padding: 10px 4px !important; font-size: 12px !important; min-height: 44px; }
    .inactive-modal-card { padding: 16px !important; }
    .inactive-modal-card form button[type="submit"] { width: 100%; min-height: 48px; justify-content: center; }
    .data-filter-row { display: grid !important; grid-template-columns: 1fr 1fr; gap: 8px !important; margin-bottom: 12px !important; }
    .data-filter-row > div { width: 100%; }
    .data-filter-row button { width: 100%; min-height: 42px; justify-content: center; font-size: 12px !important; }

    .mobile-bottom-nav {
      display: grid; grid-template-columns: repeat(4, 1fr);
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 100;
      background: rgba(255,255,255,.97); border-top: 1px solid #E5E7EB;
      box-shadow: 0 -4px 18px rgba(0,0,0,.08);
      padding: 7px 8px calc(7px + env(safe-area-inset-bottom));
      backdrop-filter: blur(12px);
    }
    .mobile-bottom-nav button {
      border: 0; background: transparent; color: #6B7280; min-height: 54px;
      border-radius: 12px; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 3px;
      font-size: 10px; font-weight: 600; cursor: pointer;
    }
    .mobile-bottom-nav button.active { color: #0A5C36; background: #EAF3DE; }
    .mobile-bottom-nav svg { width: 20px; height: 20px; }
  }

  @media (max-width: 390px) {
    .mobile-content { padding-left: 10px !important; padding-right: 10px !important; }
    .simulator-data-card, .simulator-result-card { padding: 12px !important; }
    .simulator-metrics { grid-template-columns: 1fr !important; }
    .mobile-header-title { font-size: 14px !important; }
  }
`;
const DATA_EMPTY_FILTERS = { produk: new Set(), pekerjaan: new Set() };

function InactiveCustomerModal({ customer, onClose, onSubmitLead, onConverted }) {
  const [produk, setProduk] = useState(PRODUK_OPTIONS[0]);
  const [keterangan, setKeterangan] = useState(KETERANGAN_OPTIONS[0]);
  const [pemasar, setPemasar] = useState("");
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [catatan, setCatatan] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pemasar.trim()) { setError("Nama pemasar wajib diisi."); return; }
    setError("");
    const status = keterangan === "Berminat" ? "NEW" : "REJECTED";
    const lead = {
      id: Date.now().toString(),
      tanggal: todayStr(),
      sumber: "Nasabah Inaktif",
      nama: customer.nama,
      phone: customer.hp,
      produk,
      keterangan,
      pemasar: pemasar.trim(),
      unit,
      status,
      catatan: `${todayStr()}: ${catatan.trim() || "Follow up dari data nasabah inaktif."}`,
    };
    onSubmitLead(lead);
    onConverted(customer.cif);
  };

  const fields = [
    ["CIF", customer.cif],
    ["Produk Terakhir", customer.produk_terakhir],
    ["Tanggal Kredit Terakhir", customer.tgl_kredit_terakhir],
    ["Alamat", customer.alamat],
    ["No. HP", customer.hp],
    ["Umur", customer.umur],
    ["Jenis Kelamin", customer.jenis_kelamin === "P" ? "Perempuan" : customer.jenis_kelamin === "L" ? "Laki-laki" : customer.jenis_kelamin],
    ["Pendidikan", customer.pendidikan],
    ["Pekerjaan", customer.pekerjaan],
    ["Sumber Dana", customer.sumber_dana],
    ["Nama Perusahaan", customer.nama_perusahaan],
    ["Agama", customer.agama],
    ["Kelurahan", customer.kelurahan],
    ["Kecamatan", customer.kecamatan],
    ["Kabupaten/Kota", customer.kabupaten],
    ["Provinsi", customer.provinsi],
  ];

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,20,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="inactive-modal-card"
        style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 10px 40px rgba(0,0,0,0.25)", maxWidth: 640, width: "100%", maxHeight: "90vh", overflow: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#2C2C2A" }}>{customer.nama}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888780", cursor: "pointer", fontSize: 13 }}>Tutup</button>
        </div>

        <div className="inactive-info-grid" style={{ fontSize: 12.5, color: "#5F5E5A", background: "#F8F9FA", borderRadius: 8, padding: 12, marginBottom: 16 }}>
          {fields.map(([label, value]) => (
            <div key={label}><strong>{label}:</strong> {value || "-"}</div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Hasil follow up</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Produk yang ditawarkan" required>
              <select style={inputStyle} value={produk} onChange={(e) => setProduk(e.target.value)}>
                {PRODUK_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Keterangan" required>
              <select style={inputStyle} value={keterangan} onChange={(e) => setKeterangan(e.target.value)}>
                {KETERANGAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Nama pemasar" required>
              <input style={inputStyle} value={pemasar} onChange={(e) => setPemasar(e.target.value)} placeholder="Nama Anda" />
            </Field>
            <Field label="Unit kerja" required>
              <select style={inputStyle} value={unit} onChange={(e) => setUnit(e.target.value)}>
                {UNIT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Catatan hasil follow up">
            <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="Tuliskan hasil follow up..." />
          </Field>
          {error && <div style={{ color: "#A32D2D", fontSize: 13, marginBottom: 10 }}>{error}</div>}
          <button type="submit" style={{ background: "#0A5C36", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Simpan &amp; masukkan ke Daftar Prospek
          </button>
        </form>
      </div>
    </div>
  );
}

function DataNasabahInaktifPanel({ customers, onSubmit }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(DATA_EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [followedUp, setFollowedUp] = useState(() => new Set());

  const options = useMemo(() => ({
    produk: [...new Set(customers.map((c) => c.produk_terakhir))].filter(Boolean).sort(),
    pekerjaan: [...new Set(customers.map((c) => c.pekerjaan))].filter(Boolean).sort(),
  }), [customers]);

  const setFilter = (key) => (set) => setFilters((f) => ({ ...f, [key]: set }));
  const resetFilters = () => setFilters(DATA_EMPTY_FILTERS);
  const activeCount = Object.values(filters).filter((s) => s.size > 0).length;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return customers.filter((c) => {
      const matchQuery = !q || (c.nama || "").toLowerCase().includes(q) || (c.hp || "").includes(q);
      const matchField = (key, value) => filters[key].size === 0 || filters[key].has(value);
      return matchQuery && matchField("produk", c.produk_terakhir) && matchField("pekerjaan", c.pekerjaan);
    });
  }, [query, filters, customers]);

  useEffect(() => { setPage(1); }, [query, filters, pageSize]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleConverted = (cif) => {
    setFollowedUp((prev) => { const next = new Set(prev); next.add(cif); return next; });
    setSelectedCustomer(null);
  };

  return (
    <div>
      <div style={{ fontSize: 12, color: "#888780", marginBottom: 12 }}>
        Data historis nasabah tidak aktif untuk digarap ulang oleh pemasar. Data sumber ini tidak diubah — begitu hasil follow up disimpan, otomatis masuk sebagai prospek baru di menu Daftar Prospek (sumber: "Nasabah Inaktif").
      </div>

      <div style={{ position: "relative", maxWidth: 320, marginBottom: 10 }}>
        <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#888780" }} />
        <input style={{ ...inputStyle, paddingLeft: 34 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama atau nomor HP..." />
      </div>

      <div className="data-filter-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <FilterDropdown label="Produk terakhir" fieldKey="produk" options={options.produk} selected={filters.produk} onChange={setFilter("produk")} />
        <FilterDropdown label="Pekerjaan" fieldKey="pekerjaan" options={options.pekerjaan} selected={filters.pekerjaan} onChange={setFilter("pekerjaan")} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 12, color: "#888780" }}>
          Menampilkan {filtered.length} dari {customers.length} nasabah inaktif
          {activeCount > 0 && (
            <button onClick={resetFilters} style={{ background: "none", border: "none", color: "#A32D2D", fontSize: 12, fontWeight: 500, cursor: "pointer", marginLeft: 10 }}>
              Reset filter ({activeCount})
            </button>
          )}
        </div>
      </div>

      <div className="data-table-wrap" style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto", marginBottom: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#888780", background: "#F8F9FA" }}>
              <th style={{ padding: "8px 12px" }}>Nama</th>
              <th style={{ padding: "8px 12px" }}>No. HP</th>
              <th style={{ padding: "8px 12px" }}>Produk terakhir</th>
              <th style={{ padding: "8px 12px" }}>Pekerjaan</th>
              <th style={{ padding: "8px 12px" }}></th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", color: "#888780" }}>Tidak ada nasabah yang cocok.</td></tr>
            ) : paged.map((c) => (
              <tr key={c.cif} style={{ borderTop: "1px solid #F1EFE8" }}>
                <td style={{ padding: "8px 12px" }}>{c.nama}</td>
                <td style={{ padding: "8px 12px" }}>{c.hp}</td>
                <td style={{ padding: "8px 12px" }}>{c.produk_terakhir}</td>
                <td style={{ padding: "8px 12px" }}>{c.pekerjaan}</td>
                <td style={{ padding: "8px 12px" }}>
                  {followedUp.has(c.cif) ? (
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: "#27500A", background: "#EAF3DE", padding: "5px 10px", borderRadius: 6 }}>Sudah di-follow up</span>
                  ) : (
                    <button onClick={() => setSelectedCustomer(c)} style={{ background: "#F1EFE8", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 500, cursor: "pointer", color: "#3d3d3a" }}>
                      Follow up
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#5F5E5A" }}>
          Tampilkan
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ ...inputStyle, width: "auto", padding: "5px 8px", fontSize: 12.5 }}>
            {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          per halaman
        </div>
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{ background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, cursor: currentPage <= 1 ? "not-allowed" : "pointer", color: currentPage <= 1 ? "#C7C5BC" : "#3d3d3a" }}
            >
              Sebelumnya
            </button>
            <span style={{ fontSize: 12.5, color: "#5F5E5A" }}>Halaman {currentPage} dari {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{ background: "#fff", border: "1px solid #D3D1C7", borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, cursor: currentPage >= totalPages ? "not-allowed" : "pointer", color: currentPage >= totalPages ? "#C7C5BC" : "#3d3d3a" }}
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>

      {selectedCustomer && (
        <InactiveCustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onSubmitLead={onSubmit}
          onConverted={handleConverted}
        />
      )}
    </div>
  );
}

async function fetchAllRows(table, orderColumn, ascending) {
  const pageSize = 1000;
  let allRows = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderColumn, { ascending })
      .range(from, from + pageSize - 1);
    if (error) return { data: null, error };
    allRows = allRows.concat(data || []);
    if (!data || data.length < pageSize) break;
    from += pageSize;
  }
  return { data: allRows, error: null };
}

export default function App() {
  const [leads, setLeads] = useState([]);
  const [view, setView] = useState("input");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [inputTab, setInputTab] = useState("new");
  const [simulasiPrefill, setSimulasiPrefill] = useState(null);

  const handleOpenSimulasi = (lead) => {
    let initialProduct = "arrum_bpkb";
    const p = (lead?.produk || "").toUpperCase();
    if (p.includes("AMANAH")) initialProduct = "amanah";
    else if (p.includes("MULTIGUNA")) initialProduct = "arrum_multiguna";
    setSimulasiPrefill({
      nama: lead?.nama || "",
      product: initialProduct,
      produkName: lead?.produk || "",
    });
    setView("simulasi");
  };
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [customersInactive, setCustomersInactive] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchAllRows("leads", "tanggal", false);
      if (error) {
        setLoadError(error.message);
      } else {
        setLeads(data || []);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchAllRows("customers_inactive", "nama", true);
      if (!error) setCustomersInactive(data || []);
    })();
  }, []);

  const addLead = async (lead) => {
    const { id, ...row } = lead; // biarkan Supabase yang membuat id (uuid)
    const { data, error } = await supabase.from("leads").insert([row]).select();
    if (error) {
      alert("Gagal menyimpan data: " + error.message);
      return;
    }
    if (data && data[0]) setLeads((prev) => [data[0], ...prev]);
  };

  const updateLead = async (id, patch) => {
    const { data, error } = await supabase.from("leads").update(patch).eq("id", id).select();
    if (error) {
      alert("Gagal menyimpan perubahan: " + error.message);
      return;
    }
    if (data && data[0]) setLeads((prev) => prev.map((l) => (l.id === id ? data[0] : l)));
  };

  if (!loaded) return <div style={{ padding: 40, fontFamily: "sans-serif", color: "#888780" }}>Memuat data dari database...</div>;
  if (loadError) return (
    <div style={{ padding: 40, fontFamily: "sans-serif", color: "#A32D2D" }}>
      Gagal memuat data dari Supabase: {loadError}
      <br />Cek apakah file .env sudah diisi dengan benar dan tabel "leads" sudah dibuat.
    </div>
  );

  return (
    <div className="mobile-app" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#F8F9FA", minHeight: "100vh" }}>
      <style>{MOBILE_CSS}</style>
      <div className="mobile-header" style={{ background: "#0A5C36", color: "#fff", padding: "12px 24px" }}>
        <div className="mobile-header-logos" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <img src={DANANTARA_LOGO} alt="Logo Danantara Indonesia" style={{ height: 26, width: "auto", background: "#fff", borderRadius: 4, padding: "3px 6px" }} />
          <img src={PEGADAIAN_LOGO} alt="Logo Pegadaian Syariah" style={{ height: 32, width: "auto", background: "#fff", borderRadius: 4, padding: "3px 8px" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div className="mobile-header-title" style={{ fontSize: 17, fontWeight: 700 }}>Pegadaian Mikro & Emas Leads Tracker</div>
            <div className="mobile-header-subtitle" style={{ fontSize: 12, color: "#C9E4D6" }}>Cabang Syariah Daan Mogot</div>
          </div>
          <div className="desktop-main-nav" style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("input")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "input" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "input" ? "#0A5C36" : "#fff",
            }}><ClipboardList size={15} /> Portal pemasar</button>
            <button onClick={() => setView("simulasi")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "simulasi" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "simulasi" ? "#0A5C36" : "#fff",
            }}><Calculator size={15} /> Simulasi produk</button>
            <button onClick={() => setView("data")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "data" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "data" ? "#0A5C36" : "#fff",
            }}>{adminUnlocked ? <Database size={15} /> : <Lock size={13} />} Data</button>
            <button onClick={() => setView("admin")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "admin" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "admin" ? "#0A5C36" : "#fff",
            }}>{adminUnlocked ? <LayoutDashboard size={15} /> : <Lock size={13} />} Dashboard admin</button>
          </div>
        </div>
      </div>

      <div className="mobile-content" style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 24px 60px" }}>
        {view === "input" ? (
          <div>
            <div className="portal-tabs" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <button onClick={() => setInputTab("new")} style={{ padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: inputTab === "new" ? "#0A5C36" : "#F1EFE8", color: inputTab === "new" ? "#fff" : "#5F5E5A" }}>Input prospek baru</button>
              <button onClick={() => setInputTab("update")} style={{ padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: inputTab === "update" ? "#0A5C36" : "#F1EFE8", color: inputTab === "update" ? "#fff" : "#5F5E5A" }}>Update prospek saya</button>
            </div>
            {inputTab === "new" ? <NewLeadForm onSubmit={addLead} /> : <UpdateLeadPanel leads={leads} onUpdate={updateLead} onOpenSimulasi={handleOpenSimulasi} />}
          </div>
        ) : view === "simulasi" ? (
          <SimulasiProdukPanel prefill={simulasiPrefill} />
        ) : view === "data" ? (
          adminUnlocked ? <DataNasabahInaktifPanel customers={customersInactive} onSubmit={addLead} /> : <AdminGate onUnlock={() => setAdminUnlocked(true)} />
        ) : adminUnlocked ? (
          <AdminDashboard leads={leads} onUpdate={updateLead} onOpenSimulasi={handleOpenSimulasi} />
        ) : (
          <AdminGate onUnlock={() => setAdminUnlocked(true)} />
        )}
      </div>

      <nav className="mobile-bottom-nav" aria-label="Navigasi mobile">
        <button className={view === "input" ? "active" : ""} onClick={() => setView("input")}>
          <ClipboardList />
          <span>Pemasar</span>
        </button>
        <button className={view === "simulasi" ? "active" : ""} onClick={() => setView("simulasi")}>
          <Calculator />
          <span>Simulasi</span>
        </button>
        <button className={view === "data" ? "active" : ""} onClick={() => setView("data")}>
          {adminUnlocked ? <Database /> : <Lock />}
          <span>Data</span>
        </button>
        <button className={view === "admin" ? "active" : ""} onClick={() => setView("admin")}>
          {adminUnlocked ? <LayoutDashboard /> : <Lock />}
          <span>Admin</span>
        </button>
      </nav>
    </div>
  );
}
