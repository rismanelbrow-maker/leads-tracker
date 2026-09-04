import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList
} from "recharts";
import {
  Users, TrendingUp, CheckCircle2, Clock, Search, Plus, Download,
  ArrowRight, LayoutDashboard, ClipboardList, AlertCircle, Lock,
  List, Coins, Gem, Trophy, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, History, Layers, MoreVertical, FileText, FileDown, Calculator
} from "lucide-react";

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

function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-lib="html2canvas"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Gagal memuat library ekspor gambar")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.dataset.lib = "html2canvas";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Gagal memuat library ekspor gambar"));
    document.body.appendChild(script);
  });
}

const SEED_LEADS = [
  { id: "1", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "MONALI", phone: "085775783728", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "David", unit: "UPS Sumur Bor", status: "REJECTED", catatan: "2026-05-22: Belum Berminat" },
  { id: "2", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "(Tanpa nama)", phone: "082179420082", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Adiesty", unit: "UPS Semanan", status: "NEW", catatan: "2026-05-22: Berminat tapi tidak ada lengkap persyaratan" },
  { id: "3", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Suerni wulandari", phone: "081283985320", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "4", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Restauli leliana", phone: "085310799426", produk: "AMANAH", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "5", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Saparudin", phone: "082227976829", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "6", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Tya", phone: "085280032343", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Tidak Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-22: Tidak jadi pengajuan" },
  { id: "7", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Rini", phone: "087830622894", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "8", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Irwansyah", phone: "085882163266", produk: "ARRUM MULTIGUNA", keterangan: "Berminat", pemasar: "Johan Jozzz", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "9", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "FEMI MEGIANA", phone: "081387867015", produk: "ARRUM MULTIGUNA", keterangan: "Belum Berminat", pemasar: "Novi", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-22: diskusi dengan pasangan" },
  { id: "10", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "ANGGA KURNIAWAN", phone: "081281122384", produk: "ARRUM MULTIGUNA", keterangan: "Tidak Berminat", pemasar: "Novi", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-22: TIDAK BERMINAT" },
  { id: "11", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Patmi", phone: "08131854689", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-22: Tnya suami dlu" },
  { id: "12", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Yuni wijaya", phone: "081802838563", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-22: Tunggu lunas dlu hutangnya" },
  { id: "13", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Retno Widowari", phone: "082152224599", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-22: Masih mau fikir² dulu" },
  { id: "14", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Gita ayu p", phone: "082232779201", produk: "MULIA TABUNGAN EMAS", keterangan: "Belum Berminat", pemasar: "Gita ayu p", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-22: Blm mau" },
  { id: "15", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Effy Kuntoro", phone: "085724487260", produk: "MULIA TABUNGAN EMAS", keterangan: "Berminat", pemasar: "Elvina", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "16", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Eva", phone: "08128699277", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-22: Lagi diskusi" },
  { id: "17", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Betty serenavia", phone: "085880559734", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-23: BERMINAT" },
  { id: "18", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Yati Nurhayati", phone: "081320363699", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-23: Hutang masih bnyak" },
  { id: "19", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Nadira", phone: "081285685216", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-23: Mau liat dr tring" },
  { id: "20", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "NUR CHAMMAH", phone: "085692306062", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-23: Mau izin suami dulu" },
  { id: "21", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Andriani", phone: "081283605499", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-23: Blm mau investasi" },
  { id: "22", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Dessy Ratna pratiwi", phone: "0895403389904", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-05-23: BERMINAT" },
  { id: "23", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Romelah", phone: "085694337939", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "david", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-05-23: menunggu pelunasan bpkb di leasing sebelah" },
  { id: "24", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Bayhaqi", phone: "087879975336", produk: "ARRUM MULTIGUNA", keterangan: "Berminat", pemasar: "Johan Jozzz", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-05-23: BERMINAT" },
  { id: "25", tanggal: "2026-05-23", sumber: "Nasabah Aktif", nama: "Nadia Mariska", phone: "087879975366", produk: "ARRUM MULTIGUNA", keterangan: "Berminat", pemasar: "Johan Jozzz", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-05-23: BERMINAT" },
  { id: "26", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Asih kurniati", phone: "087809705586", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-25: TIDAK BERMINAT" },
  { id: "27", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "IDA MUDHAKIROH", phone: "087786661673", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-25: BERMINAT" },
  { id: "28", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Atep sumpena", phone: "081517178903", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-25: BERMINAT" },
  { id: "29", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Zulfa nur latfhfa", phone: "08551997247", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "NEW", catatan: "2026-05-25: BERMINAT" },
  { id: "30", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Melisa puspita sari", phone: "085191600118", produk: "RAHN TASJILY TANAH", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-05-25: BERMINAT" },
  { id: "31", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Melisa puspita sari", phone: "085191600118", produk: "RAHN TASJILY TANAH", keterangan: "Berminat", pemasar: "Ria desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-05-25: BERMINAT" },
  { id: "32", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Nadia Mariska", phone: "087879975336", produk: "ARRUM MULTIGUNA", keterangan: "Belum Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "SURVEYED", catatan: "2026-05-25: Survei Awal" },
  { id: "33", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Dwi", phone: "082241402422", produk: "AMANAH", keterangan: "Belum Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-25: Croselling" },
  { id: "34", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Lenny kumala", phone: "081398811145", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-25: Jawabnya nanti" },
  { id: "35", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Hastika", phone: "08117802008", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-25: Pusing byr bunga" },
  { id: "36", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Indah kusuma dewi", phone: "085780937858", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "NEW", catatan: "2026-05-25: BERMINAT" },
  { id: "37", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Aan Tri Winda", phone: "081294584069", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "dapit", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-05-25: mulai cicil lagi bulan depan" },
  { id: "38", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Triana", phone: "081908338914", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Mas Nova R", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-25: liat besok" },
  { id: "39", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Elly yuliati", phone: "08121003886", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-25: Ingin keluar kota dulu" },
  { id: "40", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Asih", phone: "083806539027", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-25: Pikir2 dulu" },
  { id: "41", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Apriyanti", phone: "081284859497", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "MAS NOVA JOSSSS", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-25: Nunggu besok" },
  { id: "42", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Siti Nurdiani", phone: "08139873621", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "MAS Nova Lagi Ajaaaaa..wkwkwkkk", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-25: Arisan besok e tapi denom 5 gram gak ada" },
  { id: "43", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "ANAH YULIANTI", phone: "083854580380", produk: "ARRUM MULTIGUNA", keterangan: "Belum Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-25: Blm ada usaha" },
  { id: "44", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Elmayli", phone: "081317720325", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu purwaningtyas", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-25: Mau izin suami" },
  { id: "45", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Cheby", phone: "089694442257", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "APPROVED", catatan: "2026-05-25: Arisan di Proses Tgl 26" },
  { id: "46", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Muhammad Furqon", phone: "+62 851-7310-7797", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "DISBURSED", catatan: "2026-05-25: Tinggal tunggu pencairan" },
  { id: "47", tanggal: "2026-05-25", sumber: "Nasabah Aktif", nama: "Tuni", phone: "+62 851-7310-7797", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "SURVEYED", catatan: "2026-05-25: Sudah di survey" },
  { id: "48", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Hedwinf", phone: "085894267453", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-26: Masih nunggu harga turun lagi" },
  { id: "49", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Fajar Abdul Rohman", phone: "08994895625", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-26: TIDAK BERMINAT" },
  { id: "50", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Handoko", phone: "0813835550024", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-26: Masih banyak kebutuhan" },
  { id: "51", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Ayu fatmala", phone: "082249932150", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-26: TIDAK BERMINAT" },
  { id: "52", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Susilawati", phone: "085810970907", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-26: TIDAK BERMINAT" },
  { id: "53", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "suliwati gunawan", phone: "08139856731", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "NOVA RISQIANTO", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-26: bulan depan aja" },
  { id: "54", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Rahel gustiani", phone: "08138597625", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Mas Nova", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-26: BERMINAT" },
  { id: "55", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "SUYONO", phone: "081385996833", produk: "ARRUM MULTIGUNA", keterangan: "Tidak Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-26: TIDAK BERMINAT" },
  { id: "56", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "WINARNI LISABATI", phone: "08953218576032", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-26: TIDAK BERMINAT" },
  { id: "57", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Liana Jo", phone: "0816815510", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-05-26: tidak respon" },
  { id: "58", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Jessica  Timoti", phone: "087777051845", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-05-26: tidak respon" },
  { id: "59", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Tjan lian ni", phone: "082240088567", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-05-26: Minat antam 10gram" },
  { id: "60", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Norma Ningsih", phone: "082178373466", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-05-26: Masih ada cicilan emas" },
  { id: "61", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Reena Roya", phone: "087711498749", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-05-26: Masih galau cicil mulia atw tabungan emas" },
  { id: "62", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Wahyudi", phone: "0857-1788-6197", produk: "AMANAH", keterangan: "Belum Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "SURVEYED", catatan: "2026-05-26: Survei awal" },
  { id: "63", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Ai ling hiduwan", phone: "0817282788", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Retno", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-26: TIDAK BERMINAT" },
  { id: "64", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Nining ardini", phone: "+62 877-2075-9237", produk: "AMANAH", keterangan: "Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-26: BERMINAT" },
  { id: "65", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Ir. Irfan", phone: "+62 877-4207-3448", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-26: BERMINAT" },
  { id: "66", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Retno darwati", phone: "081388270285", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-26: Masih ada kebutuhan lain" },
  { id: "67", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Intan sari ida silalahi", phone: "082275439276", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "68", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Yulia kristian", phone: "082298908848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "69", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Haeruman", phone: "085894996849", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Salma rana", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-05-29: Mikir2 dulu" },
  { id: "70", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "DENNY SUNGKONO", phone: "085157776328", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-29: Mau izin istri dulu" },
  { id: "71", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Rina jamilah", phone: "082261589379", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Salma rana", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "72", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "YENNY HARTINI", phone: "081318835435", produk: "MULIA TABUNGAN EMAS", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-05-29: Blm mau menabung" },
  { id: "73", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Denny sungkono", phone: "081218557637", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "74", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Yenny hartini", phone: "081318835435", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "75", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Luh Legawati", phone: "085899448621", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-05-29: Masih ada cicilan 50 gr" },
  { id: "76", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "AFWAN FADILLAH", phone: "088211866543", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "77", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "IRFAN", phone: "081316006003", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "RISMAN", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-29: BLM ADA RESPON" },
  { id: "78", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Tjan liani", phone: "082240088568", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-05-29: BERMINAT" },
  { id: "79", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Pelly Tjahjono", phone: "+62 818-166-992", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-05-29: TIDAK BERMINAT" },
  { id: "80", tanggal: "2026-05-26", sumber: "Nasabah Aktif", nama: "Sofiyana", phone: "081381182086", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Retno Mumpunj Diah", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-26: Lagi butuh dana" },
  { id: "81", tanggal: "2026-05-29", sumber: "Nasabah Aktif", nama: "Priyana", phone: "088294759558", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Retno", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-29: Banyak butuh" },
  { id: "82", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Ellia rachman", phone: "085810346794", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Salma rana", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-05-30: Nanya2 dp" },
  { id: "83", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "ACENG HASAN", phone: "089508242926", produk: "AMANAH", keterangan: "Belum Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-30: BLM ADA RESPON" },
  { id: "84", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "AQYAS ASHARI", phone: "085717217392", produk: "AMANAH", keterangan: "Belum Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-05-30: BLM ADA RESPON" },
  { id: "85", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Noormalasari", phone: "08888598122", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Salma rana", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-05-30: BERMINAT" },
  { id: "86", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Ellia Rachman", phone: "085810346794", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-05-30: TIDAK BERMINAT" },
  { id: "87", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Angelita", phone: "+62 896-0435-3011", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-05-30: TIDAK BERMINAT" },
  { id: "88", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Sahroni", phone: "0878672652", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-05-30: Buat bayar sekolah" },
  { id: "89", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Mohammad yusuf", phone: "08138727627", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-05-30: Masih ada cicilan 2 gr" },
  { id: "90", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Sri suryati", phone: "0857477484", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-30: TIDAK BERMINAT" },
  { id: "91", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Muhammad dahlan", phone: "083897717466", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-05-30: TIDAK BERMINAT" },
  { id: "92", tanggal: "2026-05-30", sumber: "Nasabah Aktif", nama: "Maswad", phone: "081574636517", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-05-30: Masih mempertimbagkan dulu" },
  { id: "93", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Neneng", phone: "089629977383", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-02: BERMINAT" },
  { id: "94", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Dicki afrizal", phone: "082113158754", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-02: TIDAK BERMINAT" },
  { id: "95", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Muhamad dahlan", phone: "083897717466", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-02: TIDAK BERMINAT" },
  { id: "96", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Mustika Sinuraya", phone: "081389450995", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "GITA AYU P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-02: Masih mau nunggu harga turun lagi" },
  { id: "97", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "MOHAMMAD FAISAL", phone: "081285476700", produk: "MULIA TABUNGAN EMAS", keterangan: "Belum Berminat", pemasar: "GITA AYU P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-02: Masih banyak kebutuhan" },
  { id: "98", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Elis sugiarti", phone: "081310948087", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Tidak Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-02: TIDAK BERMINAT" },
  { id: "99", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Nurhayati", phone: "0897-7017-414", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Ariandi", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-02: BERMINAT" },
  { id: "100", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "UMIYAH", phone: "088298505283", produk: "ARRUM MULTIGUNA", keterangan: "Berminat", pemasar: "BUDI", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-02: BERMINAT" },
  { id: "101", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "edi sudianto", phone: "081388536361", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Mas Nova", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-02: bulan depan tapi" },
  { id: "102", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "AQYAS ASHARI", phone: "085717217392", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-02: BLM ADA RESPON" },
  { id: "103", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "novita", phone: "081390862356", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "MAS NOVAAAAAA", unit: "UPS Poris", status: "NEW", catatan: "2026-06-02: BERMINAT" },
  { id: "104", tanggal: "2026-06-02", sumber: "Nasabah Aktif", nama: "Dewi Ratih Widjiastuti", phone: "08567886577", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "dapit", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-02: cek-cek harga" },
  { id: "105", tanggal: "2026-05-22", sumber: "Nasabah Aktif", nama: "Nurhayati", phone: "08977017414", produk: "RAHN TASJILY TANAH", keterangan: "Berminat", pemasar: "Ari", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-05-22: BERMINAT" },
  { id: "106", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "SUTOPO HARYONO", phone: "081242577758", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-03: TIDAK BERMINAT" },
  { id: "107", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Fajar susanto", phone: "089601963025", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-03: TIDAK BERMINAT" },
  { id: "108", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "REZA AHYANDI", phone: "081399873766", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-03: TIDAK BERMINAT" },
  { id: "109", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Yatie Hayati", phone: "087774706068", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-03: Mau izin suami dulu" },
  { id: "110", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Nurhamidah", phone: "0895331936317", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Salma rana", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-06-03: Masih mikir2" },
  { id: "111", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "hotma sinaga", phone: "081377459873", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nova R", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-03: besok" },
  { id: "112", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "yati hartati", phone: "087774678872", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nova R", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-03: besook insya Allah" },
  { id: "113", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Suryadi", phone: "082111880560", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-03: TIDAK BERMINAT" },
  { id: "114", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Andriani", phone: "081283605499", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-03: TIDAK BERMINAT" },
  { id: "115", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Kris wuryani", phone: "0813877382", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-03: Closing 5 gr" },
  { id: "116", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Berliana Hofmaida", phone: "0818183330", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Retno Mumpuni", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-03: BERMINAT" },
  { id: "117", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Ir sitti harmanita", phone: "085313103141", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-03: BERMINAT" },
  { id: "118", tanggal: "2026-06-03", sumber: "Nasabah Aktif", nama: "Nurhamidah", phone: "0895331936317", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Budi", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-06-03: masing pikir²" },
  { id: "119", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Novi yulyanti", phone: "081210298822", produk: "AMANAH", keterangan: "Berminat", pemasar: "NOVA RISQIANTO", unit: "UPS Poris", status: "NEW", catatan: "2026-06-04: BERMINAT" },
  { id: "120", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Apriyanti", phone: "08138853631", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "NOVA RISQIANTO", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-04: BERMINAT" },
  { id: "121", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Tri asih", phone: "082112688796", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-04: TIDAK BERMINAT" },
  { id: "122", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Amid", phone: "081317000256", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-04: TIDAK BERMINAT" },
  { id: "123", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Tania Virginia", phone: "081287812587", produk: "MULIA TABUNGAN EMAS", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-04: Blm mau menabung" },
  { id: "124", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Yuli cahyani", phone: "081212055500", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-04: Masih mempertimbangkan hrga" },
  { id: "125", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Heni Maryani", phone: "088298548349", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-04: TIDAK BERMINAT" },
  { id: "126", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Yasen", phone: "08113398528", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-04: TIDAK BERMINAT" },
  { id: "127", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "dwi hartanto", phone: "085559524318", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "novi", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-04: blm ada respon" },
  { id: "128", tanggal: "2026-06-04", sumber: "Nasabah Aktif", nama: "Rooney Setiadi", phone: "081288337667", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Budi", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-06-04: BERMINAT" },
  { id: "129", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Raka Aditya Febrian", phone: "081319040689", produk: "ARRUM MULTIGUNA", keterangan: "Berminat", pemasar: "Johan", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-06-05: BERMINAT" },
  { id: "130", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Faiz", phone: "087786661673", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-05: BERMINAT" },
  { id: "131", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "ahmad rizki", phone: "081380768819", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "novi", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-05: blm ada respon" },
  { id: "132", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Halimah", phone: "0895630344179", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-05: TIDAK BERMINAT" },
  { id: "133", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Halimah", phone: "0895630344179", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-05: TIDAK BERMINAT" },
  { id: "134", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Halimah Fevryanisa", phone: "0895630344179", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-05: TIDAK BERMINAT" },
  { id: "135", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Sri Sujiah", phone: "089520613696", produk: "MULIA TABUNGAN EMAS", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-05: TIDAK BERMINAT" },
  { id: "136", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Jimmy", phone: "081380081982", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-05: TIDAK BERMINAT" },
  { id: "137", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Analisa Fanaetu", phone: "081222219723ĥ", produk: "MULIA TABUNGAN EMAS", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-05: Masih mikir mikir dulu" },
  { id: "138", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "joviani", phone: "081388536361", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Nova", unit: "UPS Poris", status: "NEW", catatan: "2026-06-05: BERMINAT" },
  { id: "139", tanggal: "2026-06-05", sumber: "Nasabah Aktif", nama: "Dr Dian sita Hapsari", phone: "08138573629", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Mas Nova Lah..", unit: "UPS Poris", status: "NEW", catatan: "2026-06-05: BERMINAT" },
  { id: "140", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "Safrida", phone: "087889504505", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-06: TIDAK BERMINAT" },
  { id: "141", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "lenny", phone: "0813987636723", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nova", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-06: masih ada cicilan berjalan" },
  { id: "142", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "ADI SAMSUADI", phone: "085157338704", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-06: Masih banyak kebutuhan" },
  { id: "143", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "Yola Melinda", phone: "081280198", produk: "MULIA TABUNGAN EMAS", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-06: Uangnya buat keperluan anak sekolah dulu" },
  { id: "144", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "Effri", phone: "0818819002", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-06: TIDAK BERMINAT" },
  { id: "145", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "Adi samsuadi", phone: "085157338704", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-06: TIDAK BERMINAT" },
  { id: "146", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "Hanna rotua h", phone: "085747825487", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-06: Bulan depan rencana ccil lm kembali" },
  { id: "147", tanggal: "2026-06-06", sumber: "Nasabah Aktif", nama: "Hj SAHATI", phone: "081345736782", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-06: Closing 2 gr" },
  { id: "148", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Yeni H", phone: "085929031975", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "149", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Uswatun Hasanah", phone: "085338953640", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "150", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Zara Syafitri", phone: "081385527692", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "151", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Sri Widiastuti", phone: "085817650020", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "152", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Fadiah", phone: "085832052941", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "153", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "eko martin", phone: "08138746721", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "nova", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "154", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Oda rahma", phone: "085218355441", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-08: BERMINAT" },
  { id: "155", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Mursiti", phone: "0878772828", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-08: Closing 2 gr" },
  { id: "156", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "Heny krisnawati", phone: "082122750750", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-09: TIDAK BERMINAT" },
  { id: "157", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "Tamara wijaya", phone: "085711925958", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-09: TIDAK BERMINAT" },
  { id: "158", tanggal: "2026-06-08", sumber: "Nasabah Aktif", nama: "Ghea", phone: "085179967207", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-08: TIDAK BERMINAT" },
  { id: "159", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "Nurimah", phone: "087756489257", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-09: TIDAK BERMINAT" },
  { id: "160", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "Jahja", phone: "08129627551", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-09: TIDAK BERMINAT" },
  { id: "161", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "liliyanah", phone: "089684264273", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "novi", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-09: blm ada respon" },
  { id: "162", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "Fatimah", phone: "08138762772", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-09: Mau beli logan mulia, tapi arum bpkb nya tidak tercover asuransi nya" },
  { id: "163", tanggal: "2026-06-09", sumber: "Nasabah Aktif", nama: "Chaerunisa", phone: "089525052211", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-06-09: tanya suami dlu" },
  { id: "164", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Sidqy", phone: "081290096604", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "165", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "DELLA RESWARI", phone: "081311597660", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-10: BERMINAT" },
  { id: "166", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "atep", phone: "081517178903", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "ari", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-10: BERMINAT" },
  { id: "167", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "ikeu sri", phone: "083812859106", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "ari", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-10: BERMINAT" },
  { id: "168", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "eni junaeni", phone: "087756916292", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "ari", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-10: dipikirin dulu" },
  { id: "169", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "sunandar", phone: "089515372951", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "ari", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-10: diobrolin dngn istri dulu" },
  { id: "170", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "HERLINAWATI", phone: "081383377229", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-10: BLM ADA RESPON" },
  { id: "171", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Desmayanti", phone: "087827262672", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-10: Lagi renovasi rumah dlu" },
  { id: "172", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Endang rumini", phone: "08128735367", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-10: Buat bayar sekolah" },
  { id: "173", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Wulan", phone: "+62 831-6905-2112", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "174", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Desson", phone: "+62 857-7029-2150", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "175", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Merryana narulina", phone: "+62 877-8524-9288", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Vina", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "176", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Maya Puspita Sari", phone: "087784149061", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "177", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Heny Susiana Surjati", phone: "083892982373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu p", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-10: Mau Izin Suami dulu" },
  { id: "178", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Henny", phone: "08388575787", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "179", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "Iis awistri", phone: "0856688383", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "180", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "helmi andriani", phone: "0812999867733", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Nova", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-10: BERMINAT" },
  { id: "181", tanggal: "2026-06-10", sumber: "Nasabah Aktif", nama: "siti fadhilah", phone: "08138618651", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Nova", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-10: TIDAK BERMINAT" },
  { id: "182", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Devi nurlaila", phone: "081299151331", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-11: TIDAK BERMINAT" },
  { id: "183", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Imelda", phone: "081310040697", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-11: TIDAK BERMINAT" },
  { id: "184", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "DONNIA CORRY", phone: "082213356l939483", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-11: TIDAK BERMINAT" },
  { id: "185", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Jihan", phone: "08574883889", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-11: TIDAK BERMINAT" },
  { id: "186", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Rizta", phone: "0856737372", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-11: TIDAK BERMINAT" },
  { id: "187", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Velda", phone: "08137667388", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "NEW", catatan: "2026-06-11: BERMINAT" },
  { id: "188", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Ria Desvina", phone: "088212056876", produk: "ARRUM HAJI", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-11: BERMINAT" },
  { id: "189", tanggal: "2026-06-11", sumber: "Nasabah Aktif", nama: "Nadya Mutiara", phone: "+62 813-1178-8522", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-06-11: TIDAK BERMINAT" },
  { id: "190", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Nurhasanah", phone: "085890221244", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "Johan jozzzz", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-06-12: Mnunggu persetujuan Suami" },
  { id: "191", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Evy Juwitasari", phone: "089688246864", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-12: TIDAK BERMINAT" },
  { id: "192", tanggal: "2026-06-26", sumber: "Nasabah Aktif", nama: "Iva Marviana", phone: "088214340554", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-26: TIDAK BERMINAT" },
  { id: "193", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Dyah ekayani", phone: "08821467447", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-12: TIDAK BERMINAT" },
  { id: "194", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Iva marviana", phone: "0856474737", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-12: TIDAK BERMINAT" },
  { id: "195", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Romelah", phone: "085694337939", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Roa Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-12: BERMINAT" },
  { id: "196", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Neni saadah", phone: "081367345262", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-12: Mau bayar sekolah terlebih dahulu" },
  { id: "197", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Mariyah", phone: "08137625572", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-12: Nanya suami dlu,, nanti kembali lagi" },
  { id: "198", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Susanti", phone: "081381173765", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-12: TIDAK BERMINAT" },
  { id: "199", tanggal: "2026-06-12", sumber: "Nasabah Aktif", nama: "Murdayani", phone: "+62 812-9689-964", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-06-12: TIDAK BERMINAT" },
  { id: "200", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Jhenny", phone: "085175358220", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-13: TIDAK BERMINAT" },
  { id: "201", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Magdalena junitha", phone: "081878272727", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-13: Masih punya cicilan Lm" },
  { id: "202", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Indriati sudiani", phone: "082187252939", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-13: Tapi nanya suami dlu" },
  { id: "203", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Hermayanti", phone: "0812190999929", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu p", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-13: Mau nanya ke suami dulu" },
  { id: "204", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Yayah marliyah", phone: "0827727272", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-13: TIDAK BERMINAT" },
  { id: "205", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Iva marviana", phone: "08537737344", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-13: TIDAK BERMINAT" },
  { id: "206", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Suntani", phone: "0853737378", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-13: TIDAK BERMINAT" },
  { id: "207", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Syukria Muna", phone: "087877885777", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Retno Mumpuni Diah", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-13: TIDAK BERMINAT" },
  { id: "208", tanggal: "2026-06-13", sumber: "Nasabah Aktif", nama: "Romelah", phone: "085694337939", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-13: BERMINAT" },
  { id: "209", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Dewi tjandra", phone: "081316589179", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-15: TIDAK BERMINAT" },
  { id: "210", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Linda Fitriani", phone: "085772033664", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "dapit", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-15: bertanya-tanya" },
  { id: "211", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Ratih marlisah", phone: "0823872778", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-15: Closing 5 gr" },
  { id: "212", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Andryan chandra", phone: "082376628882", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-15: Lagi di cek pevindonya" },
  { id: "213", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Marhayati", phone: "0857785857", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-15: TIDAK BERMINAT" },
  { id: "214", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Zunati", phone: "0853737838", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-15: TIDAK BERMINAT" },
  { id: "215", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Julaiha", phone: "083808866661", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-15: TIDAK BERMINAT" },
  { id: "216", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Dara puspita sari", phone: "081287091060", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-15: TIDAK BERMINAT" },
  { id: "217", tanggal: "2026-06-15", sumber: "Nasabah Aktif", nama: "Rohanah", phone: "08567373899773", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-06-15: TIDAK BERMINAT" },
  { id: "218", tanggal: "2026-06-17", sumber: "Nasabah Aktif", nama: "NOVITA LIOE", phone: "085117556098", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-17: TIDAK BERMINAT" },
  { id: "219", tanggal: "2026-06-17", sumber: "Nasabah Aktif", nama: "Iis Nurjanah", phone: "085280000925", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-17: TIDAK BERMINAT" },
  { id: "220", tanggal: "2026-06-17", sumber: "Nasabah Aktif", nama: "nurul alfiah", phone: "081388536361", produk: "AMANAH", keterangan: "Berminat", pemasar: "nova", unit: "UPS Poris", status: "NEW", catatan: "2026-06-17: BERMINAT" },
  { id: "221", tanggal: "2026-06-17", sumber: "Nasabah Aktif", nama: "Merna", phone: "081264849491", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-17: BERMINAT" },
  { id: "222", tanggal: "2026-06-17", sumber: "Nasabah Aktif", nama: "Arie hidayat", phone: "0856373738", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-17: TIDAK BERMINAT" },
  { id: "223", tanggal: "2026-06-17", sumber: "Nasabah Aktif", nama: "Fedora", phone: "08563737373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-17: TIDAK BERMINAT" },
  { id: "224", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "virna", phone: "081319789189", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-06-18: TIDAK BERMINAT" },
  { id: "225", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "Kharisma", phone: "0856377373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-18: TIDAK BERMINAT" },
  { id: "226", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "Teguh aprianto", phone: "08566373738", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-18: TIDAK BERMINAT" },
  { id: "227", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "malvin yulita", phone: "08127658753", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "Nova", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-18: prosek cek slik" },
  { id: "228", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "Elmayli", phone: "081317720325", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita ayu", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-18: TIDAK BERMINAT" },
  { id: "229", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "Ati maryati", phone: "0821230344330", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-18: TIDAK BERMINAT" },
  { id: "230", tanggal: "2026-06-18", sumber: "Nasabah Aktif", nama: "Yuii aningsih", phone: "087786213617", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-18: BERMINAT" },
  { id: "231", tanggal: "2026-06-19", sumber: "Nasabah Aktif", nama: "Norma Ningsih", phone: "081372667272", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-19: Alhamdulillah 10 gr" },
  { id: "232", tanggal: "2026-06-19", sumber: "Nasabah Aktif", nama: "Gownarni", phone: "08563737737", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-19: TIDAK BERMINAT" },
  { id: "233", tanggal: "2026-06-19", sumber: "Nasabah Aktif", nama: "Maria perawati", phone: "08126474888", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-19: TIDAK BERMINAT" },
  { id: "234", tanggal: "2026-06-19", sumber: "Nasabah Aktif", nama: "Salbani", phone: "085811020800", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "Salma rana", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-06-19: Pengajuan ke 3" },
  { id: "235", tanggal: "2026-06-19", sumber: "Nasabah Aktif", nama: "Danang priambodo", phone: "08127278282", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "NEW", catatan: "2026-06-19: Berminat 5 gr" },
  { id: "236", tanggal: "2026-06-19", sumber: "Nasabah Aktif", nama: "Ir sltti harmaniti", phone: "085313103141", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Deavina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-19: BERMINAT" },
  { id: "237", tanggal: "2026-06-20", sumber: "Nasabah Aktif", nama: "Cynthia", phone: "0856377373", produk: "MULIA TABUNGAN EMAS", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-20: TIDAK BERMINAT" },
  { id: "238", tanggal: "2026-06-20", sumber: "Nasabah Aktif", nama: "Defi ningtyas", phone: "0856377373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-20: TIDAK BERMINAT" },
  { id: "239", tanggal: "2026-06-20", sumber: "Nasabah Aktif", nama: "Gita Ayu Purwaningtyas", phone: "081280680068", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-20: Menunggu harga turun lagi" },
  { id: "240", tanggal: "2026-06-20", sumber: "Nasabah Aktif", nama: "Bungawati SE", phone: "08111311340", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "GITA AYU P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-20: TIDAK BERMINAT" },
  { id: "241", tanggal: "2026-06-20", sumber: "Nasabah Aktif", nama: "Siti nadia", phone: "08237866526", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-20: 1 gr alhamdulillah" },
  { id: "242", tanggal: "2026-06-20", sumber: "Nasabah Aktif", nama: "Yayah uswiyah", phone: "08974154012", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-20: BERMINAT" },
  { id: "243", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Marsilah", phone: "087841720829", produk: "AMANAH", keterangan: "Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-06-22: BERMINAT" },
  { id: "244", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Fitria diena", phone: "08128992882", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dinas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-22: Alhamdulillah 5 gr" },
  { id: "245", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Arif s", phone: "08158894656", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-06-22: Sedang di pikirkan" },
  { id: "246", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Utari", phone: "08386574777", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "NEW", catatan: "2026-06-22: BERMINAT" },
  { id: "247", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Lim kim", phone: "0813464788", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-22: TIDAK BERMINAT" },
  { id: "248", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "NURHAETI", phone: "081383362299", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-22: TIDAK BERMINAT" },
  { id: "249", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Ifan Fachrudin", phone: "0895088117190", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-22: TIDAK BERMINAT" },
  { id: "250", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Yayah uswiyah", phone: "08974154012", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-22: BERMINAT" },
  { id: "251", tanggal: "2026-06-22", sumber: "Nasabah Aktif", nama: "Melisa putri", phone: "085191600118", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-22: BERMINAT" },
  { id: "252", tanggal: "2026-06-23", sumber: "Nasabah Aktif", nama: "irmayanti", phone: "085536686203", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Laesya", unit: "UPS Sumur Bor", status: "REJECTED", catatan: "2026-06-23: TIDAK BERMINAT" },
  { id: "253", tanggal: "2026-06-23", sumber: "Nasabah Aktif", nama: "Rita kamalia", phone: "081285382366", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-23: Tunggu harga emas turun lg" },
  { id: "254", tanggal: "2026-06-23", sumber: "Nasabah Aktif", nama: "SERI HUSNI LUBIS", phone: "081381545555", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "GITA AYU P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-23: TIDAK BERMINAT" },
  { id: "255", tanggal: "2026-06-23", sumber: "Nasabah Aktif", nama: "SHOVA VICKRIA", phone: "085710255678", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "GiTA AYU P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-23: TIDAK BERMINAT" },
  { id: "256", tanggal: "2026-06-23", sumber: "Nasabah Aktif", nama: "Harry", phone: "081808969600", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "NEW", catatan: "2026-06-23: BERMINAT" },
  { id: "257", tanggal: "2026-06-23", sumber: "Nasabah Aktif", nama: "Muji endarwati", phone: "0813757589", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-23: TIDAK BERMINAT" },
  { id: "258", tanggal: "2026-06-24", sumber: "Nasabah Aktif", nama: "Kieky ardiyansah", phone: "087859943249", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Johan Josz", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-06-24: BERMINAT" },
  { id: "259", tanggal: "2026-06-24", sumber: "Nasabah Aktif", nama: "Ali", phone: "082288232525", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-24: Uangnya buat anak sekolah dulu" },
  { id: "260", tanggal: "2026-06-24", sumber: "Nasabah Aktif", nama: "Nor Asyunita", phone: "081292898469", produk: "ARRUM MULTIGUNA", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-24: TIDAK BERMINAT" },
  { id: "261", tanggal: "2026-06-24", sumber: "Nasabah Aktif", nama: "Uswatun hasanah", phone: "08563738484", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-24: TIDAK BERMINAT" },
  { id: "262", tanggal: "2026-06-24", sumber: "Nasabah Aktif", nama: "Dewi suci", phone: "08137585898", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-24: TIDAK BERMINAT" },
  { id: "263", tanggal: "2026-06-24", sumber: "Nasabah Aktif", nama: "otin", phone: "081912415605", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Laesya", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-06-24: berminat tapi belum untuk saat ini" },
  { id: "264", tanggal: "2026-06-25", sumber: "Nasabah Aktif", nama: "donny tumewu", phone: "085210700531", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Laesya", unit: "UPS Sumur Bor", status: "REJECTED", catatan: "2026-06-25: TIDAK BERMINAT" },
  { id: "265", tanggal: "2026-06-25", sumber: "Nasabah Aktif", nama: "Ita rosita", phone: "081211445774", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-25: Memeprtimbangkan harga dengan pesaing" },
  { id: "266", tanggal: "2026-06-26", sumber: "Nasabah Aktif", nama: "DIANA INDRIAWATI", phone: "081286513811", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-26: TIDAK BERMINAT" },
  { id: "267", tanggal: "2026-06-26", sumber: "Nasabah Aktif", nama: "Nurwaindah", phone: "08786482914", produk: "EMASKU ULTIMATE SYARIAH", keterangan: "Tidak Berminat", pemasar: "Gita Ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-26: TIDAK BERMINAT" },
  { id: "268", tanggal: "2026-06-26", sumber: "Nasabah Aktif", nama: "Yati Nurhayati", phone: "0857373737", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-26: TIDAK BERMINAT" },
  { id: "269", tanggal: "2026-06-26", sumber: "Nasabah Aktif", nama: "Tjandra", phone: "0854774738", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-26: TIDAK BERMINAT" },
  { id: "270", tanggal: "2026-06-26", sumber: "Nasabah Aktif", nama: "Dwi sri yulianti", phone: "081532850491", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-26: Jika harga turun lg" },
  { id: "271", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "Ane padmasiwi", phone: "08138585850", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-27: TIDAK BERMINAT" },
  { id: "272", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "Eduardus", phone: "08113637663", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-27: TIDAK BERMINAT" },
  { id: "273", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "yeni nilandari", phone: "082120186951", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "laesya", unit: "UPS Sumur Bor", status: "REJECTED", catatan: "2026-06-27: TIDAK BERMINAT" },
  { id: "274", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "Yeni suryani", phone: "082123923130", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "NEW", catatan: "2026-06-27: BERMINAT" },
  { id: "275", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "ANIS TIARA", phone: "08999992078", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu p", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-27: TIDAK BERMINAT" },
  { id: "276", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "Tarhadi", phone: "0816482668", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-06-27: Nanti dulu" },
  { id: "277", tanggal: "2026-06-27", sumber: "Nasabah Aktif", nama: "Endang setiawati", phone: "08127662788", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-06-27: 2gr" },
  { id: "278", tanggal: "2026-06-30", sumber: "Nasabah Aktif", nama: "Lenny", phone: "081311507905", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-30: TIDAK BERMINAT" },
  { id: "279", tanggal: "2026-06-30", sumber: "Nasabah Aktif", nama: "Hanita", phone: "081297819781", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-06-30: Buat keperluan sekolah dl" },
  { id: "280", tanggal: "2026-06-30", sumber: "Nasabah Aktif", nama: "Anggun", phone: "0853674848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-30: TIDAK BERMINAT" },
  { id: "281", tanggal: "2026-06-30", sumber: "Nasabah Aktif", nama: "Siti mulyati", phone: "08127474748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-06-30: TIDAK BERMINAT" },
  { id: "282", tanggal: "2026-07-01", sumber: "Nasabah Aktif", nama: "Defi", phone: "0856373838", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-01: TIDAK BERMINAT" },
  { id: "283", tanggal: "2026-07-01", sumber: "Nasabah Aktif", nama: "Julaiha", phone: "08137374748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-01: TIDAK BERMINAT" },
  { id: "284", tanggal: "2026-07-01", sumber: "Nasabah Aktif", nama: "Michael Jaya Didani", phone: "081283666969", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-01: TIDAK BERMINAT" },
  { id: "285", tanggal: "2026-07-01", sumber: "Nasabah Aktif", nama: "Imam Agung M", phone: "082142732779", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-01: Masih nunggu emas turun lagi" },
  { id: "286", tanggal: "2026-07-01", sumber: "Nasabah Aktif", nama: "Romelah", phone: "085694337939", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-07-01: BERMINAT" },
  { id: "287", tanggal: "2026-07-02", sumber: "Nasabah Aktif", nama: "Eva Riani", phone: "0895341506095", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-02: TIDAK BERMINAT" },
  { id: "288", tanggal: "2026-07-02", sumber: "Nasabah Aktif", nama: "Dumaria yohana", phone: "087889557373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-02: TIDAK BERMINAT" },
  { id: "289", tanggal: "2026-07-02", sumber: "Nasabah Aktif", nama: "Erni wahyuni", phone: "08572678837", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-07-02: Alhamdulillah 5 gr" },
  { id: "290", tanggal: "2026-07-02", sumber: "Nasabah Aktif", nama: "Nuriah", phone: "0853783838", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-02: TIDAK BERMINAT" },
  { id: "291", tanggal: "2026-07-02", sumber: "Nasabah Aktif", nama: "Dumaria", phone: "0857373738", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-02: TIDAK BERMINAT" },
  { id: "292", tanggal: "2026-07-03", sumber: "Nasabah Aktif", nama: "Eva yusti", phone: "0856647477", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-03: TIDAK BERMINAT" },
  { id: "293", tanggal: "2026-07-03", sumber: "Nasabah Aktif", nama: "Dewi sukantin", phone: "0812459594", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-03: TIDAK BERMINAT" },
  { id: "294", tanggal: "2026-07-03", sumber: "Nasabah Aktif", nama: "Eva sudarti", phone: "087854066460", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-07-03: BERMINAT" },
  { id: "295", tanggal: "2026-07-03", sumber: "Nasabah Aktif", nama: "Najroh Nopiani", phone: "0895348557108", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-03: TIDAK BERMINAT" },
  { id: "296", tanggal: "2026-07-04", sumber: "Nasabah Aktif", nama: "Juarsih", phone: "0895635996323", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-04: Lg banyak kebutuhan" },
  { id: "297", tanggal: "2026-07-04", sumber: "Nasabah Aktif", nama: "Dwi Rani", phone: "081383410904", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-04: TIDAK BERMINAT" },
  { id: "298", tanggal: "2026-07-04", sumber: "Nasabah Aktif", nama: "Fitriah", phone: "085776924951", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-07-04: Nanti dulu" },
  { id: "299", tanggal: "2026-07-04", sumber: "Nasabah Aktif", nama: "Mustika tiani", phone: "08563566773", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-04: TIDAK BERMINAT" },
  { id: "300", tanggal: "2026-07-04", sumber: "Nasabah Aktif", nama: "Lucyanne", phone: "081244324454", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-07-04: TIDAK BERMINAT" },
  { id: "301", tanggal: "2026-07-06", sumber: "Nasabah Aktif", nama: "Heru", phone: "08127338488", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-06: TIDAK BERMINAT" },
  { id: "302", tanggal: "2026-07-06", sumber: "Nasabah Aktif", nama: "Nur ira", phone: "08567474747", produk: "MULIA TABUNGAN EMAS", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-06: TIDAK BERMINAT" },
  { id: "303", tanggal: "2026-07-06", sumber: "Nasabah Aktif", nama: "Grace ibrahim", phone: "081212571095", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-06: Mau tanya suami dulu" },
  { id: "304", tanggal: "2026-07-06", sumber: "Nasabah Aktif", nama: "Tamara Cheristiany", phone: "081388017661", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-06: TIDAK BERMINAT" },
  { id: "305", tanggal: "2026-07-06", sumber: "Nasabah Aktif", nama: "Yayah uswiyah", phone: "08974154012", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Belum Berminat", pemasar: "Ria Desvima", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-07-06: Nasabah minta di fu sama team mikro" },
  { id: "306", tanggal: "2026-07-07", sumber: "Nasabah Aktif", nama: "Heru Herawadih", phone: "088901195624", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-07: TIDAK BERMINAT" },
  { id: "307", tanggal: "2026-07-07", sumber: "Nasabah Aktif", nama: "Grise Lenora", phone: "08161650063", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-07: TIDAK BERMINAT" },
  { id: "308", tanggal: "2026-07-07", sumber: "Nasabah Aktif", nama: "Heni", phone: "08567384848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-07: TIDAK BERMINAT" },
  { id: "309", tanggal: "2026-07-07", sumber: "Nasabah Aktif", nama: "Wati", phone: "08788474748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-07: TIDAK BERMINAT" },
  { id: "310", tanggal: "2026-07-07", sumber: "Nasabah Aktif", nama: "Gara umbara", phone: "081298767681", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-07-07: BERMINAT" },
  { id: "311", tanggal: "2026-07-08", sumber: "Nasabah Aktif", nama: "Sriyanti", phone: "083896210075", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-08: Tunggu tanya suami dulu" },
  { id: "312", tanggal: "2026-07-08", sumber: "Nasabah Aktif", nama: "H. MOCH.LILI", phone: "08119997242", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "NEW", catatan: "2026-07-08: BERMINAT" },
  { id: "313", tanggal: "2026-07-08", sumber: "Nasabah Aktif", nama: "Wahyu", phone: "08137474848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-08: TIDAK BERMINAT" },
  { id: "314", tanggal: "2026-07-08", sumber: "Nasabah Aktif", nama: "Yani", phone: "08123330903", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-08: TIDAK BERMINAT" },
  { id: "315", tanggal: "2026-07-08", sumber: "Nasabah Aktif", nama: "Mgarry abdul Kheir", phone: "087786431214", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-07-08: BERMINAT" },
  { id: "316", tanggal: "2026-07-09", sumber: "Nasabah Aktif", nama: "Siti Farida", phone: "081717533964", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-09: Masih ada cicilan" },
  { id: "317", tanggal: "2026-07-09", sumber: "Nasabah Aktif", nama: "Joyce", phone: "081779084881", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-09: TIDAK BERMINAT" },
  { id: "318", tanggal: "2026-07-09", sumber: "Nasabah Aktif", nama: "Endra", phone: "0812484848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-09: TIDAK BERMINAT" },
  { id: "319", tanggal: "2026-07-09", sumber: "Nasabah Aktif", nama: "Sri lestari", phone: "08136858599", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-09: TIDAK BERMINAT" },
  { id: "320", tanggal: "2026-07-10", sumber: "Nasabah Aktif", nama: "Nur April liani", phone: "089653148716", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "NEW", catatan: "2026-07-10: BERMINAT" },
  { id: "321", tanggal: "2026-07-10", sumber: "Nasabah Aktif", nama: "Johan Hendra S", phone: "081311332429", produk: "MULIA TABUNGAN EMAS", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-10: TIDAK BERMINAT" },
  { id: "322", tanggal: "2026-07-11", sumber: "Nasabah Aktif", nama: "Ranogi Oktudelas", phone: "082113368669", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-11: TIDAK BERMINAT" },
  { id: "323", tanggal: "2026-07-11", sumber: "Nasabah Aktif", nama: "Ranogi", phone: "082113368669", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-11: Mau tanya suami dulu" },
  { id: "324", tanggal: "2026-07-13", sumber: "Nasabah Aktif", nama: "Nurhaeti", phone: "081383362299", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-13: TIDAK BERMINAT" },
  { id: "325", tanggal: "2026-07-13", sumber: "Nasabah Aktif", nama: "Ichsan Fajar", phone: "085810041809", produk: "AMANAH", keterangan: "Tidak Berminat", pemasar: "Gita Ayu", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-13: TIDAK BERMINAT" },
  { id: "326", tanggal: "2026-07-14", sumber: "Nasabah Aktif", nama: "Ainie", phone: "089661998575", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-14: TIDAK BERMINAT" },
  { id: "327", tanggal: "2026-07-14", sumber: "Nasabah Aktif", nama: "Gilardi adinur", phone: "085712819910", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "NEW", catatan: "2026-07-14: BERMINAT" },
  { id: "328", tanggal: "2026-07-14", sumber: "Nasabah Aktif", nama: "Yati", phone: "08567377887", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-14: TIDAK BERMINAT" },
  { id: "329", tanggal: "2026-07-14", sumber: "Nasabah Aktif", nama: "Yuliana", phone: "08134757474", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-14: TIDAK BERMINAT" },
  { id: "330", tanggal: "2026-07-15", sumber: "Nasabah Aktif", nama: "Yati Nurhayati", phone: "081320363699", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-15: TIDAK BERMINAT" },
  { id: "331", tanggal: "2026-07-15", sumber: "Nasabah Aktif", nama: "Lisa", phone: "081310088962", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-15: TIDAK BERMINAT" },
  { id: "332", tanggal: "2026-07-16", sumber: "Nasabah Aktif", nama: "Ida", phone: "08124747574", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-16: TIDAK BERMINAT" },
  { id: "333", tanggal: "2026-07-16", sumber: "Nasabah Aktif", nama: "Marini", phone: "08124858678", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-16: TIDAK BERMINAT" },
  { id: "334", tanggal: "2026-07-16", sumber: "Nasabah Aktif", nama: "Elsye Mariana", phone: "081387667819", produk: "EMASKU ULTIMATE SYARIAH", keterangan: "Tidak Berminat", pemasar: "Gita Ayu", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-16: TIDAK BERMINAT" },
  { id: "335", tanggal: "2026-07-16", sumber: "Nasabah Aktif", nama: "Silvi", phone: "087858501468", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Silvi Nurulita", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-16: TIDAK BERMINAT" },
  { id: "336", tanggal: "2026-07-17", sumber: "Nasabah Aktif", nama: "Ayu purwa", phone: "081236464654", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta Rizal Virgrianing", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-17: TIDAK BERMINAT" },
  { id: "337", tanggal: "2026-07-17", sumber: "Nasabah Aktif", nama: "Yenny", phone: "08113646468", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta Rizal Virgrianing", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-17: TIDAK BERMINAT" },
  { id: "338", tanggal: "2026-07-17", sumber: "Nasabah Aktif", nama: "Elysan Noni", phone: "083871308455", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu Purwaningtyas", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-17: TIDAK BERMINAT" },
  { id: "339", tanggal: "2026-07-17", sumber: "Nasabah Aktif", nama: "Geofara", phone: "085778786760", produk: "AMANAH", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-17: TIDAK BERMINAT" },
  { id: "340", tanggal: "2026-07-17", sumber: "Nasabah Aktif", nama: "Andi yeni eria", phone: "0813445010", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-07-17: Masih pikir pikir" },
  { id: "341", tanggal: "2026-07-18", sumber: "Nasabah Aktif", nama: "Yulia Susanti", phone: "083895203710", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-18: TIDAK BERMINAT" },
  { id: "342", tanggal: "2026-07-18", sumber: "Nasabah Aktif", nama: "Souw Hilda", phone: "08992087791", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-18: TIDAK BERMINAT" },
  { id: "343", tanggal: "2026-07-18", sumber: "Nasabah Aktif", nama: "Uswatun", phone: "0856847484", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-18: TIDAK BERMINAT" },
  { id: "344", tanggal: "2026-07-18", sumber: "Nasabah Aktif", nama: "Dewi Septian", phone: "0812556456", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-18: TIDAK BERMINAT" },
  { id: "345", tanggal: "2026-07-20", sumber: "Nasabah Aktif", nama: "Titik", phone: "0812374774", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-20: TIDAK BERMINAT" },
  { id: "346", tanggal: "2026-07-20", sumber: "Nasabah Aktif", nama: "Anis sulis", phone: "0813588585", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-20: TIDAK BERMINAT" },
  { id: "347", tanggal: "2026-07-20", sumber: "Nasabah Aktif", nama: "Ernawati", phone: "082125759668", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-07-20: BERMINAT" },
  { id: "348", tanggal: "2026-07-21", sumber: "Nasabah Aktif", nama: "Meliana", phone: "081280087247", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Gita Ayu P", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-21: TIDAK BERMINAT" },
  { id: "349", tanggal: "2026-07-21", sumber: "Nasabah Aktif", nama: "Rizka", phone: "08137485899", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-21: TIDAK BERMINAT" },
  { id: "350", tanggal: "2026-07-21", sumber: "Nasabah Aktif", nama: "Chepin", phone: "08127373748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-21: TIDAK BERMINAT" },
  { id: "351", tanggal: "2026-07-22", sumber: "Nasabah Aktif", nama: "Wulan", phone: "0812647484", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-22: TIDAK BERMINAT" },
  { id: "352", tanggal: "2026-07-23", sumber: "Nasabah Aktif", nama: "Maya", phone: "0856374737", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-23: TIDAK BERMINAT" },
  { id: "353", tanggal: "2026-07-23", sumber: "Nasabah Aktif", nama: "Satibi", phone: "08564774748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta Rizal Virgrianing", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-23: TIDAK BERMINAT" },
  { id: "354", tanggal: "2026-07-24", sumber: "Nasabah Aktif", nama: "Tuti", phone: "0856673738", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta Rizal", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-24: TIDAK BERMINAT" },
  { id: "355", tanggal: "2026-07-24", sumber: "Nasabah Aktif", nama: "Cecep", phone: "08136748488", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta Rizal", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-24: TIDAK BERMINAT" },
  { id: "356", tanggal: "2026-07-24", sumber: "Nasabah Aktif", nama: "Mega Indah Sari", phone: "081224366575", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-24: TIDAK BERMINAT" },
  { id: "357", tanggal: "2026-07-24", sumber: "Nasabah Aktif", nama: "Widya Dwi Pramesti", phone: "085284775217", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-24: TIDAK BERMINAT" },
  { id: "358", tanggal: "2026-07-25", sumber: "Nasabah Aktif", nama: "Sumarni", phone: "08564774488", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-25: TIDAK BERMINAT" },
  { id: "359", tanggal: "2026-07-25", sumber: "Nasabah Aktif", nama: "Ferry", phone: "081374859598", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-25: TIDAK BERMINAT" },
  { id: "360", tanggal: "2026-07-25", sumber: "Nasabah Aktif", nama: "Irmawati", phone: "08967777618", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-07-25: Lagi tanya suami" },
  { id: "361", tanggal: "2026-07-25", sumber: "Nasabah Aktif", nama: "Sumarnu", phone: "08569067457", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-25: TIDAK BERMINAT" },
  { id: "362", tanggal: "2026-07-27", sumber: "Nasabah Aktif", nama: "Hendra", phone: "081311501272", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-07-27: TIDAK BERMINAT" },
  { id: "363", tanggal: "2026-07-27", sumber: "Nasabah Aktif", nama: "Herman susilo", phone: "087717710439", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-07-27: BERMINAT" },
  { id: "364", tanggal: "2026-07-27", sumber: "Nasabah Aktif", nama: "Susanto", phone: "08127373747", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-27: TIDAK BERMINAT" },
  { id: "365", tanggal: "2026-07-27", sumber: "Nasabah Aktif", nama: "Dewi", phone: "08137474748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-27: TIDAK BERMINAT" },
  { id: "366", tanggal: "2026-07-28", sumber: "Nasabah Aktif", nama: "Mega Indah Sari", phone: "081224366575", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-28: TIDAK BERMINAT" },
  { id: "367", tanggal: "2026-07-28", sumber: "Nasabah Aktif", nama: "Amid", phone: "085718196748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-28: TIDAK BERMINAT" },
  { id: "368", tanggal: "2026-07-28", sumber: "Nasabah Aktif", nama: "Surwanto", phone: "0856778899", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-28: TIDAK BERMINAT" },
  { id: "369", tanggal: "2026-07-28", sumber: "Nasabah Aktif", nama: "Lilis", phone: "08126474848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-28: TIDAK BERMINAT" },
  { id: "370", tanggal: "2026-07-29", sumber: "Nasabah Aktif", nama: "Chandra", phone: "08563783838", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-29: TIDAK BERMINAT" },
  { id: "371", tanggal: "2026-07-29", sumber: "Nasabah Aktif", nama: "Lenny", phone: "08787477474", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-29: TIDAK BERMINAT" },
  { id: "372", tanggal: "2026-07-29", sumber: "Nasabah Aktif", nama: "Dedy Haryanto", phone: "081906412431", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-29: TIDAK BERMINAT" },
  { id: "373", tanggal: "2026-07-29", sumber: "Nasabah Aktif", nama: "Lenny", phone: "085718196748", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-29: TIDAK BERMINAT" },
  { id: "374", tanggal: "2026-07-31", sumber: "Nasabah Aktif", nama: "Fitri Maelana", phone: "0895364424072", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-31: TIDAK BERMINAT" },
  { id: "375", tanggal: "2026-07-31", sumber: "Nasabah Aktif", nama: "Sunarti", phone: "08223456787", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Bogi Sasongko", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-31: TIDAK BERMINAT" },
  { id: "376", tanggal: "2026-07-31", sumber: "Nasabah Aktif", nama: "Lala", phone: "0856363773", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-07-31: TIDAK BERMINAT" },
  { id: "377", tanggal: "2026-08-03", sumber: "Nasabah Aktif", nama: "Uswatun", phone: "0855377373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-03: TIDAK BERMINAT" },
  { id: "378", tanggal: "2026-08-03", sumber: "Nasabah Aktif", nama: "Juleha", phone: "08123848489", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-03: TIDAK BERMINAT" },
  { id: "379", tanggal: "2026-08-03", sumber: "Nasabah Aktif", nama: "Gilang maulana", phone: "081318168180", produk: "ARRUM BPKB", keterangan: "Belum Berminat", pemasar: "Adies", unit: "UPS Poris", status: "CONTACTED", catatan: "2026-08-03: Mau gadai sertifikat" },
  { id: "380", tanggal: "2026-08-04", sumber: "Nasabah Aktif", nama: "Yati", phone: "08127474885", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-04: TIDAK BERMINAT" },
  { id: "381", tanggal: "2026-08-04", sumber: "Nasabah Aktif", nama: "Irma", phone: "08569990477", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-04: TIDAK BERMINAT" },
  { id: "382", tanggal: "2026-08-05", sumber: "Nasabah Aktif", nama: "Leina", phone: "0853674848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-05: TIDAK BERMINAT" },
  { id: "383", tanggal: "2026-08-05", sumber: "Nasabah Aktif", nama: "Dian", phone: "08578384848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-05: TIDAK BERMINAT" },
  { id: "384", tanggal: "2026-08-07", sumber: "Nasabah Aktif", nama: "Arni", phone: "08786366373", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-07: TIDAK BERMINAT" },
  { id: "385", tanggal: "2026-08-08", sumber: "Nasabah Aktif", nama: "Anis", phone: "08563838383", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-08: TIDAK BERMINAT" },
  { id: "386", tanggal: "2026-08-08", sumber: "Nasabah Aktif", nama: "Ana", phone: "08123784848", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-08: TIDAK BERMINAT" },
  { id: "387", tanggal: "2026-08-11", sumber: "Nasabah Aktif", nama: "Jenny", phone: "0857585838", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "NEW", catatan: "2026-08-11: BERMINAT" },
  { id: "388", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "Mega Santika", phone: "081534782644", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-08-15: TIDAK BERMINAT" },
  { id: "389", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "Hilda", phone: "08124848477", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-15: TIDAK BERMINAT" },
  { id: "390", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "Noormalasari", phone: "08888598122", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Johan Fratikno H.", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-08-15: Clossing" },
  { id: "391", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "EPITAMALA", phone: "083898722616", produk: "AMANAH", keterangan: "Berminat", pemasar: "NADIA", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-15: BERMINAT" },
  { id: "392", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "RINI MURDIANA", phone: "087830622894", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-15: BERMINAT" },
  { id: "393", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "ELOK FITRIANA", phone: "0895605091188", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "RISMAN", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-15: BERMINAT" },
  { id: "394", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "NURHASAN", phone: "081385851489", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "SAHFUDIN", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-15: BERMINAT" },
  { id: "395", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "Dahliah", phone: "08788343975", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-08-15: BERMINAT" },
  { id: "396", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "Ety", phone: "0813457662", produk: "RAHN TASJILY TANAH", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-15: Jaminan di tigaraksa" },
  { id: "397", tanggal: "2026-08-18", sumber: "Nasabah Aktif", nama: "ANGGA NAGARA YANOTTAMA", phone: "087889009816", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Johan", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-08-18: BERMINAT" },
  { id: "398", tanggal: "2026-08-18", sumber: "Nasabah Aktif", nama: "Dwi purnomo", phone: "08128738883", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-18: 5 gr" },
  { id: "399", tanggal: "2026-08-18", sumber: "Nasabah Aktif", nama: "Ganda ariya wisesa", phone: "08218773662", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Anyelir", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-18: 5gr" },
  { id: "400", tanggal: "2026-08-18", sumber: "Nasabah Aktif", nama: "Wida kurnia sari", phone: "08969494573", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-08-18: Tunggu harga turun lg" },
  { id: "401", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Sharif", phone: "089626476229", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-19: TIDAK BERMINAT" },
  { id: "402", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Siti masitoh", phone: "0895410938290", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-08-19: Masih di pikirkan" },
  { id: "403", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Zhafira", phone: "0895392073338", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Darto", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-08-19: Masih membandingkan  dengan cicil tabungan emas" },
  { id: "404", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Randy gustiawab", phone: "0838952529520", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-19: TIDAK BERMINAT" },
  { id: "405", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "M. Usep sapriyadi", phone: "081286769820     085880762295", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "406", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Dessy marriesa", phone: "081901033168", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "CONTACTED", catatan: "2026-08-19: Biasa melalui tring" },
  { id: "407", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Aisyah", phone: "08788188288", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-19: Ragu ragu" },
  { id: "408", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Norma Ningsih", phone: "08128772622", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Anyelir", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-19: Bntar lagi butuh modal" },
  { id: "409", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Sri mulyani", phone: "085174116953", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "410", tanggal: "2026-08-15", sumber: "Nasabah Aktif", nama: "Harry", phone: "0856646463", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-15: TIDAK BERMINAT" },
  { id: "411", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Shova", phone: "0817377483", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-19: TIDAK BERMINAT" },
  { id: "412", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Nanik Rismawati", phone: "+62 877-5468-5449", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-08-19: TIDAK BERMINAT" },
  { id: "413", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "NURHAYATI", phone: "087849806239", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "CPS DAAN MOGOT", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "414", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "DEDI", phone: "0895335617514", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-19: TIDAK BERMINAT" },
  { id: "415", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "NURUL IMAN FAUZI", phone: "089528080401", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "NOVI", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-19: TIDAK BERMINAT" },
  { id: "416", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "CEP SUDIRMAN", phone: "085729992736", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "SAHFUDIN", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "417", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "TURINAH", phone: "0857733767282", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "RISMAN", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "418", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Ida Faridah", phone: "081287789345", produk: "ARRUM MULTIGUNA", keterangan: "Berminat", pemasar: "Retno Mumpuni Diah", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "419", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Yanti", phone: "082112567435", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Salma", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "420", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Amelia", phone: "089662087288", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dillah permata", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "421", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Budi astuti", phone: "087876259615", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dillah permata", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: Berminat tapi nanti akan diinfokan" },
  { id: "422", tanggal: "2026-08-19", sumber: "Nasabah Aktif", nama: "Ida Faridah", phone: "081287789345", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Elvina", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-19: BERMINAT" },
  { id: "423", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Reni budiarti", phone: "081281759632", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dillah permata budiarti", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-20: Berminat tapi masih bertanyatanya dulu" },
  { id: "424", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Siti musodah", phone: "081918642726", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Dillah permata", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "425", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Desy deria patmawati", phone: "085959272425", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Dillah permata", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "426", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Warsini", phone: "082112497808", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Dillah permata", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "427", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Annisa nurherawati", phone: "082126233757", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "428", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Tri suyanti", phone: "081216453079", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Salma", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "429", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Nurma  Permatasari", phone: "081212782001", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Budi Mulyono", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "430", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Fitri anjar sari", phone: "085778587954", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Dillah permata", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "431", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Rizvian ritheliriundo sinaga", phone: "085278085666", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "432", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Indra p", phone: "082213312025", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "433", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Muji", phone: "081228005342", produk: "RAHN TASJILY TANAH", keterangan: "Belum Berminat", pemasar: "Johan", unit: "UPS Citra Niaga", status: "CONTACTED", catatan: "2026-08-20: Suami istri usaha." },
  { id: "434", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Maysaroh", phone: "085693098743", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Maysaroh", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "435", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Ade agustini", phone: "089635505295", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "436", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Riena Puspita", phone: "085779597435", produk: "ARRUM BPKB", keterangan: "Berminat", pemasar: "Risman", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "437", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Sudradjat", phone: "087868691680", produk: "ARRUM EXPRESS LOAN KUR", keterangan: "Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "438", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Munfaizah", phone: "08536637370", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "439", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Jerawati", phone: "0813758584", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-20: TIDAK BERMINAT" },
  { id: "440", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Yully", phone: "085277476761", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Anyelir", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-20: Tapi belum bawa duit" },
  { id: "441", tanggal: "2026-08-20", sumber: "Nasabah Aktif", nama: "Harsono", phone: "0895702783636", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Adiesty", unit: "UPS Poris", status: "NEW", catatan: "2026-08-20: BERMINAT" },
  { id: "442", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Miranti rosalina", phone: "081236247111", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Nadia", unit: "CPS Daan Mogot", status: "NEW", catatan: "2026-08-21: BERMINAT" },
  { id: "443", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Nova febriyanti", phone: "082182588249", produk: "ARRUM BPKB", keterangan: "Tidak Berminat", pemasar: "Nova febriyanti", unit: "CPS Daan Mogot", status: "REJECTED", catatan: "2026-08-21: TIDAK BERMINAT" },
  { id: "444", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Putri A", phone: "081283657172", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "UPS Semanan", status: "REJECTED", catatan: "2026-08-21: TIDAK BERMINAT" },
  { id: "445", tanggal: "2028-08-21", sumber: "Nasabah Aktif", nama: "Siti Ilma C", phone: "081317100616", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2028-08-21: TIDAK BERMINAT" },
  { id: "446", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Nurjanah", phone: "0855757588", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-21: TIDAK BERMINAT" },
  { id: "447", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Juleha", phone: "08575994937", produk: "MULIA TABUNGAN EMAS", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-21: TIDAK BERMINAT" },
  { id: "448", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Sri iswakhyuningsih", phone: "081228818808", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Fitriyah adiesty", unit: "UPS Poris", status: "NEW", catatan: "2026-08-21: BERMINAT" },
  { id: "449", tanggal: "2026-08-21", sumber: "Nasabah Aktif", nama: "Sri handayati", phone: "08179838140", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Ria Desvina", unit: "UPS Sumur Bor", status: "NEW", catatan: "2026-08-21: BERMINAT" },
  { id: "450", tanggal: "2026-08-22", sumber: "Nasabah Aktif", nama: "Mardiana", phone: "08984790651", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Alfin", unit: "UPS Semanan", status: "REJECTED", catatan: "2026-08-22: TIDAK BERMINAT" },
  { id: "451", tanggal: "2026-08-22", sumber: "Nasabah Aktif", nama: "Misriyah", phone: "0856636378", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-22: TIDAK BERMINAT" },
  { id: "452", tanggal: "2026-08-22", sumber: "Nasabah Aktif", nama: "Siti Musrifah", phone: "081280008830", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-22: TIDAK BERMINAT" },
  { id: "453", tanggal: "2026-08-22", sumber: "Nasabah Aktif", nama: "Noormalasari", phone: "08888598122", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Salma", unit: "UPS Citra Niaga", status: "NEW", catatan: "2026-08-22: BERMINAT" },
  { id: "454", tanggal: "2026-08-22", sumber: "Nasabah Aktif", nama: "Sutrisna", phone: "085212967700", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Belum Berminat", pemasar: "Suganda", unit: "UPS Sumur Bor", status: "CONTACTED", catatan: "2026-08-22: Masih mikir dulu" },
  { id: "455", tanggal: "2026-08-22", sumber: "Nasabah Aktif", nama: "Dedy P", phone: "+62 859-5408-6122", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Budi M", unit: "UPS Citra Niaga", status: "REJECTED", catatan: "2026-08-22: TIDAK BERMINAT" },
  { id: "456", tanggal: "2026-08-24", sumber: "Nasabah Aktif", nama: "Nafifa maryanti", phone: "081383533460", produk: "AMANAH", keterangan: "Berminat", pemasar: "Fitriyah adiesty", unit: "UPS Poris", status: "NEW", catatan: "2026-08-24: BERMINAT" },
  { id: "457", tanggal: "2026-08-24", sumber: "Nasabah Aktif", nama: "Masda", phone: "08563838388", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Tidak Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "REJECTED", catatan: "2026-08-24: TIDAK BERMINAT" },
  { id: "458", tanggal: "2026-08-24", sumber: "Nasabah Aktif", nama: "Hizam adli", phone: "08999762772", produk: "AMANAH", keterangan: "Belum Berminat", pemasar: "Dimas", unit: "UPS Semanan", status: "CONTACTED", catatan: "2026-08-24: Karena dp nya terlalu besar" },
  { id: "459", tanggal: "2026-08-24", sumber: "Nasabah Aktif", nama: "Utri", phone: "08137485858", produk: "MULIA SYARIAH ULTIMATE", keterangan: "Berminat", pemasar: "Rizta", unit: "UPS Poris", status: "NEW", catatan: "2026-08-24: BERMINAT" },
];

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

function UpdateLeadPanel({ leads, onUpdate }) {
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

function CategoryPanel({ leads, kategori, chartColor, onUpdate }) {
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
      <AllLeadsPanel leads={filtered} onUpdate={onUpdate} hideKategori />
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

function AllLeadsPanel({ leads, onUpdate, hideKategori }) {
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

      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto", marginBottom: 12 }}>
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
              <th style={{ padding: "8px 12px" }}></th>
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
                <td style={{ padding: "8px 12px" }}>
                  <button onClick={() => openEdit(l)} style={{ background: "#F1EFE8", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 500, cursor: "pointer", color: "#3d3d3a" }}>
                    Follow up
                  </button>
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
              <button onClick={() => setSelectedId(null)} style={{ background: "none", border: "none", color: "#888780", cursor: "pointer", fontSize: 13 }}>Tutup</button>
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

      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto", marginBottom: 12 }}>
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


function AdminDashboard({ leads, onUpdate }) {
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
          <AllLeadsPanel leads={leads} onUpdate={onUpdate} />
        ) : tab === "Leaderboard" ? (
          <LeaderboardPanel leads={leads} />
        ) : tab === "Hasil Follow Up" ? (
          <FollowUpPanel leads={leads} />
        ) : tab === "Laporan" ? (
          <ReportPanel leads={leads} />
        ) : (
          <CategoryPanel leads={leads} kategori={tab} chartColor={activeTab.color} onUpdate={onUpdate} />
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

function formatRupiah(n) {
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

  const dpKendaraan = otr - uangPinjaman; // E3
  const rasio = otr ? Math.round((uangPinjaman / otr * 100) * 100) / 100 : 0; // E4
  const diskonUjrah = rasio === 90 ? 0 : SIMULASI_DISKON_UJRAH_RATE; // E5
  const notarisInfo = lookupNotarisFidusia(uangPinjaman); // E6
  const sewaModalRate = SIMULASI_SEWA_MODAL[mode];
  const ijkRates = SIMULASI_IJK_RATE[mode];

  const perTenor = SIMULASI_TENORS.map((tenor) => {
    const tlo = otr * SIMULASI_TLO_RATE[tenor];
    const ijk = uangPinjaman * ijkRates[tenor];
    const totalDpAdmin = dpKendaraan + tlo + ijk + SIMULASI_ADMINISTRASI + notarisInfo.biaya;
    const angsuranRaw = (tenor ? uangPinjaman / tenor : 0) + (otr * sewaModalRate * (1 - diskonUjrah));
    const angsuran = Math.ceil(angsuranRaw / 1000) * 1000; // ROUNDUP(...,-3)
    return { tenor, tlo, ijk, administrasi: SIMULASI_ADMINISTRASI, notaris: notarisInfo.biaya, totalDpAdmin, angsuran };
  });

  return { uangPinjaman, dpKendaraan, rasio, diskonUjrah, notarisInfo, perTenor };
}

function suggestedInternalUP(hargaOtr) {
  const otr = Number(hargaOtr) || 0;
  const alt90 = otr - otr * 0.1; // C5: 90% dari OTR
  return Math.floor(alt90 / 100000) * 100000; // ROUNDDOWN(C5,-5)
}

function SimulasiProdukPanel() {
  const [mode, setModeRaw] = useState("eksternal");
  const [namaMotor, setNamaMotor] = useState("");
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
  <h1>Ringkasan Simulasi Amanah</h1>
  <div class="sub">Nama Motor: ${namaMotor || "-"}</div>
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
        <div style={{ overflow: "auto" }}>
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

export default function App() {
  const [leads, setLeads] = useState([]);
  const [view, setView] = useState("input");
  const [inputTab, setInputTab] = useState("new");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("leads_db", true);
        setLeads(res && res.value ? JSON.parse(res.value) : SEED_LEADS);
      } catch (e) {
        setLeads(SEED_LEADS);
        try { await window.storage.set("leads_db", JSON.stringify(SEED_LEADS), true); } catch (_) {}
      }
      setLoaded(true);
    })();
  }, []);

  const persist = async (next) => {
    setLeads(next);
    try { await window.storage.set("leads_db", JSON.stringify(next), true); } catch (_) {}
  };

  const addLead = (lead) => persist([...leads, lead]);
  const updateLead = (id, patch) => persist(leads.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  if (!loaded) return <div style={{ padding: 40, fontFamily: "sans-serif", color: "#888780" }}>Memuat data...</div>;

  return (
    <div className="mobile-app" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#F8F9FA", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        .mobile-app button, .mobile-app input, .mobile-app select, .mobile-app textarea { -webkit-tap-highlight-color: transparent; }
        .mobile-app .mobile-bottom-nav { display: none; }
        @media (max-width: 768px) {
          body { margin: 0; background: #F8F9FA; }
          .mobile-app { min-height: 100dvh !important; padding-bottom: 78px; }
          .mobile-app .mobile-header { padding: 10px 14px 12px !important; position: sticky; top: 0; z-index: 50; box-shadow: 0 2px 12px rgba(0,0,0,.12); }
          .mobile-app .mobile-header-logos { margin-bottom: 8px !important; }
          .mobile-app .mobile-header-logos img:first-child { height: 22px !important; }
          .mobile-app .mobile-header-logos img:last-child { height: 27px !important; }
          .mobile-app .mobile-header-title { font-size: 15px !important; line-height: 1.25; }
          .mobile-app .mobile-header-subtitle { font-size: 10.5px !important; }
          .mobile-app .desktop-main-nav { display: none !important; }
          .mobile-app .mobile-content { max-width: none !important; padding: 16px 12px 20px !important; width: 100%; }
          .mobile-app .portal-tabs { display: grid !important; grid-template-columns: 1fr 1fr; gap: 8px !important; margin-bottom: 16px !important; }
          .mobile-app .portal-tabs button { width: 100%; min-height: 42px; padding: 9px 8px !important; font-size: 12px !important; }
          .mobile-app form { max-width: none !important; width: 100%; }
          .mobile-app form > div:first-child { grid-template-columns: 1fr !important; gap: 0 !important; }
          .mobile-app form > div:first-child > div { width: 100%; }
          .mobile-app label { font-size: 12px; }
          .mobile-app input, .mobile-app select, .mobile-app textarea { font-size: 16px !important; min-height: 46px; border-radius: 10px !important; }
          .mobile-app textarea { min-height: 92px !important; }
          .mobile-app form button[type="submit"] { width: 100%; min-height: 48px; justify-content: center; border-radius: 10px !important; font-size: 14px !important; }
          .mobile-app .simulator-panel { font-family: "Helvetica Neue", Arial, sans-serif !important; }
          .mobile-app .simulator-header { display: block !important; border-bottom-width: 1px !important; padding-bottom: 12px !important; margin-bottom: 14px !important; }
          .mobile-app .simulator-header > div:first-child { margin-bottom: 10px; }
          .mobile-app .simulator-header > div:first-child > div:first-child { font-size: 22px !important; }
          .mobile-app .simulator-header > div:first-child > div:last-child { font-size: 11px !important; }
          .mobile-app .simulator-header > div:last-child { width: 100%; display: grid !important; grid-template-columns: 1fr 1fr; }
          .mobile-app .simulator-header > div:last-child button { padding: 10px 6px !important; font-size: 12px !important; width: 100%; }
          .mobile-app .simulator-data-card, .mobile-app .simulator-result-card { padding: 15px !important; border-radius: 14px !important; margin-bottom: 12px !important; }
          .mobile-app .simulator-data-card > div:nth-child(2) { grid-template-columns: 1fr !important; gap: 0 !important; }
          .mobile-app .simulator-data-card > div:nth-child(2) > div { grid-column: auto !important; }
          .mobile-app .simulator-data-card input { font-size: 16px !important; min-height: 48px; }
          .mobile-app .simulator-metrics { grid-template-columns: 1fr 1fr !important; gap: 8px !important; margin-top: 12px !important; }
          .mobile-app .simulator-panel table { min-width: 620px; }
          .mobile-app .simulator-result-card { overflow: hidden; }
          .mobile-app .simulator-result-card > div:first-child { align-items: flex-start !important; gap: 8px; }
          .mobile-app .simulator-result-card > div:first-child > div:first-child { font-size: 11px !important; line-height: 1.4; }
          .mobile-app .simulator-result-card > div:last-child { display: block !important; }
          .mobile-app .simulator-result-card > div:last-child button { width: 100%; min-height: 46px; border-radius: 9px !important; }
          .mobile-app .mobile-bottom-nav {
            display: grid; grid-template-columns: repeat(3, 1fr); position: fixed; left: 0; right: 0; bottom: 0; z-index: 100;
            background: rgba(255,255,255,.97); border-top: 1px solid #E5E7EB; box-shadow: 0 -4px 18px rgba(0,0,0,.08); padding: 7px 8px calc(7px + env(safe-area-inset-bottom));
            backdrop-filter: blur(12px);
          }
          .mobile-app .mobile-bottom-nav button { border: 0; background: transparent; color: #6B7280; min-height: 54px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; font-size: 10px; font-weight: 600; cursor: pointer; }
          .mobile-app .mobile-bottom-nav button.active { color: #0A5C36; background: #EAF3DE; }
          .mobile-app .mobile-bottom-nav button.admin { color: #6B7280; }
          .mobile-app .mobile-bottom-nav button.admin.active { color: #534AB7; background: #EEEDFE; }
          .mobile-app .mobile-bottom-nav svg { width: 20px; height: 20px; }
          .mobile-app .admin-dashboard { overflow-x: auto; }
          .mobile-app .admin-dashboard table { min-width: 850px; }
        }
        @media (max-width: 390px) {
          .mobile-app .mobile-content { padding-left: 10px !important; padding-right: 10px !important; }
          .mobile-app .simulator-data-card, .mobile-app .simulator-result-card { padding: 12px !important; }
          .mobile-app .simulator-metrics { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="mobile-header" style={{ background: "#0A5C36", color: "#fff", padding: "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <img src={DANANTARA_LOGO} alt="Logo Danantara Indonesia" style={{ height: 26, width: "auto", background: "#fff", borderRadius: 4, padding: "3px 6px" }} />
          <img src={PEGADAIAN_LOGO} alt="Logo Pegadaian Syariah" style={{ height: 32, width: "auto", background: "#fff", borderRadius: 4, padding: "3px 8px" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Pegadaian Mikro & Emas Leads Tracker</div>
            <div style={{ fontSize: 12, color: "#C9E4D6" }}>Cabang Syariah Daan Mogot</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("input")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "input" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "input" ? "#0A5C36" : "#fff",
            }}><ClipboardList size={15} /> Portal pemasar</button>
            <button onClick={() => setView("simulasi")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "simulasi" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "simulasi" ? "#0A5C36" : "#fff",
            }}><Calculator size={15} /> Simulasi produk</button>
            <button onClick={() => setView("admin")} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: view === "admin" ? "#fff" : "rgba(255,255,255,0.15)", color: view === "admin" ? "#0A5C36" : "#fff",
            }}><LayoutDashboard size={15} /> Dashboard admin</button>
          </div>
        </div>
      </div>

      <div className="mobile-content" style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 24px 60px" }}>
        {view === "input" ? (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <button onClick={() => setInputTab("new")} style={{ padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: inputTab === "new" ? "#0A5C36" : "#F1EFE8", color: inputTab === "new" ? "#fff" : "#5F5E5A" }}>Input prospek baru</button>
              <button onClick={() => setInputTab("update")} style={{ padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: inputTab === "update" ? "#0A5C36" : "#F1EFE8", color: inputTab === "update" ? "#fff" : "#5F5E5A" }}>Update prospek saya</button>
            </div>
            {inputTab === "new" ? <NewLeadForm onSubmit={addLead} /> : <UpdateLeadPanel leads={leads} onUpdate={updateLead} />}
          </div>
        ) : view === "simulasi" ? (
          <SimulasiProdukPanel />
        ) : (
          <AdminDashboard leads={leads} onUpdate={updateLead} />
        )}
      </div>
      <nav className="mobile-bottom-nav" aria-label="Navigasi utama">
        <button className={view === "input" ? "active" : ""} onClick={() => setView("input")}>
          <ClipboardList />
          <span>Portal Pemasar</span>
        </button>
        <button className={view === "simulasi" ? "active" : ""} onClick={() => setView("simulasi")}>
          <Calculator />
          <span>Simulasi</span>
        </button>
        <button className={`admin ${view === "admin" ? "active" : ""}`} onClick={() => setView("admin")}>
          <LayoutDashboard />
          <span>Admin</span>
        </button>
      </nav>
    </div>
  );
}
