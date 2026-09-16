# ppw-2026-week2-12S24012
# 🌐 Portofolio & Layanan Interaktif Accessible

Repositori ini berisi berkas Tugas Mandiri **Praktikum Minggu 02: HTML5, CSS3, & Perancangan Antarmuka Web Modern (Estetik & Responsif)** untuk mata kuliah **Pemrograman dan Pengujian Aplikasi Web (1253101)** di **Institut Teknologi Del**.

---

## 📌 Identitas Pemilik Proyek

* **Nama:** Choqy Pananda Sirait
* **GitHub Username:** [@ChoqySirait](https://github.com/ChoqySirait)
* **Deskripsi Singkat:** Pengembang antarmuka web yang memiliki ketertarikan kuat dalam bidang pemrograman perangkat lunak serta eksplorasi strategi bisnis digital.

---

## 🚀 Demo Implementasi Live (GitHub Pages)

Halaman web ini telah dipublikasikan secara *live* dan dapat diakses melalui tautan berikut:  
👉 **[Live Demo GitHub Pages](https://ChoqySirait.github.io/ppw-2026-week2-12S24012/)**

---

## 🛠️ Spesifikasi Teknis & Aksesibilitas

Pengembangan antarmuka ini mengimplementasikan standar **WCAG 2.2 Level AA** serta kaidah tata letak modern:

1. **Struktur Semantik HTML5**:
   - Memanfaatkan elemen semantik lengkap (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) secara logis tanpa *div-soup*.
2. **Penyajian Data Terstruktur**:
   - **HTML Lists**: Menggunakan kombinasi Unordered List (`<ul>`) dan Ordered List (`<ol>`) untuk memisahkan daftar keahlian dan langkah alur kerja.
   - **Tabel Semantik**: Dilengkapi `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, atribut `scope="col/row"`, serta tag semantik `<time>` untuk penanggalan.
3. **Formulir Aksesibel (WCAG 2.2 AA)**:
   - Terdiri dari 3 pengelompokan `<fieldset>` dan `<legend>`.
   - Menggunakan **8 jenis kontrol input**: `text`, `email`, `tel`, `number`, `select`, `radio`, `checkbox`, `textarea`, dan `date`.
   - Menghubungkan label eksplisit (`for="..."`), validasi native (`required`), serta indikator fokus visual (*Focus Ring*).
4. **Estetika & Layout CSS Modern**:
   - Menerapkan *Universal Reset Box Sizing* (`box-sizing: border-box`).
   - Menerapkan **Aturan Harmonisasi Warna 60-30-10**.
   - Tata letak responsif menggunakan **CSS Flexbox** dan **Media Queries** (`@media (max-width: 768px)`).

---

## 📂 Struktur Berkas

```text
.
├── index.html     # Dokumen utama HTML5 semantik
├── style.css      # Berkas stylesheet untuk styling estetik, warna, & responsivitas
└── README.md      # Dokumentasi resmi repositori proyek
